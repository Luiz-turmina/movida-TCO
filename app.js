/* app.js — modelo de custo, interações, popups, guia e movimento. Textos em data.js; números de mercado em mercado.js */
(function () {
  "use strict";
  var D = window.MOVIDA_DATA, P = D.premissas, M = window.MOVIDA_MERCADO || {};
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HAS = !!window.gsap && !!window.ScrollTrigger && !REDUCE;
  if (HAS) gsap.registerPlugin(ScrollTrigger);

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function brl(v, d) {
    d = d == null ? 2 : d;
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, " ");
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

  /* ---------- modelo ---------- */
  function modelo(o) {
    var anos = o.prazo / 12, medio = o.preco * (1 + o.res) / 2;
    var c = {
      anos: anos, medio: medio, fimValor: o.preco * o.res,
      depr: o.preco * (1 - o.res),
      capital: medio * o.rend * anos,
      seguro: medio * o.seg * anos,
      ipva: medio * o.ipva * anos,
      lic: o.lic * anos,
      nRev: o.km * o.prazo / P.revisaoKm, nPneu: o.km * o.prazo / P.pneusKm,
      diasTot: o.dias * anos
    };
    c.manut = o.rev * c.nRev; c.pneus = o.pneu * c.nPneu;
    c.gestao = o.horas * o.hora * o.prazo;
    c.indisp = c.diasTot * o.diaria;
    c.total = c.depr + c.capital + c.seguro + c.ipva + c.lic + c.manut + c.pneus + c.gestao + c.indisp;
    c.mensal = c.total / o.prazo;
    c.porKm = c.mensal / o.km;
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

  /* ---------- médias de mercado (mercado.js) ---------- */
  var CARS = D.carros;
  function ufEst(uf) { return D.estados.filter(function (x) { return x.uf === uf; })[0] || { uf: uf, nome: uf, ipva: 4 }; }
  function ufRate(uf) { return ufEst(uf).ipva; }
  function carKey(c) { return c.g + "|" + c.n; }
  function carInfo(c) { return c && M.carros ? M.carros[carKey(c)] || null : null; }
  function ageFactor(age) {
    var pts = (M.seguro && M.seguro.idade) || [[21.5, 1.54], [30.5, 1.12], [40.5, 1.01], [50.5, 0.97], [60, 0.89]];
    if (age <= pts[0][0]) return pts[0][1];
    for (var i = 1; i < pts.length; i++) if (age <= pts[i][0]) { var a = pts[i - 1], b = pts[i]; return a[1] + (b[1] - a[1]) * (age - a[0]) / (b[0] - a[0]); }
    return pts[pts.length - 1][1];
  }
  function segMercado(car, uf, idade) {
    var ci = carInfo(car), sg = M.seguro || {};
    var casco = ci ? ci.casco : sg.cascoPadrao || 0.025;
    var uf1 = (sg.uf && sg.uf[uf]) || 1, rc = (sg.rc && sg.rc[uf]) || sg.rcNac || 1.3;
    return casco * uf1 * ageFactor(idade) * rc * 100;
  }
  function tier(list, p) { list = list || []; for (var i = 0; i < list.length; i++) if (p < list[i].ate) return list[i]; return list[list.length - 1] || { v: 0, txt: "" }; }
  var TAGS = { o: "fonte oficial", v: "verificado", d: "dado oficial + estimativa", r: "referência de mercado", e: "estimativa" };
  function tagCls(t) { return t === "o" ? " of" : t === "v" ? " ve" : ""; }

  /* média de mercado de cada premissa: valor + selo + fonte + explicação curta */
  function mkt(id, S) {
    var car = CARS[S.car] || null, ci = carInfo(car), pz = S.prazo, anos = pz / 12;
    switch (id) {
      case "res":
        var r, txt, tg = "o";
        if (ci && ci.res && ci.res[pz] != null) { r = ci.res[pz]; txt = ci.resTxt.replace("{a}", nf(anos, 0) + (anos === 1 ? " ano" : " anos")).replace("{p}", nf(r, 0)); }
        else { var cp = M.curvaPadrao || {}; r = cp[pz] != null ? cp[pz] : 65; txt = "Sem série própria na FIPE para este carro: usamos a mediana dos modelos pesquisados (" + nf(r, 0) + "% do 0 km com " + nf(anos, 0) + (anos === 1 ? " ano" : " anos") + " de uso)."; tg = "r"; }
        if (car && car.blind && car.base) { r = r * car.base / car.p; txt += " A blindagem não é recuperada na revenda."; }
        return { v: r, tag: tg, src: "Tabela FIPE, nov/2026", det: txt };
      case "rend": return { v: (M.selic && M.selic.rend && M.selic.rend[pz]) || 12, tag: "o", src: "Banco Central (Selic e Focus)", det: M.selic ? "Selic hoje " + nf(M.selic.meta, 2) + "% ao ano; o mercado projeta " + nf(M.selic.focus[2027], 2) + "% no fim de 2027 e " + nf(M.selic.focus[2028], 1) + "% no de 2028. É a média esperada nos próximos " + pz + " meses, antes de imposto." : "" };
      case "seg":
        var sv = segMercado(car, S.uf, S.idade), anual = sv / 100 * S.preco * (1 + mkt("res", S).v / 100) / 2;
        return { v: sv, tag: "d", src: "SUSEP (dados abertos) e IBGE", det: (ci && ci.cascoTxt ? ci.cascoTxt + " " : "") + "Estado " + S.uf + ", motoristas de " + S.idade + " anos, apólice completa. Cerca de " + brl(anual, 0) + " por ano em média." };
      case "lic":
        var L = (M.licenciamento && M.licenciamento.uf && M.licenciamento.uf[S.uf]);
        if (L != null) return { v: L, tag: "v", src: "DCC Trânsito, tabela 2026", det: "" };
        return { v: (M.licenciamento && M.licenciamento.mediana) || 170, tag: "r", src: "DCC Trânsito, tabela 2026", det: "O estado não divulga o valor na fonte: usamos a mediana dos demais estados." };
      case "rev":
        if (ci && ci.rev) return { v: ci.rev.v, tag: ci.rev.tag || "v", src: ci.rev.src, det: ci.rev.txt };
        var tr = tier(M.revisao, S.preco); return { v: tr.v, tag: "r", src: "Média da faixa de carro", det: tr.txt };
      case "pneu":
        if (ci && ci.pneu) return { v: ci.pneu.v, tag: ci.pneu.tag || "r", src: ci.pneu.src, det: ci.pneu.txt };
        var tp = tier(M.pneus, S.preco); return { v: tp.v, tag: "r", src: "Média da faixa de carro", det: tp.txt };
      case "dias": var pk = M.parado || { dias: 7, txt: "" }; return { v: pk.dias, tag: "e", src: "Estimativa", det: pk.txt };
      case "diaria":
        if (ci && ci.diaria) return { v: ci.diaria.v, tag: ci.diaria.tag || "r", src: "Preços de aluguel avulso, 2026", det: ci.diaria.txt };
        var td = tier(M.diaria, S.preco); return { v: td.v, tag: "r", src: "Preços de aluguel avulso, 2026", det: td.txt };
      case "horas": return { v: P.gestaoHorasMes, tag: "e", src: "Estimativa", det: "Multas, documentos, IPVA, seguro, oficina e venda do carro." };
      case "hora": return { v: M.hora ? M.hora.valor : 34, tag: "d", src: "IBGE (PNAD Contínua, jul–set/2026)", det: M.hora ? "R$ " + nf(M.hora.salario, 0) + " por mês ÷ " + nf(M.hora.horasMes, 1) + " h × " + nf(M.hora.encargos, 1) + " de encargos (estimativa)." : "" };
    }
    return { v: 0, tag: "e", src: "", det: "" };
  }
  function defVal(id, S) { return mkt(id, S).v; }
  function val(id, S) { return S.a[id] != null ? S.a[id] : defVal(id, S); }
  function optsFrom(S) {
    return {
      preco: S.preco, km: S.km, prazo: S.prazo,
      res: val("res", S) / 100, rend: val("rend", S) / 100, seg: val("seg", S) / 100,
      ipva: (S.ipva != null ? S.ipva : ufRate(S.uf)) / 100,
      lic: val("lic", S), rev: val("rev", S), pneu: val("pneu", S), horas: val("horas", S), hora: val("hora", S),
      dias: val("dias", S), diaria: val("diaria", S)
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
  function moneyFmt(v) { return brl(v, 2); }

  /* ---------- barra empilhada ---------- */
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

  /* =====================  ESTADO E CONTROLES  ===================== */
  var S = {
    carros: D.padrao.carros, km: D.padrao.km, prazo: D.padrao.prazo, preco: 0, fin: 0, mov: 0, car: -1,
    uf: D.ufPadrao, idade: 40, ipva: null, a: {}
  };
  var hasCar = function () { return S.preco > 0; };

  var AS = [
    { grupo: "O carro", id: "res", t: "Quanto o carro vale no fim", min: 20, max: 95, step: 0.5, fmt: function (v) { return nf(v, 1) + "%"; } },
    { id: "rend", t: "Rendimento do dinheiro, ao ano", min: 0, max: 25, step: 0.1, fmt: function (v) { return nf(v, 1) + "%"; } },
    { id: "seg", t: "Seguro, ao ano", min: 1, max: 12, step: 0.05, fmt: function (v) { return nf(v, 2) + "%"; } },
    { grupo: "Impostos", id: "ipva", special: true },
    { id: "lic", t: "Licenciamento, por ano", min: 0, max: 1000, step: 1, fmt: function (v) { return brl(v, 0); } },
    { grupo: "Manutenção", id: "rev", t: "Revisão, a cada 10.000 km", min: 300, max: 4000, step: 1, fmt: function (v) { return brl(v, 0); } },
    { id: "pneu", t: "Jogo de 4 pneus, a cada 40.000 km", min: 800, max: 12000, step: 10, fmt: function (v) { return brl(v, 0); } },
    { grupo: "Carro parado e equipe", id: "dias", t: "Dias parado por ano", min: 0, max: 40, step: 0.5, fmt: function (v) { return nf(v, 1) + (v === 1 ? " dia" : " dias"); } },
    { id: "diaria", t: "Diária de um carro equivalente", min: 40, max: 900, step: 1, fmt: function (v) { return brl(v, 0); } },
    { id: "horas", t: "Tempo da equipe, horas por mês", min: 0, max: 10, step: 0.5, fmt: function (v) { return nf(v, 1) + " h"; } },
    { id: "hora", t: "Custo da hora da equipe", min: 10, max: 200, step: 0.5, fmt: function (v) { return brl(v, 1); } }
  ];
  function curVal(a) { return a.special ? (S.ipva != null ? S.ipva : ufRate(S.uf)) : val(a.id, S); }
  function isChanged(a) {
    if (a.special) return S.ipva != null && Math.abs(S.ipva - ufRate(S.uf)) > 1e-9;
    return S.a[a.id] != null && Math.abs(S.a[a.id] - defVal(a.id, S)) > 1e-6;
  }
  function clearOv() { for (var i = 0; i < arguments.length; i++) S.a[arguments[i]] = null; }

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
    var n = 0;
    $("#as-lead").textContent = "Cada número abaixo é a média de mercado para o carro, o estado e a idade escolhidos, com a fonte indicada. Você pode ajustar qualquer um.";
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
        mk.innerHTML = "Média: <b>" + nf(e.ipva, 2) + "%</b> <span class=\"est ve\">verificado</span> <span class=\"src\">CNN Brasil, ValorFinal e AutoDossiê</span>" + back;
        det.textContent = e.faixa ? "Faixa no estado: " + e.faixa + "." : "";
        return;
      }
      var m = mkt(a.id, S);
      mk.innerHTML = "Média de mercado: <b>" + fmt(m.v) + "</b> <span class=\"est" + tagCls(m.tag) + "\">" + TAGS[m.tag] + "</span> <span class=\"src\">" + esc(m.src) + "</span>" + back;
      det.textContent = m.det;
    });
    $("#assum-n").textContent = n ? n + (n === 1 ? " ajustada" : " ajustadas") : "médias de mercado";
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
  $("#assum summary").addEventListener("click", function (e) { if (e.target.closest(".tip-i")) e.preventDefault(); });

  /* ---------- perfil: idade, estado e proposta (página 2) + formulário da página 1 ---------- */
  var inIdade = $("#in-idade"), inUf = $("#in-uf"), inMov = $("#in-mov"), hIdade = $("#h-idade"), hUf = $("#h-uf"), hMov = $("#h-mov");
  var UFOPTS = D.estados.map(function (e) { return '<option value="' + e.uf + '">' + esc(e.nome) + " (" + e.uf + ")</option>"; }).join("");
  inUf.innerHTML = UFOPTS; hUf.innerHTML = UFOPTS;
  function setIdade(v) { v = parseInt(v, 10); if (v >= 18 && v <= 85) { S.idade = v; clearOv("seg"); update(); } }
  function setUf(v) { S.uf = v; S.ipva = null; clearOv("seg", "lic"); update(); }
  function setMov(v, from) { S.mov = parseMoney(v); if (from !== inMov) inMov.value = S.mov > 0 && from !== "x" ? v : inMov.value; if (from !== hMov) hMov.value = S.mov > 0 ? v : hMov.value; update(); }
  inIdade.addEventListener("input", function () { setIdade(inIdade.value); });
  hIdade.addEventListener("input", function () { setIdade(hIdade.value); });
  inIdade.addEventListener("blur", function () { inIdade.value = S.idade; });
  hIdade.addEventListener("blur", function () { hIdade.value = S.idade; });
  inUf.addEventListener("change", function () { setUf(inUf.value); });
  hUf.addEventListener("change", function () { setUf(hUf.value); });
  inMov.addEventListener("input", function () { setMov(inMov.value, inMov); });
  hMov.addEventListener("input", function () { setMov(hMov.value, hMov); });
  [inMov, hMov].forEach(function (el) { el.addEventListener("blur", function () { if (S.mov > 0) { inMov.value = nf(S.mov, 2); hMov.value = nf(S.mov, 2); } else { inMov.value = ""; hMov.value = ""; } }); });
  $("#intake").addEventListener("submit", function (e) {
    e.preventDefault();
    var go = $("#conta"); if (!go) return;
    var y = scrollY + go.getBoundingClientRect().top - 8;
    window.scrollTo({ top: y, behavior: REDUCE ? "auto" : "smooth" });
    setTimeout(startTour, REDUCE ? 50 : 900);
  });

  /* ---------- seletor de carros ---------- */
  var comboBtn = $("#combo-btn"), comboPop = $("#combo-pop"), carQ = $("#car-q"), comboList = $("#combo-list");
  function buildList(q) {
    var nq = norm(q || ""), groups = [], map = {};
    CARS.forEach(function (c, i) {
      if (nq && norm(c.n + " " + c.g).indexOf(nq) < 0) return;
      var key = c.blind ? "Grupo " + c.g + " · blindados" : "Grupo " + c.g;
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
    S.car = +b.getAttribute("data-i"); S.preco = CARS[S.car].p; clearOv("res", "rev", "pneu", "seg", "diaria"); closeCombo(); carQ.value = ""; update();
  });
  document.addEventListener("click", function (e) { if (!e.target.closest("#combo")) closeCombo(); });

  /* ---------- URL e controles ---------- */
  var q = new URLSearchParams(location.search), fromLink = false;
  function num(k) { var v = parseFloat((q.get(k) || "").replace(",", ".")); return isNaN(v) ? null : v; }
  if (num("carros") != null) S.carros = clamp(Math.round(num("carros")), 1, 200);
  if (num("km") != null) S.km = clamp(Math.round(num("km") / 100) * 100, 500, 6000);
  if (num("prazo") != null && [12, 24, 36, 48, 60].indexOf(num("prazo")) > -1) S.prazo = num("prazo");
  if (num("preco") != null) S.preco = clamp(num("preco"), 20000, 600000);
  if (num("m") != null && CARS[num("m")]) { S.car = num("m"); if (num("preco") == null) S.preco = CARS[S.car].p; }
  else if (S.preco > 0) { for (var i0 = 0; i0 < CARS.length; i0++) if (Math.abs(CARS[i0].p - S.preco) < 0.5) { S.car = i0; break; } }
  if (num("movida") != null) S.mov = Math.max(0, num("movida"));
  if (q.get("financiar") === "1") S.fin = 1;
  if (q.get("uf") && D.estados.some(function (e) { return e.uf === q.get("uf"); })) S.uf = q.get("uf");
  if (num("ipva") != null) S.ipva = clamp(num("ipva"), 0, 6);
  if (num("idade") != null) S.idade = clamp(Math.round(num("idade")), 18, 85);
  AS.forEach(function (a) { if (!a.special && num("a_" + a.id) != null) S.a[a.id] = clamp(num("a_" + a.id), a.min, a.max); });
  fromLink = q.has("carros") || q.has("preco") || q.has("m") || q.has("uf") || q.has("idade");

  var inCar = $("#in-carros"), inKm = $("#in-km"), inPreco = $("#in-preco"), inPrecoN = $("#in-preco-n");
  inCar.value = S.carros; inKm.value = S.km;
  var st2 = makeStack("#stack2", "#legend2", "#detail2");
  function rangeFill(r) { r.style.setProperty("--p", ((r.value - r.min) / (r.max - r.min)) * 100 + "%"); }

  /* ---------- passo a passo didático ---------- */
  function term(label, value, last) { return '<span class="eq-t' + (last ? " res" : "") + '"><small>' + esc(label) + "</small><b>" + esc(value) + "</b></span>"; }
  function op(s) { return '<span class="eq-op" aria-hidden="true">' + s + "</span>"; }
  function renderSteps(c, o) {
    var A = nf(c.anos, c.anos % 1 ? 1 : 0) + (c.anos === 1 ? " ano" : " anos"), ajust = {};
    AS.forEach(function (a) { ajust[a.id] = isChanged(a); });
    var uf = S.uf, kmTot = o.km * o.prazo;
    var rows = [
      { k: "m_depr", n: "Desvalorização", what: "O carro vale menos a cada ano. É a diferença entre o que você paga e o que recebe ao vendê-lo.", v: c.depr, ch: ajust.res,
        eq: [term("Preço pago", brl(o.preco)), op("−"), term("Valor na venda (" + pct(o.res, 1) + ")", brl(c.fimValor)), op("="), term("Desvalorização", brl(c.depr), 1)] },
      { k: "m_capital", n: "Dinheiro parado", what: "O dinheiro preso no carro poderia estar rendendo. É o rendimento que você deixa de ganhar.", v: c.capital, ch: ajust.rend,
        eq: [term("Valor médio do carro", brl(c.medio)), op("×"), term("Rendimento ao ano", pct(o.rend, 1)), op("×"), term("Tempo", A), op("="), term("Dinheiro parado", brl(c.capital), 1)] },
      { k: "m_seguro", n: "Seguro", what: "A apólice completa do carro, calculada para o seu estado e a idade dos motoristas.", v: c.seguro, ch: ajust.seg,
        eq: [term("Valor médio do carro", brl(c.medio)), op("×"), term("Seguro ao ano", pct(o.seg, 2)), op("×"), term("Tempo", A), op("="), term("Seguro", brl(c.seguro), 1)] },
      { k: "m_ipva", n: "IPVA (" + uf + ")", what: "Imposto anual do estado, cobrado sobre o valor do carro.", v: c.ipva, ch: ajust.ipva,
        eq: [term("Valor médio do carro", brl(c.medio)), op("×"), term("Alíquota em " + uf, pct(o.ipva, 2)), op("×"), term("Tempo", A), op("="), term("IPVA", brl(c.ipva), 1)] },
      { k: "m_lic", n: "Licenciamento", what: "Taxa anual do Detran para manter o carro regularizado.", v: c.lic, ch: ajust.lic,
        eq: [term("Taxa por ano em " + uf, brl(o.lic, 2)), op("×"), term("Tempo", A), op("="), term("Licenciamento", brl(c.lic), 1)] },
      { k: "m_rev", n: "Revisões", what: "Uma revisão a cada 10.000 km, na concessionária.", v: c.manut, ch: ajust.rev,
        eq: [term("Km rodados no prazo", nf(kmTot) + " km"), op("÷"), term("A cada", "10.000 km"), op("="), term("Revisões", nf(c.nRev, 1)), op("×"), term("Preço de cada", brl(o.rev, 0)), op("="), term("Revisões", brl(c.manut), 1)] },
      { k: "m_pneu", n: "Pneus", what: "Um jogo de 4 pneus a cada 40.000 km.", v: c.pneus, ch: ajust.pneu,
        eq: [term("Km rodados no prazo", nf(kmTot) + " km"), op("÷"), term("A cada", "40.000 km"), op("="), term("Jogos de pneus", nf(c.nPneu, 2)), op("×"), term("Preço do jogo", brl(o.pneu, 0)), op("="), term("Pneus", brl(c.pneus), 1)] },
      { k: "m_equipe", n: "Tempo da equipe", what: "Horas de alguém da sua equipe com multas, documentos, seguro, oficina e venda.", v: c.gestao, ch: ajust.horas || ajust.hora,
        eq: [term("Horas por mês", nf(o.horas, 1) + " h"), op("×"), term("Custo da hora", brl(o.hora, 1)), op("×"), term("Meses", String(o.prazo)), op("="), term("Equipe", brl(c.gestao), 1)] },
      { k: "m_parado", n: "Carro parado", what: "Dias na oficina em que você precisaria alugar outro carro. Cada dia vale a diária de um carro equivalente.", v: c.indisp, ch: ajust.dias || ajust.diaria,
        eq: [term("Dias parado por ano", nf(o.dias, 1)), op("×"), term("Tempo", A), op("="), term("Dias no prazo", nf(c.diasTot, 1)), op("×"), term("Diária de aluguel", brl(o.diaria, 0)), op("="), term("Carro parado", brl(c.indisp), 1)] }
    ];
    $("#medio").innerHTML = '<b>Antes das contas: o valor médio do carro.</b> O carro vale menos a cada mês, então para dinheiro parado, seguro e IPVA usamos a média entre o que você paga e o que recebe na venda: (' + brl(o.preco) + " + " + brl(c.fimValor) + ") ÷ 2 = <b>" + brl(c.medio) + '</b> <button class="tip-i" type="button" data-tip="medio" aria-label="O que é isto?">i</button>';
    $("#steps").innerHTML = rows.map(function (r, i) {
      return '<li class="st"><span class="st-n">' + (i + 1) + '</span><div class="st-main"><div class="st-h">' + esc(r.n) + '<button class="tip-i tip-s" type="button" data-tip="' + r.k + '" aria-label="O que é isto?">i</button>' + (r.ch ? '<span class="chg-dot">ajustado</span>' : "") + '</div><p class="st-what">' + esc(r.what) + '</p><div class="st-eq">' + r.eq.join("") + '</div><div class="st-bar"><i style="width:' + (c.total ? (r.v / c.total * 100).toFixed(1) : 0) + '%"></i></div></div>' +
        '<div class="st-v"><b>' + brl(r.v / o.prazo) + '</b><small>por mês</small><em>' + brl(r.v) + " no prazo<br>" + pct(r.v / c.total, 0) + " do total</em></div></li>";
    }).join("");
    $("#st-total").innerHTML =
      "<div><small>Total por carro, no prazo</small><b>" + brl(c.total) + "</b></div>" +
      "<div><small>Por mês, por carro</small><b>" + brl(c.mensal) + "</b></div>" +
      "<div><small>Por km rodado</small><b>" + brl(c.porKm) + "</b></div>" +
      "<div><small>Frota (" + nf(S.carros) + (S.carros === 1 ? " carro" : " carros") + "), por mês</small><b>" + brl(c.mensal * S.carros, 0) + "</b></div>";
  }

  function update() {
    var has = hasCar(), n = S.carros;
    var sel = CARS[S.car] || null, ajustado = sel && Math.abs(sel.p - S.preco) > 0.5;
    $("#cb-name").textContent = sel ? sel.n + (ajustado ? " (preço ajustado)" : "") : has ? "Outro carro (preço digitado)" : "Escolha o carro…";
    $("#cb-price").textContent = has ? brl(S.preco, 0) : "";
    $("#car-hint").textContent = sel ? (sel.blind ? "Preço aproximado, com blindagem (base: " + brl(sel.base, 0) + ")." : "Preço de tabela 0 km (referência)" + (sel.nt ? " · " + sel.nt : "") + ".") : has ? "Sem dados específicos deste carro: usamos médias gerais." : "Escolha na lista ou digite o preço abaixo.";
    $("#out-carros").textContent = nf(n);
    $("#out-km").textContent = nf(S.km) + " km";
    if (document.activeElement !== inPrecoN) inPrecoN.value = has ? nf(S.preco, 2) : "";
    inPreco.value = clamp(S.preco || 50000, +inPreco.min, +inPreco.max);
    [inCar, inKm, inPreco].forEach(rangeFill);
    $$("#in-prazo button").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-v") === S.prazo); });
    $$("#in-fin button").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-v") === S.fin); });
    inUf.value = S.uf; hUf.value = S.uf;
    if (document.activeElement !== hIdade) hIdade.value = S.idade;
    if (document.activeElement !== inIdade) inIdade.value = S.idade;
    renderAssum();

    $("#r-empty").hidden = has; $("#r-body").hidden = !has;
    $("#passo-empty").hidden = has; $("#passo-body").hidden = !has;
    if (!has) return;

    var o = optsFrom(S), c = modelo(o);
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

    var hasMov = S.mov > 0, cmp = $("#r-cmp");
    cmp.hidden = !hasMov;
    if (hasMov) {
      var mx = Math.max(c.mensal, S.mov), diff = c.mensal - S.mov, ad = Math.abs(diff);
      cmp.classList.toggle("neutro", diff <= 0.5);
      $("#cmp-own").style.width = (c.mensal / mx) * 100 + "%";
      $("#cmp-mov").style.width = (S.mov / mx) * 100 + "%";
      $("#cmp-own-v").textContent = brl(c.mensal);
      $("#cmp-mov-v").textContent = brl(S.mov);
      if (diff > 0.5) {
        $("#cmp-tag").textContent = "Alugar sai mais barato";
        $("#cmp-big").textContent = brl(ad) + " a menos por mês, por carro";
        $("#cmp-pct").textContent = pct(ad / c.mensal, 0) + " abaixo do custo da frota própria";
        $("#cmp-grid").innerHTML = "<div><dt>Frota, por mês</dt><dd>" + brl(ad * n, 0) + "</dd></div><div><dt>Frota, por ano</dt><dd>" + brl(ad * n * 12, 0) + "</dd></div><div><dt>Em " + S.prazo + " meses</dt><dd>" + brl(ad * n * S.prazo, 0) + "</dd></div>";
        $("#cmp-small").textContent = "Economia na frota de " + nf(n) + (n === 1 ? " carro" : " carros") + ", já considerando tudo o que a frota própria custa. A Movida ainda inclui o que está listado mais abaixo.";
      } else if (ad < 0.5) {
        $("#cmp-tag").textContent = "Valores iguais";
        $("#cmp-big").textContent = "A proposta empata com a frota própria";
        $("#cmp-pct").textContent = "";
        $("#cmp-grid").innerHTML = "";
        $("#cmp-small").textContent = "E a Movida ainda inclui tudo o que está listado mais abaixo.";
      } else {
        $("#cmp-tag").textContent = "Proposta acima da conta";
        $("#cmp-big").textContent = brl(ad) + " a mais por mês, por carro";
        $("#cmp-pct").textContent = "";
        $("#cmp-grid").innerHTML = "";
        $("#cmp-small").textContent = "Veja abaixo tudo o que a Movida já inclui nesse valor (IPVA, manutenção, pneus, carro reserva). Combustível e multas ficam de fora dos dois lados.";
      }
    }
    st2.update(c.grupos, S.prazo, "por carro, por mês");
    renderSteps(c, o);
  }

  inCar.addEventListener("input", function () { S.carros = +inCar.value; update(); });
  inKm.addEventListener("input", function () { S.km = +inKm.value; update(); });
  inPreco.addEventListener("input", function () { S.preco = +inPreco.value; update(); });
  inPrecoN.addEventListener("input", function () { var v = parseMoney(inPrecoN.value); if (v > 0) { S.preco = clamp(v, 20000, 600000); update(); } });
  inPrecoN.addEventListener("blur", function () { inPrecoN.value = hasCar() ? nf(S.preco, 2) : ""; });
  $("#in-prazo").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; S.prazo = +b.getAttribute("data-v"); clearOv("res", "rend"); update(); });
  $("#in-fin").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; S.fin = +b.getAttribute("data-v"); update(); });

  /* compartilhar cenário */
  var toast = $("#toast"), tt;
  function showToast(t) { toast.textContent = t; toast.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toast.hidden = true; }, 2000); }
  $("#share").addEventListener("click", function () {
    var p = new URLSearchParams();
    p.set("carros", S.carros); p.set("km", S.km); p.set("prazo", S.prazo); p.set("preco", Math.round(S.preco * 100) / 100);
    if (S.car >= 0) p.set("m", S.car);
    if (S.fin) p.set("financiar", 1);
    if (S.mov > 0) p.set("movida", S.mov);
    p.set("uf", S.uf); p.set("idade", S.idade);
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

  /* valores iniciais dos campos */
  if (S.mov > 0) { inMov.value = nf(S.mov, 2); hMov.value = nf(S.mov, 2); }
  hIdade.value = S.idade;
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
  if (fromLink) setTimeout(function () { var c = $("#conta"); if (c && !location.hash) window.scrollTo({ top: scrollY + c.getBoundingClientRect().top - 8 }); }, 50);

  /* ---------- entrada suave dos blocos (CSS + IntersectionObserver: o estado final é sempre o normal, nada fica deslocado) ---------- */
  if (!REDUCE && "IntersectionObserver" in window) {
    var rvEls = $$("#conta .eyebrow-o, #conta .h-l, #conta .sub, .guide-btn, .controls .ctl, .controls .assum, .result, .passo > .h-s, .passo-lead, .passo-empty, .st-0, .mix .h-s, #stack2, #legend2 .lg, .incl .h-s, .incl-grid li, .chips, .end");
    var rvIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rvIO.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });
    rvEls.forEach(function (el) { el.classList.add("rv"); rvIO.observe(el); });
    document.documentElement.classList.add("rv-on");
    /* garantia: o que já estiver na tela depois de 4 s aparece mesmo que o observador não tenha disparado */
    setTimeout(function () { rvEls.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add("in"); }); }, 4000);
  }

  /* ---------- movimento do topo (GSAP) ---------- */
  if (!HAS) return;
  var arc = $(".m-arc"), L = arc.getTotalLength();
  arc.style.strokeDasharray = L; arc.style.strokeDashoffset = L;
  var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".bar", { y: -30, opacity: 0, duration: 0.7 }, 0)
    .from(".hero .eyebrow", { y: 16, opacity: 0, duration: 0.7 }, 0.2)
    .from("#h1 .ln > span", { yPercent: 112, duration: 1.05, stagger: 0.12, ease: "power4.out" }, 0.3)
    .from(".hero-lead", { y: 24, opacity: 0, duration: 0.8 }, 0.9)
    .from(".intake", { y: 34, opacity: 0, duration: 0.9 }, 1.1)
    .to(arc, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.4)
    .from(".m-dot", { y: -260, duration: 1.3, ease: "bounce.out" }, 0.7);
  gsap.to(".motif", { yPercent: -20, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
})();
