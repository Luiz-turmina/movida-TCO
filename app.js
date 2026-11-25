/* app.js — modelo de custo, interações, popups e movimento. Premissas e textos vêm de data.js */
(function () {
  "use strict";
  var D = window.MOVIDA_DATA, P = D.premissas;
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HAS = !!window.gsap && !!window.ScrollTrigger && !REDUCE;
  if (HAS) gsap.registerPlugin(ScrollTrigger);

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function brl(v, d) {
    d = d == null ? 2 : d;
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, " ");
  }
  function nf(v, d) { return v.toLocaleString("pt-BR", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
  function pct(v, d) { return nf(v * 100, d == null ? 0 : d) + "%"; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function norm(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function parseMoney(s) {
    s = String(s).replace(/[^\d,.]/g, "");
    if (s.indexOf(",") > -1) s = s.replace(/\./g, "").replace(",", ".");
    else if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
    var v = parseFloat(s); return isNaN(v) ? 0 : v;
  }

  /* ---------- modelo (mesmas contas do estudo, agora com premissas ajustáveis) ---------- */
  function modelo(o) {
    var anos = o.prazo / 12, medio = o.preco * (1 + o.res) / 2;
    var c = {
      medio: medio,
      depr: o.preco * (1 - o.res),
      capital: medio * o.rend * anos,
      seguro: medio * o.seg * anos,
      ipva: medio * o.ipva * anos,
      lic: o.lic * anos,
      manut: o.rev * (o.km * o.prazo / P.revisao.kmCada),
      pneus: o.pneu * (o.km * o.prazo / P.pneus.kmCada),
      gestao: o.horas * o.hora * o.prazo,
      indisp: o.parado * o.prazo
    };
    c.total = c.depr + c.capital + c.seguro + c.ipva + c.lic + c.manut + c.pneus + c.gestao + c.indisp;
    c.mensal = c.total / o.prazo;
    c.porKm = c.mensal / o.km;
    c.fimValor = o.preco * o.res;
    c.grupos = [
      { k: "desval", v: c.depr }, { k: "parado", v: c.capital }, { k: "seguro", v: c.seguro },
      { k: "impostos", v: c.ipva + c.lic }, { k: "manut", v: c.manut + c.pneus }, { k: "equipe", v: c.gestao + c.indisp }
    ];
    return c;
  }
  function financ(preco, prazo) {
    var i = D.financiamento.taxaMes, ent = preco * D.financiamento.entrada, fin = preco - ent;
    var pmt = fin * i / (1 - Math.pow(1 + i, -prazo));
    return { entrada: ent, parcela: pmt, juros: pmt * prazo - fin };
  }
  function ufEst(uf) { return D.estados.filter(function (x) { return x.uf === uf; })[0] || { uf: uf, nome: uf, ipva: 4 }; }
  function ufRate(uf) { return ufEst(uf).ipva; }

  /* ---------- médias de mercado (mercado.js) e premissas do estudo (data.js) ---------- */
  var M = window.MOVIDA_MERCADO || {};
  var CARS = [{ g: "REF", n: "Fiat Argo 1.0", p: D.precoReferencia, nt: "preço de referência usado no estudo" }].concat(D.carros);
  function carInfo(c) { return c && M.carros ? M.carros[c.g + "|" + c.n] || null : null; }
  function ageFactor(age) {
    var pts = (M.seguro && M.seguro.idade) || [[21.5, 1.54], [30.5, 1.12], [40.5, 1.01], [50.5, 0.97], [60, 0.89]];
    if (age <= pts[0][0]) return pts[0][1];
    for (var i = 1; i < pts.length; i++) if (age <= pts[i][0]) { var a = pts[i - 1], b = pts[i]; return a[1] + (b[1] - a[1]) * (age - a[0]) / (b[0] - a[0]); }
    return pts[pts.length - 1][1];
  }
  /* seguro estimado (% do valor do carro ao ano) */
  function segMercado(car, uf, idade) {
    var ci = carInfo(car), sg = M.seguro || {};
    var casco = ci ? ci.casco : sg.cascoPadrao || 0.025;
    var uf1 = (sg.uf && sg.uf[uf]) || 1, rc = (sg.rc && sg.rc[uf]) || sg.rcNac || 1.3;
    return casco * uf1 * ageFactor(idade) * rc * 100;
  }
  function tierRev(p) { var T = M.revisao || []; for (var i = 0; i < T.length; i++) if (p < T[i].ate) return T[i]; return T[T.length - 1]; }
  function tierPneu(p) { var T = M.pneus || []; for (var i = 0; i < T.length; i++) if (p < T[i].ate) return T[i]; return T[T.length - 1]; }
  /* valores do estudo de referência, em unidades de tela */
  var STUDY = function (S) { return { res: P.residual[S.prazo] * 100, rend: P.custoCapitalAA * 100, seg: P.seguroAA * 100, lic: P.licenciamentoAno, rev: P.revisao.valor, pneu: P.pneus.valor, horas: P.gestaoHorasMes, hora: P.gestaoHora, parado: P.indisponibilidadeMes }; };
  /* média de mercado de cada premissa: valor + selo + fonte + explicação curta */
  function mkt(id, S) {
    var car = CARS[S.car] || CARS[0], ci = carInfo(car), pz = S.prazo, anos = pz / 12;
    switch (id) {
      case "res":
        var r = ci && ci.res && ci.res[pz] != null ? ci.res[pz] : P.residual[pz] * 100;
        if (car.blind && car.base) r = r * car.base / car.p;
        return { v: r, tag: ci && ci.res ? "o" : "e", src: "Tabela FIPE, nov/2026",
          det: ci && ci.res ? ci.resTxt.replace("{a}", nf(anos, 0) + (anos === 1 ? " ano" : " anos")).replace("{p}", nf(ci.res[pz], 0)) + (car.blind ? " A blindagem não é recuperada na revenda (premissa nossa)." : "") : "Sem série FIPE para este modelo: usamos o valor do estudo." };
      case "rend": return { v: (M.selic && M.selic.rend && M.selic.rend[pz]) || P.custoCapitalAA * 100, tag: "o", src: "Banco Central (Selic e Focus)", det: M.selic ? "Selic hoje " + nf(M.selic.meta, 2) + "% ao ano; o mercado projeta " + nf(M.selic.focus[2027], 2) + "% no fim de 2027 e " + nf(M.selic.focus[2028], 1) + "% no de 2028. É a média esperada nos próximos " + pz + " meses, antes de imposto." : "" };
      case "seg":
        var sv = segMercado(car, S.uf, S.idade), anual = sv / 100 * S.preco * (1 + mkt("res", S).v / 100) / 2;
        return { v: sv, tag: "d", src: "SUSEP (dados abertos) e IBGE", det: (ci && ci.cascoTxt ? ci.cascoTxt + " " : "") + "Estado " + S.uf + ", motorista de " + S.idade + " anos, apólice completa. Cerca de " + brl(anual, 0) + " por ano em média." };
      case "lic": return { v: P.licenciamentoAno, tag: "e", src: "Estudo de referência", det: "Varia por estado; confirme no Detran." };
      case "rev": var tr = tierRev(S.preco); return { v: tr.v, tag: "r", src: "Volkswagen, pacotes Vale+ (out/2026)", det: tr.txt };
      case "pneu": var tp = tierPneu(S.preco); return { v: tp.v, tag: "e", src: "Estudo + Pneubest (nov/2026)", det: tp.txt };
      case "parado": return { v: P.indisponibilidadeMes, tag: "e", src: "Estimativa (diária Localiza)", det: "4 dias parado por ano × diária de R$ 150 ÷ 12 meses." };
      case "horas": return { v: P.gestaoHorasMes, tag: "e", src: "Estudo de referência", det: "Multas, documentos, IPVA, seguro, oficina e venda do carro." };
      case "hora": return { v: M.hora ? M.hora.valor : P.gestaoHora, tag: "d", src: "IBGE (PNAD Contínua, jul–set/2026)", det: M.hora ? "R$ " + nf(M.hora.salario, 0) + " por mês ÷ " + nf(M.hora.horasMes, 1) + " h × " + nf(M.hora.encargos, 1) + " de encargos (estimativa)." : "" };
    }
    return { v: 0, tag: "e", src: "", det: "" };
  }
  var TAGS = { o: "fonte oficial", d: "dado oficial + estimativa", r: "referência de mercado", e: "estimativa" };
  /* valor padrão (sem ajuste do cliente) e valor em uso */
  function defVal(id, S) { return S.modo === "estudo" ? STUDY(S)[id] : mkt(id, S).v; }
  function val(id, S) { return S.a[id] != null ? S.a[id] : defVal(id, S); }
  function optsFrom(S) {
    return {
      preco: S.preco, km: S.km, prazo: S.prazo,
      res: val("res", S) / 100, rend: val("rend", S) / 100, seg: val("seg", S) / 100,
      ipva: (S.ipva != null ? S.ipva : ufRate(S.uf)) / 100,
      lic: val("lic", S), rev: val("rev", S), pneu: val("pneu", S), horas: val("horas", S), hora: val("hora", S), parado: val("parado", S)
    };
  }

  /* ---------- números animados ---------- */
  function tweenText(el, to, fmt) {
    var from = el._cur == null ? 0 : el._cur; el._cur = to;
    if (!HAS) { el.textContent = fmt(to); return; }
    if (el._tw) el._tw.kill();
    var o = { v: from };
    el._tw = gsap.to(o, { v: to, duration: 0.5, ease: "power2.out", onUpdate: function () { el.textContent = fmt(o.v); } });
  }
  function countOnce(el, to, fmt, dur, delay) {
    el._cur = to;
    if (!HAS) { el.textContent = fmt(to); return; }
    var o = { v: 0 };
    gsap.to(o, { v: to, duration: dur || 1.6, delay: delay || 0, ease: "power3.out", onUpdate: function () { el.textContent = fmt(o.v); } });
  }

  /* ---------- barra empilhada reutilizável ---------- */
  var META = {};
  D.grupos.forEach(function (g) { META[g.k] = g; });
  function makeStack(boxSel, legSel, detSel) {
    var box = $(boxSel), leg = $(legSel), det = $(detSel), last = null, hot = null;
    box.innerHTML = D.grupos.map(function (g) { return '<div class="seg" data-k="' + g.k + '" style="background:' + g.cor + '"></div>'; }).join("");
    leg.innerHTML = D.grupos.map(function (g) {
      return '<li class="lg" data-k="' + g.k + '"><i style="background:' + g.cor + '"></i><span class="n">' + g.nome + '</span><span class="v"></span><span class="p"></span></li>';
    }).join("");
    var idle = det.innerHTML;
    function show(k) {
      hot = k; box.classList.add("dim");
      $$(".seg", box).forEach(function (s) { s.classList.toggle("hot", s.getAttribute("data-k") === k); });
      $$(".lg", leg).forEach(function (s) { s.classList.toggle("hot", s.getAttribute("data-k") === k); });
      if (last) {
        var g = last.grupos.filter(function (x) { return x.k === k; })[0], m = META[k];
        det.innerHTML = "<b>" + m.nome + ".</b> " + m.texto + " <b>" + brl(g.v / last.div) + "</b> " + last.rot + " (" + pct(g.v / last.total, 0) + ").";
      }
    }
    function hide() {
      hot = null; box.classList.remove("dim");
      $$(".hot", box.parentNode).forEach(function (s) { s.classList.remove("hot"); });
      det.innerHTML = idle;
    }
    [box, leg].forEach(function (root) {
      root.addEventListener("mouseover", function (e) { var t = e.target.closest("[data-k]"); if (t) show(t.getAttribute("data-k")); });
      root.addEventListener("mouseleave", hide);
      root.addEventListener("click", function (e) { var t = e.target.closest("[data-k]"); if (!t) return; var k = t.getAttribute("data-k"); if (hot === k) hide(); else show(k); });
    });
    return {
      update: function (grupos, div, rot) {
        var total = grupos.reduce(function (a, g) { return a + g.v; }, 0);
        last = { grupos: grupos, total: total, div: div, rot: rot };
        grupos.forEach(function (g) {
          $('.seg[data-k="' + g.k + '"]', box).style.flexGrow = g.v;
          var row = $('.lg[data-k="' + g.k + '"]', leg);
          $(".v", row).textContent = brl(g.v / div);
          $(".p", row).textContent = pct(g.v / total, 0);
        });
        if (hot) show(hot);
      }
    };
  }

  /* =====================  POPUPS  ===================== */
  var pop = $("#pop"), popTarget = null, pinned = null, tourOn = false;
  function dica(k) { return D.dicas[k] || { t: "", d: "" }; }
  function placePop() {
    if (!popTarget || pop.hidden) return;
    var r = popTarget.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight, docW = document.documentElement.clientWidth;
    var left = scrollX + r.left + r.width / 2 - pw / 2;
    left = clamp(left, scrollX + 10, scrollX + docW - pw - 10);
    var below = r.bottom + 12 + ph < innerHeight || r.top < ph + 24;
    var top = below ? scrollY + r.bottom + 12 : scrollY + r.top - ph - 12;
    pop.style.left = left + "px"; pop.style.top = top + "px";
    pop.classList.toggle("up", !below);
    pop.style.setProperty("--ax", clamp(scrollX + r.left + r.width / 2 - left, 18, pw - 18) + "px");
  }
  function showPop(target, html, tour) {
    popTarget = target; pop.innerHTML = html; pop.hidden = false; pop.classList.toggle("tour", !!tour);
    placePop();
    pop.classList.remove("in"); void pop.offsetWidth; pop.classList.add("in");
  }
  function hidePop() { pop.hidden = true; popTarget = null; pinned = null; }
  function tipHTML(k) { var d = dica(k); return '<b class="pop-t">' + esc(d.t) + '</b><p>' + esc(d.d) + "</p>"; }
  document.addEventListener("mouseover", function (e) {
    var t = e.target.closest && e.target.closest(".tip-i"); if (!t || tourOn || pinned) return;
    showPop(t, tipHTML(t.getAttribute("data-tip")));
  });
  document.addEventListener("mouseout", function (e) {
    var t = e.target.closest && e.target.closest(".tip-i"); if (!t || tourOn || pinned) return;
    hidePop();
  });
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".tip-i");
    if (t) {
      e.preventDefault(); e.stopPropagation();
      if (tourOn) return;
      if (pinned === t) { hidePop(); return; }
      pinned = t; showPop(t, tipHTML(t.getAttribute("data-tip")));
      return;
    }
    if (!tourOn && !pop.hidden && !e.target.closest("#pop")) hidePop();
  });
  addEventListener("keydown", function (e) { if (e.key === "Escape") { if (tourOn) endTour(); else hidePop(); closeCombo(); } });
  addEventListener("scroll", function () { if (!pop.hidden) { if (tourOn || pinned) placePop(); else hidePop(); } }, { passive: true });
  addEventListener("resize", placePop);

  /* guia rápido */
  var tourI = 0, tourHL = null;
  function tourStep(i) {
    var steps = D.guia; tourI = clamp(i, 0, steps.length - 1);
    var s = steps[tourI], el = $(s.sel); if (!el) return;
    if (tourHL) tourHL.classList.remove("tour-hl");
    tourHL = el; el.classList.add("tour-hl");
    var d = dica(s.dica);
    var html = '<span class="pop-n">Passo ' + (tourI + 1) + " de " + steps.length + "</span><b class=\"pop-t\">" + esc(d.t) + "</b><p>" + esc(d.d) + '</p><div class="pop-b">' +
      (tourI > 0 ? '<button type="button" data-a="prev">Voltar</button>' : "<span></span>") +
      '<button type="button" class="go" data-a="' + (tourI === steps.length - 1 ? "end" : "next") + '">' + (tourI === steps.length - 1 ? "Concluir" : "Próximo") + '</button></div><button class="pop-x" type="button" data-a="end" aria-label="Fechar guia">×</button>';
    var r = el.getBoundingClientRect();
    var target = scrollY + r.top - Math.max(90, (innerHeight - r.height) / 2 - 40);
    window.scrollTo({ top: Math.max(0, target), behavior: REDUCE ? "auto" : "smooth" });
    setTimeout(function () { showPop(el, html, true); }, REDUCE ? 0 : 520);
  }
  function startTour() { tourOn = true; hidePop(); tourOn = true; tourStep(0); }
  function endTour() { tourOn = false; if (tourHL) tourHL.classList.remove("tour-hl"); tourHL = null; hidePop(); }
  pop.addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]"); if (!b) return;
    var a = b.getAttribute("data-a");
    if (a === "next") tourStep(tourI + 1); else if (a === "prev") tourStep(tourI - 1); else endTour();
  });
  $("#guide-btn").addEventListener("click", startTour);

  /* =====================  PÁGINA 1  ===================== */
  var BASE_S = { km: 1000, prazo: 36, preco: D.precoReferencia, uf: "RJ", idade: 40, car: 0, modo: "estudo", ipva: null, a: {} };
  var base = modelo(optsFrom(BASE_S));
  var st1 = makeStack("#stack1", "#legend1", "#detail1");
  var modo = "mes";
  function upd1() { st1.update(base.grupos, modo === "mes" ? 36 : 1, modo === "mes" ? "por mês" : "em 36 meses"); }
  upd1();
  $("#toggle").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    modo = b.getAttribute("data-v");
    $$("#toggle button").forEach(function (x) { x.classList.toggle("on", x === b); });
    upd1();
  });
  var fatoPreco = base.total / D.precoReferencia;
  var fatoDois = (base.depr + base.capital) / base.total;
  var juros36 = financ(D.precoReferencia, 36).juros;
  $("#f1bar").setAttribute("data-w", (fatoPreco * 100).toFixed(1));
  $("#f2bar").setAttribute("data-w", (fatoDois * 100).toFixed(1));
  function setBars() { $$(".f-bar i").forEach(function (i) { i.style.width = i.getAttribute("data-w") + "%"; }); }
  function moneyFmt(v) { return brl(v, 2); }
  function intFmt(v) { return nf(v, 0); }

  /* =====================  PÁGINA 2  ===================== */
  var S = {
    carros: D.padrao.carros, km: D.padrao.km, prazo: D.padrao.prazo, preco: D.precoReferencia, fin: 0, mov: 0, car: 0,
    uf: D.ufPadrao, idade: 40, modo: "mercado", ipva: null, a: {}
  };

  var AS = [
    { grupo: "O carro", id: "res", t: "Quanto o carro vale no fim", min: 20, max: 95, step: 0.5, fmt: function (v) { return nf(v, 1) + "%"; } },
    { id: "rend", t: "Rendimento do dinheiro, ao ano", min: 0, max: 25, step: 0.1, fmt: function (v) { return nf(v, 1) + "%"; } },
    { id: "seg", t: "Seguro, ao ano", min: 1, max: 12, step: 0.05, fmt: function (v) { return nf(v, 2) + "%"; } },
    { grupo: "Impostos", id: "ipva", special: true },
    { id: "lic", t: "Licenciamento, por ano", min: 0, max: 1000, step: 10, fmt: function (v) { return brl(v, 0); } },
    { grupo: "Manutenção", id: "rev", t: "Revisão, a cada 10.000 km", min: 300, max: 3500, step: 1, fmt: function (v) { return brl(v, 0); } },
    { id: "pneu", t: "Jogo de pneus, a cada 40.000 km", min: 1000, max: 8000, step: 10, fmt: function (v) { return brl(v, 0); } },
    { grupo: "Imprevistos e equipe", id: "parado", t: "Imprevistos e carro parado, por mês", min: 0, max: 500, step: 5, fmt: function (v) { return brl(v, 0); } },
    { id: "horas", t: "Tempo da equipe, horas por mês", min: 0, max: 10, step: 0.5, fmt: function (v) { return nf(v, 1) + " h"; } },
    { id: "hora", t: "Custo da hora da equipe", min: 10, max: 200, step: 0.5, fmt: function (v) { return brl(v, 1); } }
  ];
  function curVal(a) { return a.special ? (S.ipva != null ? S.ipva : ufRate(S.uf)) : val(a.id, S); }
  function isChanged(a) {
    if (a.special) return S.ipva != null && Math.abs(S.ipva - ufRate(S.uf)) > 1e-9;
    return S.a[a.id] != null && Math.abs(S.a[a.id] - defVal(a.id, S)) > 1e-6;
  }
  function clearOv() { for (var i = 0; i < arguments.length; i++) S.a[arguments[i]] = null; }

  /* monta o painel de premissas */
  (function buildAssum() {
    var html = "", last = "";
    AS.forEach(function (a) {
      if (a.grupo && a.grupo !== last) { html += '<p class="as-g">' + esc(a.grupo) + "</p>"; last = a.grupo; }
      var tip = a.special ? "uf" : a.id, label = a.special ? '<label for="as-ipva" id="as-ipva-l">IPVA</label>' : '<label for="as-' + a.id + '">' + esc(a.t) + "</label>";
      html += '<div class="ac" data-id="' + a.id + '"><div class="ac-top">' + label + '<button class="tip-i" type="button" data-tip="' + tip + '" aria-label="O que é isto?">i</button><span class="chg-tag">ajustado</span><output id="as-' + a.id + '-o"></output></div>' +
        '<input id="as-' + a.id + '" type="range" min="' + (a.special ? 0 : a.min) + '" max="' + (a.special ? 6 : a.max) + '" step="' + (a.special ? 0.05 : a.step) + '" />' +
        '<p class="ac-mk" id="as-' + a.id + '-mk"></p><p class="ac-det" id="as-' + a.id + '-det"></p></div>';
    });
    $("#assum-body").innerHTML = html;
    $("#fontes").innerHTML = '<h4>De onde vêm os números</h4><ul>' + (M.fontes || []).map(function (f) {
      return "<li><b>" + esc(f.n) + ".</b> " + esc(f.t) + (f.u ? ' <a href="' + esc(f.u) + '" target="_blank" rel="noopener">fonte</a>' : "") + "</li>";
    }).join("") + "</ul>" + (M.aviso ? '<p style="margin-top:8px">' + esc(M.aviso) + "</p>" : "");
  })();

  function renderAssum() {
    var n = 0, est = S.modo === "estudo";
    $$("#in-modo button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-v") === S.modo); });
    $("#as-lead").textContent = est ? "Números do estudo executivo de referência (Fiat Argo, 36 meses). Você pode ajustar cada um."
      : "Cada número abaixo é a média de mercado para o carro, o estado e a idade escolhidos, com a fonte indicada. Você pode ajustar qualquer um.";
    AS.forEach(function (a) {
      var wrap = $('.ac[data-id="' + a.id + '"]'), ch = isChanged(a); if (ch) n++;
      wrap.classList.toggle("chg", ch);
      var inp = $("#as-" + a.id), v = curVal(a), mk = $("#as-" + a.id + "-mk"), det = $("#as-" + a.id + "-det");
      var min = +inp.min, max = +inp.max;
      inp.value = Math.min(max, Math.max(min, v));
      inp.style.setProperty("--p", ((inp.value - min) / (max - min)) * 100 + "%");
      var fmt = a.special ? function (x) { return nf(x, 2) + "%"; } : a.fmt;
      $("#as-" + a.id + "-o").textContent = fmt(v);
      var back = ch ? '<button type="button" class="back" data-back="' + a.id + '">voltar à média</button>' : "";
      if (a.special) {
        var e = ufEst(S.uf);
        $("#as-ipva-l").textContent = "IPVA (" + S.uf + "), ao ano";
        mk.innerHTML = (est ? "Estudo: " : "Média: ") + "<b>" + nf(e.ipva, 2) + "%</b> <span class=\"est\">referência</span> <span class=\"src\">levantamento na imprensa, 2026</span>" + back;
        det.textContent = (e.nota ? e.nota + " " : "") + "Não conferido na Secretaria da Fazenda: confirme.";
        return;
      }
      if (est) {
        mk.innerHTML = "Estudo: <b>" + fmt(defVal(a.id, S)) + "</b> <span class=\"src\">estudo executivo de referência</span>" + back;
        det.textContent = "";
      } else {
        var m = mkt(a.id, S);
        mk.innerHTML = "Média de mercado: <b>" + fmt(m.v) + "</b> <span class=\"est" + (m.tag === "o" ? " of" : "") + "\">" + TAGS[m.tag] + "</span> <span class=\"src\">" + esc(m.src) + "</span>" + back;
        det.textContent = m.det;
      }
    });
    $("#assum-n").textContent = n ? n + (n === 1 ? " ajustada" : " ajustadas") : (est ? "do estudo" : "médias de mercado");
    $("#assum-n").classList.toggle("on", n > 0);
    $("#reset").hidden = n === 0;
    return n;
  }
  $("#assum-body").addEventListener("input", function (e) {
    var t = e.target; if (t.type !== "range") return;
    var id = t.id.replace("as-", "");
    if (id === "ipva") S.ipva = +t.value; else S.a[id] = +t.value;
    update();
  });
  $("#assum-body").addEventListener("click", function (e) {
    var b = e.target.closest("[data-back]"); if (!b) return;
    var id = b.getAttribute("data-back"); if (id === "ipva") S.ipva = null; else S.a[id] = null; update();
  });
  $("#reset").addEventListener("click", function () { S.a = {}; S.ipva = null; update(); });
  $("#in-modo").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; S.modo = b.getAttribute("data-v"); S.a = {}; update(); });
  /* o ícone "i" dentro do resumo não deve abrir/fechar o painel */
  $("#assum summary").addEventListener("click", function (e) { if (e.target.closest(".tip-i")) e.preventDefault(); });

  /* ---------- perfil: idade e estado ---------- */
  var inIdade = $("#in-idade"), inUf = $("#in-uf");
  inUf.innerHTML = D.estados.map(function (e) { return '<option value="' + e.uf + '">' + esc(e.nome) + " (" + e.uf + ")</option>"; }).join("");
  inIdade.addEventListener("input", function () { var v = parseInt(inIdade.value, 10); if (v >= 18 && v <= 85) { S.idade = v; clearOv("seg"); update(); } });
  inIdade.addEventListener("blur", function () { inIdade.value = S.idade; });
  inUf.addEventListener("change", function () { S.uf = inUf.value; S.ipva = null; clearOv("seg"); update(); });

  /* ---------- seletor de carros ---------- */
  var combo = $("#combo"), comboBtn = $("#combo-btn"), comboPop = $("#combo-pop"), carQ = $("#car-q"), comboList = $("#combo-list");
  function buildList(q) {
    var nq = norm(q || ""), groups = [], map = {};
    CARS.forEach(function (c, i) {
      if (nq && norm(c.n + " " + c.g).indexOf(nq) < 0) return;
      var key = (c.blind ? "Grupo " + c.g + " · blindados" : c.g === "REF" ? "Referência do estudo" : "Grupo " + c.g);
      if (!map[key]) { map[key] = { name: key, items: [] }; groups.push(map[key]); }
      map[key].items.push({ c: c, i: i });
    });
    if (!groups.length) { comboList.innerHTML = '<p class="combo-empty">Nenhum modelo encontrado. Digite o preço no campo abaixo.</p>'; return; }
    comboList.innerHTML = groups.map(function (g) {
      return '<div class="cg"><p class="cg-h">' + esc(g.name) + "</p>" + g.items.map(function (x) {
        return '<button type="button" role="option" class="co' + (x.i === S.car ? " sel" : "") + '" data-i="' + x.i + '"><span class="co-n">' + esc(x.c.n) + (x.c.nt ? "<small>" + esc(x.c.nt) + "</small>" : "") + '</span><span class="co-p">' + (x.c.blind ? "~" : "") + brl(x.c.p, 0) + "</span></button>";
      }).join("") + "</div>";
    }).join("");
  }
  function openCombo() { comboPop.hidden = false; comboBtn.setAttribute("aria-expanded", "true"); buildList(carQ.value); setTimeout(function () { carQ.focus({ preventScroll: true }); }, 30); }
  function closeCombo() { if (comboPop.hidden) return; comboPop.hidden = true; comboBtn.setAttribute("aria-expanded", "false"); }
  comboBtn.addEventListener("click", function () { if (comboPop.hidden) openCombo(); else closeCombo(); });
  carQ.addEventListener("input", function () { buildList(carQ.value); });
  carQ.addEventListener("keydown", function (e) { if (e.key === "Enter") { var f = $(".co", comboList); if (f) f.click(); e.preventDefault(); } });
  comboList.addEventListener("click", function (e) {
    var b = e.target.closest(".co"); if (!b) return;
    S.car = +b.getAttribute("data-i"); S.preco = CARS[S.car].p; clearOv("res", "rev", "pneu", "seg"); closeCombo(); carQ.value = ""; update();
  });
  document.addEventListener("click", function (e) { if (!e.target.closest("#combo")) closeCombo(); });

  /* ---------- URL e controles ---------- */
  var q = new URLSearchParams(location.search);
  function num(k) { var v = parseFloat((q.get(k) || "").replace(",", ".")); return isNaN(v) ? null : v; }
  if (num("carros") != null) S.carros = clamp(Math.round(num("carros")), 1, 200);
  if (num("km") != null) S.km = clamp(Math.round(num("km") / 100) * 100, 500, 6000);
  if (num("prazo") != null && P.residual[num("prazo")]) S.prazo = num("prazo");
  if (num("preco") != null) S.preco = clamp(num("preco"), 20000, 600000);
  if (num("movida") != null) S.mov = Math.max(0, num("movida"));
  if (q.get("financiar") === "1") S.fin = 1;
  if (q.get("uf") && D.estados.some(function (e) { return e.uf === q.get("uf"); })) S.uf = q.get("uf");
  if (num("ipva") != null) S.ipva = clamp(num("ipva"), 0, 6);
  if (num("idade") != null) S.idade = clamp(Math.round(num("idade")), 18, 85);
  if (q.get("modo") === "estudo") S.modo = "estudo";
  AS.forEach(function (a) { if (!a.special && num("a_" + a.id) != null) S.a[a.id] = clamp(num("a_" + a.id), a.min, a.max); });
  (function matchCar() { for (var i = 0; i < CARS.length; i++) if (Math.abs(CARS[i].p - S.preco) < 0.5) { S.car = i; break; } })();

  var inCar = $("#in-carros"), inKm = $("#in-km"), inPreco = $("#in-preco"), inPrecoN = $("#in-preco-n"), inMov = $("#in-mov");
  inCar.value = S.carros; inKm.value = S.km; inPreco.value = S.preco; inPrecoN.value = nf(S.preco, 2);
  if (S.mov > 0) inMov.value = nf(S.mov, 2);
  var st2 = makeStack("#stack2", "#legend2", "#detail2");

  function rangeFill(r) { r.style.setProperty("--p", ((r.value - r.min) / (r.max - r.min)) * 100 + "%"); }

  /* ---------- tabela "passo a passo" ---------- */
  function renderMath(c, o) {
    var anos = o.prazo / 12, A = nf(anos, 0) + (anos === 1 ? " ano" : " anos"), ajust = {};
    AS.forEach(function (a) { ajust[a.id] = isChanged(a); });
    var rows = [
      { k: "m_depr", n: "Desvalorização", f: brl(o.preco) + " × (100% − " + pct(o.res, 0) + ")", v: c.depr, ch: ajust.res },
      { k: "m_capital", n: "Dinheiro parado", f: "valor médio × " + pct(o.rend, 1) + " ao ano × " + A, v: c.capital, ch: ajust.rend },
      { k: "m_seguro", n: "Seguro", f: "valor médio × " + pct(o.seg, 1) + " ao ano × " + A, v: c.seguro, ch: ajust.seg },
      { k: "m_ipva", n: "IPVA (" + S.uf + ")", f: "valor médio × " + pct(o.ipva, 2) + " ao ano × " + A, v: c.ipva, ch: ajust.uf },
      { k: "m_lic", n: "Licenciamento", f: brl(o.lic, 0) + " por ano × " + A, v: c.lic, ch: ajust.lic },
      { k: "m_rev", n: "Revisões", f: nf(o.km * o.prazo) + " km ÷ 10.000 × " + brl(o.rev, 0), v: c.manut, ch: ajust.rev },
      { k: "m_pneu", n: "Pneus", f: nf(o.km * o.prazo) + " km ÷ 40.000 × " + brl(o.pneu, 0), v: c.pneus, ch: ajust.pneu },
      { k: "m_equipe", n: "Tempo da equipe", f: nf(o.horas, 1) + " h por mês × " + brl(o.hora, 0) + " × " + o.prazo + " meses", v: c.gestao, ch: ajust.horas || ajust.hora },
      { k: "m_parado", n: "Carro parado e imprevistos", f: brl(o.parado, 0) + " por mês × " + o.prazo + " meses", v: c.indisp, ch: ajust.parado }
    ];
    $("#medio").innerHTML = '<b>Valor médio do carro</b> = (' + brl(o.preco) + " + " + brl(c.fimValor) + ") ÷ 2 = <b>" + brl(c.medio) + '</b> <button class="tip-i" type="button" data-tip="medio" aria-label="O que é isto?">i</button>';
    $("#math tbody").innerHTML = rows.map(function (r) {
      return '<tr><td data-l="Item"><span class="mi">' + esc(r.n) + '</span><button class="tip-i tip-s" type="button" data-tip="' + r.k + '" aria-label="O que é isto?">i</button>' + (r.ch ? '<span class="chg-dot">ajustado</span>' : "") + '</td><td data-l="Como calculamos" class="f">' + esc(r.f) + '</td><td data-l="No prazo" class="n">' + brl(r.v) + '</td><td data-l="Por mês" class="n">' + brl(r.v / o.prazo) + "</td></tr>";
    }).join("");
    $("#math tfoot").innerHTML =
      '<tr class="tot"><td colspan="2">Total por carro</td><td class="n">' + brl(c.total) + '</td><td class="n">' + brl(c.mensal) + "</td></tr>" +
      '<tr><td colspan="2">Por quilômetro rodado <span class="f">(' + brl(c.mensal) + " ÷ " + nf(o.km) + " km)</span></td><td class=\"n\" colspan=\"2\">" + brl(c.porKm) + "</td></tr>" +
      '<tr><td colspan="2">Frota toda <span class="f">(× ' + nf(S.carros) + (S.carros === 1 ? " carro)" : " carros)") + '</span></td><td class="n">' + brl(c.total * S.carros, 0) + '</td><td class="n">' + brl(c.mensal * S.carros, 0) + "</td></tr>";
  }

  function update() {
    var o = optsFrom(S), c = modelo(o), n = S.carros;
    var sel = CARS[S.car], ajustado = Math.abs(sel.p - S.preco) > 0.5;
    $("#cb-name").textContent = sel.n + (ajustado ? " (preço ajustado)" : "");
    $("#cb-price").textContent = brl(S.preco, 0);
    $("#car-hint").textContent = sel.blind ? "Preço aproximado, com blindagem (base: " + brl(sel.base, 0) + ")." : sel.g === "REF" ? "Carro e preço de referência usados no estudo." : "Preço de tabela 0 km (referência)" + (sel.nt ? " · " + sel.nt : "") + ".";
    $("#out-carros").textContent = nf(n);
    $("#out-km").textContent = nf(S.km) + " km";
    if (document.activeElement !== inPrecoN) inPrecoN.value = nf(S.preco, 2);
    inPreco.value = clamp(S.preco, +inPreco.min, +inPreco.max);
    [inCar, inKm, inPreco].forEach(rangeFill);
    $$("#in-prazo button").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-v") === S.prazo); });
    $$("#in-fin button").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-v") === S.fin); });
    renderAssum();
    inIdade.value = S.idade; inUf.value = S.uf;
    var sgv = S.modo === "estudo" ? P.seguroAA * 100 : val("seg", S), sgAnual = sgv / 100 * c.medio;
    $("#perfil-hint").textContent = S.modo === "estudo" ? "Na base \u201cPremissas do estudo\u201d o seguro é fixo em " + nf(P.seguroAA * 100, 1) + "% ao ano; só o IPVA muda com o estado."
      : "Seguro estimado para este carro: " + nf(sgv, 2) + "% ao ano (cerca de " + brl(sgAnual, 0) + " por ano) · IPVA em " + S.uf + ": " + nf(S.ipva != null ? S.ipva : ufRate(S.uf), 2) + "% ao ano.";

    tweenText($("#r-mes"), c.mensal, moneyFmt);
    tweenText($("#r-frota"), c.mensal * n, moneyFmt);
    $("#r-total-l").textContent = "Frota toda, em " + S.prazo + " meses";
    tweenText($("#r-total"), c.total * n, moneyFmt);
    tweenText($("#r-km"), c.porKm, moneyFmt);

    var f = financ(S.preco, S.prazo);
    $("#r-fin").hidden = !S.fin;
    if (S.fin) {
      tweenText($("#fin-entrada"), f.entrada, moneyFmt);
      tweenText($("#fin-parcela"), f.parcela, moneyFmt);
      tweenText($("#fin-juros"), f.juros, moneyFmt);
    }

    var hasMov = S.mov > 0;
    $("#r-cmp").hidden = !hasMov;
    if (hasMov) {
      var mx = Math.max(c.mensal, S.mov), diff = c.mensal - S.mov, ad = Math.abs(diff);
      $("#cmp-own").style.width = (c.mensal / mx) * 100 + "%";
      $("#cmp-mov").style.width = (S.mov / mx) * 100 + "%";
      $("#cmp-own-v").textContent = brl(c.mensal);
      $("#cmp-mov-v").textContent = brl(S.mov);
      if (ad < 0.5) {
        $("#cmp-big").textContent = "Os valores são praticamente iguais.";
        $("#cmp-small").textContent = "A Movida ainda inclui tudo o que está listado mais abaixo.";
      } else if (diff > 0) {
        $("#cmp-big").textContent = brl(ad) + " a menos por mês, por carro.";
        $("#cmp-small").textContent = "Na frota toda: " + brl(ad * n, 0) + " por mês e " + brl(ad * n * S.prazo, 0) + " em " + S.prazo + " meses.";
      } else {
        $("#cmp-big").textContent = brl(ad) + " a mais por mês, por carro.";
        $("#cmp-small").textContent = "Veja abaixo tudo o que a Movida já inclui nesse valor.";
      }
    }
    st2.update(c.grupos, S.prazo, "por carro, por mês");
    renderMath(c, o);
  }

  inCar.addEventListener("input", function () { S.carros = +inCar.value; update(); });
  inKm.addEventListener("input", function () { S.km = +inKm.value; update(); });
  inPreco.addEventListener("input", function () { S.preco = +inPreco.value; update(); });
  inPrecoN.addEventListener("input", function () { var v = parseMoney(inPrecoN.value); if (v > 0) { S.preco = clamp(v, 20000, 600000); update(); } });
  inPrecoN.addEventListener("blur", function () { inPrecoN.value = nf(S.preco, 2); });
  $("#in-prazo").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; S.prazo = +b.getAttribute("data-v"); clearOv("res", "rend"); update(); });
  $("#in-fin").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; S.fin = +b.getAttribute("data-v"); update(); });
  inMov.addEventListener("input", function () { S.mov = parseMoney(inMov.value); update(); });
  inMov.addEventListener("blur", function () { if (S.mov > 0) inMov.value = nf(S.mov, 2); });

  /* compartilhar cenário */
  var toast = $("#toast"), tt;
  function showToast(t) { toast.textContent = t; toast.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toast.hidden = true; }, 2000); }
  $("#share").addEventListener("click", function () {
    var p = new URLSearchParams();
    p.set("carros", S.carros); p.set("km", S.km); p.set("prazo", S.prazo); p.set("preco", Math.round(S.preco * 100) / 100);
    if (S.fin) p.set("financiar", 1);
    if (S.mov > 0) p.set("movida", S.mov);
    if (S.uf !== D.ufPadrao) p.set("uf", S.uf);
    if (S.idade !== 40) p.set("idade", S.idade);
    if (S.modo === "estudo") p.set("modo", "estudo");
    if (S.ipva != null) p.set("ipva", S.ipva);
    AS.forEach(function (a) { if (!a.special && isChanged(a)) p.set("a_" + a.id, curVal(a)); });
    var url = location.origin + location.pathname + "?" + p.toString() + "#conta";
    function fallback() { var t = document.createElement("textarea"); t.value = url; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); showToast("Link copiado"); } catch (e) { showToast("Não foi possível copiar"); } document.body.removeChild(t); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(function () { showToast("Link copiado"); }, fallback); else fallback();
  });

  /* incluso, contrato, aviso, botão final */
  $("#incl").innerHTML = D.incluso.map(function (i) { return '<li><span class="ck" aria-hidden="true">✓</span><b>' + i.t + "</b><span>" + i.d + "</span></li>"; }).join("");
  $("#contrato").innerHTML = D.contrato.map(function (c) { return "<li>" + c + "</li>"; }).join("");
  $("#fine").textContent = D.aviso;
  if (D.cta && D.cta.href) { var cta = $("#cta"); cta.href = D.cta.href; cta.innerHTML = D.cta.texto + ' <span aria-hidden="true">→</span>'; cta.hidden = false; }

  
  update();

  /* ---------- barra, abas ---------- */
  var bar = $("#bar"), hero = $("#hero");
  function onScroll() { bar.classList.toggle("solid", scrollY > hero.offsetHeight - 90); }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  var tabs = $$("#tabs a");
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) tabs.forEach(function (t) { t.classList.toggle("on", t.getAttribute("data-s") === e.target.id); }); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  spy.observe($("#custo")); spy.observe($("#conta"));

  /* ---------- movimento ---------- */
  var heroVal = $("#hero-val");
  if (!HAS) {
    heroVal.textContent = brl(base.mensal);
    $("#f1").textContent = "97"; $("#f3").textContent = brl(juros36); setBars();
    return;
  }

  var arc = $(".m-arc"), L = arc.getTotalLength();
  arc.style.strokeDasharray = L; arc.style.strokeDashoffset = L;
  var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".bar", { y: -30, opacity: 0, duration: 0.7 }, 0)
    .from(".eyebrow", { y: 16, opacity: 0, duration: 0.7 }, 0.2)
    .from("#h1 .ln > span", { yPercent: 112, duration: 1.05, stagger: 0.12, ease: "power4.out" }, 0.3)
    .from("#bignum", { y: 30, opacity: 0, duration: 0.9 }, 0.95)
    .from(".hero .btn", { y: 20, opacity: 0, duration: 0.8 }, 1.4)
    .to(arc, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.4)
    .from(".m-dot", { y: -260, duration: 1.3, ease: "bounce.out" }, 0.7);
  countOnce(heroVal, base.mensal, moneyFmt, 1.8, 1.0);

  gsap.to(".motif", { yPercent: -20, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });

  function reveal(sel, vars, start) {
    gsap.utils.toArray(sel).forEach(function (n) {
      gsap.from(n, Object.assign({ y: 34, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: n, start: start || "top 88%", once: true } }, vars || {}));
    });
  }
  reveal(".eyebrow-o, .h-l, .sub, .toggle, .h-s, .detail, .next, .end, .chips, .guide-btn, .medio");

  gsap.from("#stack1", { clipPath: "inset(0 100% 0 0 round 14px)", duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: "#stack1", start: "top 85%", once: true } });
  gsap.from("#legend1 .lg", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07, scrollTrigger: { trigger: "#legend1", start: "top 90%", once: true } });

  ScrollTrigger.create({
    trigger: "#fatos", start: "top 72%", once: true,
    onEnter: function () {
      gsap.from(".fact", { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
      countOnce($("#f1"), 97, intFmt, 1.6, 0.2);
      countOnce($("#f3"), juros36, moneyFmt, 1.8, 0.5);
      setTimeout(setBars, 250);
    }
  });

  gsap.from(".controls .ctl, .controls .assum", { y: 26, opacity: 0, duration: 0.7, stagger: 0.08, scrollTrigger: { trigger: ".calc", start: "top 85%", once: true } });
  gsap.from(".result", { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".calc", start: "top 85%", once: true } });
  gsap.from(".math tbody tr", { x: -24, opacity: 0, duration: 0.6, stagger: 0.06, scrollTrigger: { trigger: "#math", start: "top 88%", once: true } });
  gsap.from("#stack2", { clipPath: "inset(0 100% 0 0 round 14px)", duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: "#stack2", start: "top 88%", once: true } });
  gsap.from("#legend2 .lg", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07, scrollTrigger: { trigger: "#legend2", start: "top 92%", once: true } });
  gsap.from(".incl-grid li", { y: 34, opacity: 0, duration: 0.7, stagger: 0.09, scrollTrigger: { trigger: ".incl-grid", start: "top 88%", once: true } });
})();
