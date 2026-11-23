/* app.js — modelo de custo, interações e movimento. Premissas vêm de data.js */
(function () {
  "use strict";
  var D = window.MOVIDA_DATA, P = D.premissas;
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HAS = !!window.gsap && !!window.ScrollTrigger && !REDUCE;
  if (HAS) gsap.registerPlugin(ScrollTrigger);

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function brl(v, d) {
    d = d == null ? 2 : d;
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, " ");
  }
  function nf(v, d) { return v.toLocaleString("pt-BR", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
  function pct(v, d) { return nf(v * 100, d == null ? 0 : d) + "%"; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* ---------- modelo (mesmas contas do estudo) ---------- */
  function modelo(o) {
    var res = P.residual[o.prazo], anos = o.prazo / 12, medio = o.preco * (1 + res) / 2;
    var c = {
      depr: o.preco * (1 - res),
      capital: medio * P.custoCapitalAA * anos,
      seguro: medio * P.seguroAA * anos,
      ipva: medio * P.ipvaAA * anos,
      lic: P.licenciamentoAno * anos,
      manut: P.revisao.valor * (o.km * o.prazo / P.revisao.kmCada),
      pneus: P.pneus.valor * (o.km * o.prazo / P.pneus.kmCada),
      gestao: P.gestaoHorasMes * P.gestaoHora * o.prazo,
      indisp: P.indisponibilidadeMes * o.prazo
    };
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

  /* =====================  PÁGINA 1  ===================== */
  var base = modelo({ preco: D.precoReferencia, km: 1000, prazo: 36 });
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
  var S = { carros: D.padrao.carros, km: D.padrao.km, prazo: D.padrao.prazo, preco: D.precoReferencia, fin: 0, mov: 0 };
  var q = new URLSearchParams(location.search);
  function num(k) { var v = parseFloat((q.get(k) || "").replace(",", ".")); return isNaN(v) ? null : v; }
  if (num("carros") != null) S.carros = clamp(Math.round(num("carros")), 1, 200);
  if (num("km") != null) S.km = clamp(Math.round(num("km") / 100) * 100, 500, 6000);
  if (num("prazo") != null && P.residual[num("prazo")]) S.prazo = num("prazo");
  if (num("preco") != null) S.preco = clamp(num("preco"), 50000, 200000);
  if (num("movida") != null) S.mov = Math.max(0, num("movida"));
  if (q.get("financiar") === "1") S.fin = 1;

  var inCar = $("#in-carros"), inKm = $("#in-km"), inPreco = $("#in-preco"), inMov = $("#in-mov");
  inCar.value = S.carros; inKm.value = S.km; inPreco.value = S.preco;
  if (S.mov > 0) inMov.value = nf(S.mov, 2);
  var st2 = makeStack("#stack2", "#legend2", "#detail2");

  function rangeFill(r) { r.style.setProperty("--p", ((r.value - r.min) / (r.max - r.min)) * 100 + "%"); }
  function parseMoney(s) {
    s = String(s).replace(/[^\d,.]/g, "");
    if (s.indexOf(",") > -1) s = s.replace(/\./g, "").replace(",", ".");
    else if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
    var v = parseFloat(s); return isNaN(v) ? 0 : v;
  }

  function update() {
    var c = modelo(S), n = S.carros;
    $("#out-carros").textContent = nf(n);
    $("#out-km").textContent = nf(S.km) + " km";
    $("#out-preco").textContent = brl(S.preco, 0);
    [inCar, inKm, inPreco].forEach(rangeFill);
    $$("#in-prazo button").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-v") === S.prazo); });
    $$("#in-fin button").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-v") === S.fin); });

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
  }

  inCar.addEventListener("input", function () { S.carros = +inCar.value; update(); });
  inKm.addEventListener("input", function () { S.km = +inKm.value; update(); });
  inPreco.addEventListener("input", function () { S.preco = +inPreco.value; update(); });
  $("#in-prazo").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; S.prazo = +b.getAttribute("data-v"); update(); });
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
  reveal(".eyebrow-o, .h-l, .sub, .toggle, .h-s, .detail, .next, .end, .chips");

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

  gsap.from(".controls .ctl", { y: 26, opacity: 0, duration: 0.7, stagger: 0.08, scrollTrigger: { trigger: ".calc", start: "top 85%", once: true } });
  gsap.from(".result", { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".calc", start: "top 85%", once: true } });
  gsap.from("#stack2", { clipPath: "inset(0 100% 0 0 round 14px)", duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: "#stack2", start: "top 88%", once: true } });
  gsap.from("#legend2 .lg", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07, scrollTrigger: { trigger: "#legend2", start: "top 92%", once: true } });
  gsap.from(".incl-grid li", { y: 34, opacity: 0, duration: 0.7, stagger: 0.09, scrollTrigger: { trigger: ".incl-grid", start: "top 88%", once: true } });
})();
