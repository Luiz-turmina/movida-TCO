/* ============================================================
   data.js — premissas e textos do comparativo.
   Premissas = as do "Estudo Executivo TCO — Frota Própria vs. Movida Frotas"
   (Fiat Argo 1.0, 36 meses, 1.000 km/mês). Trocar aqui atualiza o site todo.

   A mensalidade da Movida NÃO está no estudo (é o quadro em branco da p. 7).
   Para enviar um link já com a proposta preenchida, use:
     ?carros=20&km=2000&prazo=48&preco=90000&movida=3150&financiar=1
   ============================================================ */
window.MOVIDA_DATA = {
  carro: "Fiat Argo 1.0",
  precoReferencia: 84316.5,

  premissas: {
    residual: { 12: 0.85, 24: 0.72, 36: 0.6, 48: 0.5, 60: 0.42 }, // valor do carro no fim do prazo
    custoCapitalAA: 0.10,        // quanto o dinheiro renderia por ano
    seguroAA: 0.045,             // sobre o valor médio do carro
    ipvaAA: 0.04,                // sobre o valor médio (referência RJ)
    licenciamentoAno: 300,
    revisao: { valor: 862, kmCada: 10000 },
    pneus: { valor: 2500, kmCada: 40000 },
    gestaoHorasMes: 1.5,
    gestaoHora: 45,
    indisponibilidadeMes: 50
  },
  financiamento: { entrada: 0.3, taxaMes: 0.012 },

  /* Lista de carros: preço de tabela 0 km (referência, linhas 2026/2027), por grupo. Blindados: preço aproximado. */
  carros: [
    {"g": "AX", "n": "KWID ZEN 1.0 FLEX 12V 5P MEC.", "p": 78690.0},
    {"g": "AX", "n": "MOBI LIKE 1.0 FIRE FLEX 5P.", "p": 81060.0},
    {"g": "AX", "n": "KWID INTENSE 1.0 FLEX 12V 5P MEC.", "p": 81990.0, "nt": "ref. tabela 2026"},
    {"g": "AX", "n": "MOBI TREKKING 1.0 FLEX 5P.", "p": 83995.0},
    {"g": "B", "n": "ARGO DRIVE 1.0 6V FLEX", "p": 94990.0},
    {"g": "B", "n": "ARGO 1.0 6V FLEX", "p": 93980.0},
    {"g": "BS", "n": "HB20S COMFORT 1.0 FLEX 12V MEC.", "p": 104290.0},
    {"g": "BS", "n": "CRONOS DRIVE 1.0 6V FLEX", "p": 103490.0},
    {"g": "BS", "n": "HB20S COMFORT PLUS 1.0 FLEX 12V MEC.", "p": 105990.0, "nt": "ref. tabela 2026"},
    {"g": "BS", "n": "ONIX SEDAN PLUS 1.0 12V MEC.", "p": 108990.0},
    {"g": "BS", "n": "LOGAN ZEN FLEX 1.0 12V 4P MEC.", "p": 78633.0, "nt": "descontinuado; última ref. FIPE 0 km"},
    {"g": "BS", "n": "HB20S LIMITED 1.0 FLEX 12V MEC.", "p": 106440.0},
    {"g": "BX", "n": "POLO TRACK 1.0 FLEX 12V 5P", "p": 95490.0},
    {"g": "BX", "n": "HB20 COMFORT PLUS 1.0 FLEX 12V MEC.", "p": 96140.0},
    {"g": "BX", "n": "HB20 COMFORT 1.0 FLEX 12V MEC.", "p": 95190.0},
    {"g": "BX", "n": "ONIX HATCH 1.0 12V FLEX 5P MEC.", "p": 99990.0},
    {"g": "BX", "n": "HB20 SENSE PLUS 1.0 FLEX 12V MEC.", "p": 93990.0, "nt": "ref. tabela 2026"},
    {"g": "BX", "n": "HB20 LIMITED 1.0 FLEX 12V MEC.", "p": 94764.0},
    {"g": "BX", "n": "C3 XTR 1.0 6V 5P", "p": 94737.0},
    {"g": "BX", "n": "C3 LIVE PACK 1.0 FLEX 6V 5P MEC.", "p": 86090.0},
    {"g": "D", "n": "HB20 LIMITED 1.0 TB FLEX 12V AUT.", "p": 114985.0},
    {"g": "D", "n": "HB20 COMF. PLUS TECH 1.0 TB FLEX 12V AUT", "p": 113990.0, "nt": "ref. tabela 2026"},
    {"g": "D", "n": "ARGO DRIVE 1.3 8V FLEX AUT.", "p": 104499.0},
    {"g": "D", "n": "POLO COMFORTLINE TSI 1.0 FLEX 12V AUT.", "p": 120990.0, "nt": "ref. tabela 2026"},
    {"g": "D", "n": "POLO HIGHLINE TSI 1.0 FLEX 12V AUT.", "p": 134490.0},
    {"g": "D", "n": "YARIS XL 1.5 FLEX 16V 5P AUT.", "p": 97990.0, "nt": "descontinuado; última ref. 0 km"},
    {"g": "D", "n": "POLO SENSE TSI 1.0 FLEX 12V AUT", "p": 112560.0},
    {"g": "E", "n": "SPIN PREMIER 1.8 8V ECONO.FLEX 5P AUT.", "p": 159690.0},
    {"g": "E", "n": "SPIN LTZ 1.8 8V ECONO.FLEX 5P AUT.", "p": 150090.0},
    {"g": "F", "n": "CRONOS DRIVE 1.3 8V FLEX", "p": 103490.0},
    {"g": "F", "n": "VIRTUS TSI 1.0 FLEX 12V 4P MEC.", "p": 116690.0, "nt": "versão Sense TSI MT"},
    {"g": "FX", "n": "HB20S LIMITED 1.0 TB FLEX 12V AUT.", "p": 120499.0},
    {"g": "FX", "n": "CRONOS DRIVE 1.3 8V FLEX AUT.", "p": 112990.0},
    {"g": "FX", "n": "VIRTUS TSI 1.0 FLEX 12V 4P AUT.", "p": 129990.0},
    {"g": "FX", "n": "HB20S COM. PLUS TECH 1.0 TB FLEX 12V AUT", "p": 119990.0, "nt": "ref. tabela 2026"},
    {"g": "FX", "n": "VIRTUS HIGHLINE 200 TSI 1.0 FLEX 12V AUT", "p": 163690.0},
    {"g": "FX", "n": "YARIS XL SEDAN 1.5 FLEX 16V 4P AUT.", "p": 101134.0, "nt": "descontinuado; última ref. FIPE 0 km"},
    {"g": "FX", "n": "VERSA SENSE 1.6 16V FLEX AUT.", "p": 119990.0},
    {"g": "FX", "n": "VERSA ADVANCE 1.6 16V FLEX AUT.", "p": 129990.0},
    {"g": "G", "n": "TERA 1.0 MPI FLEX 12V 5P MEC.", "p": 107190.0},
    {"g": "H", "n": "PULSE DRIVE 1.3 8V FLEX AUT.", "p": 114990.0},
    {"g": "H", "n": "KARDIAN EVOLUT. FLEX 1.0 TB 12V 5P AUT.", "p": 119308.0},
    {"g": "H", "n": "KAIT ADVANCE 1.6 16V AUT.", "p": 136990.0},
    {"g": "H", "n": "BASALT SHINE 1.0 FLEX TB 200 5P AUT.", "p": 119990.0},
    {"g": "H", "n": "KICKS PLAY ACTIVE PLUS 1.6 16V FLEX AUT.", "p": 117990.0, "nt": "sucedido pelo Kait Active"},
    {"g": "H", "n": "KICKS SENSE 1.6 16V FLEX AUT.", "p": 159990.0, "nt": "Novo Kicks 1.0 Turbo AT"},
    {"g": "H", "n": "KICKS PLAY SENSE 1.6 16V FLEX AUT.", "p": 127990.0, "nt": "última ref. 0 km"},
    {"g": "H", "n": "KAIT EXCLUSIVE 1.6 16V AUT.", "p": 149990.0},
    {"g": "H", "n": "KARDIAN TECHNO FLEX 1.0 TB 12V 5P AUT.", "p": 128667.0},
    {"g": "H", "n": "PULSE AUDACE TURBO 200 AUT. (HÍBRIDO)", "p": 135990.0},
    {"g": "H1", "n": "TANK 300 2.0 16V AWD AUT.(HIBRIDO)", "p": 342000.0},
    {"g": "HN", "n": "CRETA COMFORT 1.0 TB 12V FLEX AUT.", "p": 156590.0},
    {"g": "HN", "n": "CRETA COMFORT SAFETY 1.0 TB 12V AUT.", "p": 139590.0},
    {"g": "HN", "n": "2008 ALLURE 1.0 TURBO 200 5P AUT.", "p": 121544.0},
    {"g": "HN", "n": "CRETA LIMITED 1.0 TB 12V FLEX AUT.", "p": 173390.0},
    {"g": "HW", "n": "T-CROSS 200 TSI 1.0 FLEX 12V 5P AUT.", "p": 159640.0},
    {"g": "HW", "n": "NIVUS COMFORTLINE 1.0 200 TSI FLEX AUT.", "p": 149990.0, "nt": "ref. tabela 2026"},
    {"g": "HW", "n": "DUSTER INTENSE PLUS 1.6 16V FLEX AUT.", "p": 121990.0},
    {"g": "HW", "n": "T-CROSS COMFOR. 200 TSI 1.0 FLEX 5P AUT.", "p": 154740.0},
    {"g": "HW", "n": "NIVUS HIGHLINE 1.0 200 TSI FLEX AUT.", "p": 167990.0},
    {"g": "HW", "n": "2008 ALLURE 1.0 TURBO 200 5P AUT.", "p": 121544.0},
    {"g": "HW", "n": "T-CROSS HIG. 250 TSI 1.4 FLEX 16V 5P AUT", "p": 191490.0},
    {"g": "HW", "n": "CRETA ACTION 1.6 16V FLEX AUT.", "p": 119990.0},
    {"g": "HW", "n": "RENEGADE LONG. T270 1.3 TB 4X2 FLEX AUT", "p": 165690.0},
    {"g": "HX", "n": "TERA COMFORT 1.0 170 TSI FLEX 12V 5P AUT", "p": 130310.0},
    {"g": "HY", "n": "BOREAL EVOLUTION 1.3 TURBO 16V 5P AUT.", "p": 159990.0},
    {"g": "HY", "n": "COMPASS LONG. T270 1.3 TB 4X2 FLEX AUT.", "p": 199890.0},
    {"g": "HY", "n": "TAOS COMFORTLINE 1.4 250 TSI FLEX AUT.", "p": 186290.0},
    {"g": "HY", "n": "COROLLA CROSS XRE 2.0 16V FLEX AUT.", "p": 194790.0},
    {"g": "HY", "n": "FASTBACK AUDACE 200 TB AUT (HÍBRIDO)", "p": 165990.0},
    {"g": "HY", "n": "TAOS HIGHLINE 1.4 250 TSI FLEX AUT.", "p": 199990.0},
    {"g": "HZ", "n": "HAVAL H6 2 1.5 (HIBRIDO)", "p": 219000.0, "nt": "ref. versão HEV2"},
    {"g": "HZ", "n": "GS4 ELITE (HÍBRIDO)", "p": 209990.0},
    {"g": "K", "n": "SPIN PREMIER 1.8 8V ECONO.FLEX 5P AUT.", "p": 159690.0},
    {"g": "KX", "n": "COMMANDER LONGITUDE T270 1.3 TB FLEX AUT", "p": 228790.0},
    {"g": "KX", "n": "COMMANDER LIMITED T270 1.3 TB FLEX AUT.", "p": 255690.0},
    {"g": "KX", "n": "COMMANDER OVERLAND T270 1.3 TB FLEX AUT.", "p": 283790.0},
    {"g": "KX", "n": "TIGGO 8 MAX DRIVE 1.6 TURBO AUT.", "p": 196990.0},
    {"g": "L", "n": "SAVEIRO ROBUST 1.6 TOTAL FLEX 16V", "p": 115690.0},
    {"g": "L", "n": "STRADA ENDURANCE 1.3 FLEX 8V CS PLUS", "p": 111990.0},
    {"g": "LX", "n": "SAVEIRO ROBUST 1.6 TOTAL FLEX 16V CD", "p": 130190.0},
    {"g": "LX", "n": "STRADA FREEDOM 1.3 FLEX 8V CD", "p": 128490.0},
    {"g": "LX", "n": "SAVEIRO CROSS 1.6 T.FLEX 16V CD", "p": 134190.0, "nt": "substituída pela versão Extreme CD"},
    {"g": "M", "n": "KANGOO ADVANCED 1.6 16V FLEX", "p": 139990.0},
    {"g": "M", "n": "FIORINO ENDURANCE 1.3 FLEX 8V 2P", "p": 134490.0},
    {"g": "M", "n": "FIORINO ENDURANCE EVO 1.4 FLEX 8V 2P", "p": 120490.0, "nt": "ref. última tabela Fire Evo"},
    {"g": "QX", "n": "VIRTUS EXCLUSIVE 250TSI 1.4 FLEX 16V AUT", "p": 176690.0},
    {"g": "QX", "n": "COROLLA GLI 2.0 16V FLEX AUT.", "p": 169990.0, "nt": "ref. tabela 2026"},
    {"g": "QX", "n": "COROLLA XEI 2.0 FLEX 16V AUT.", "p": 178990.0},
    {"g": "SS", "n": "TORO FREEDOM 1.3 T270 4X2 FLEX AUT.", "p": 180990.0},
    {"g": "SS", "n": "TORO ENDURANCE 1.3 T270 4X2 FLEX AUT.", "p": 167490.0},
    {"g": "SX", "n": "RANGER XLS 2.0 4X4 CD DIESEL AUT.", "p": 255400.0},
    {"g": "T", "n": "T-CROSS COMFOR. 200 TSI 1.0 FLEX 5P AUT.", "p": 234740.0, "base": 154740.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "T", "n": "TAOS COMFORTLINE 1.4 250 TSI FLEX AUT.", "p": 266290.0, "base": 186290.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "T", "n": "COROLLA GLI 2.0 16V FLEX AUT.", "p": 249990.0, "base": 169990.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "T", "n": "COROLLA CROSS XRE 2.0 16V FLEX AUT.", "p": 274790.0, "base": 194790.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "T", "n": "COMPASS LONG. T270 1.3 TB 4X2 FLEX AUT.", "p": 279890.0, "base": 199890.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "T", "n": "COROLLA XEI 2.0 FLEX 16V AUT.", "p": 258990.0, "base": 178990.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "T", "n": "TIGGO 8 TXS 1.6 16V TGDI AUT.", "p": 276990.0, "base": 196990.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "TT", "n": "HAVAL H6 2 1.5 (HIBRIDO)", "p": 304000.0, "base": 219000.0, "blind": true, "nt": "preço aproximado, com blindagem"},
    {"g": "TT", "n": "COMMANDER LIMITED T270 1.3 TB FLEX AUT.", "p": 340690.0, "base": 255690.0, "blind": true, "nt": "preço aproximado, com blindagem"}
  ],

  /* IPVA de automóveis a gasolina/flex, 2026, % do valor do carro por ano. Fonte: levantamento em reportagens e sites
     especializados (Exame/SBT News 15/01/2026, Revista Carro 07/01/2026, Valor Final, Cidesp). NÃO foram conferidos
     um a um nas Secretarias da Fazenda: a tela manda confirmar e o cliente pode ajustar. Onde a alíquota varia por
     potência/valor, o padrão é a faixa do carro mais comum da lista (nota). */
  ufPadrao: "SP",
  estados: [
    { uf: "AC", nome: "Acre", ipva: 2 },
    { uf: "AL", nome: "Alagoas", ipva: 3, nota: "Varia com a potência: 2,75% até 80 cv, 3% de 80 a 160 cv, 3,25% acima." },
    { uf: "AP", nome: "Amapá", ipva: 3 },
    { uf: "AM", nome: "Amazonas", ipva: 2, nota: "Acima de 1.000 cc. Carros até 1.000 cc, elétricos e híbridos: 1,5%." },
    { uf: "BA", nome: "Bahia", ipva: 2.5, nota: "Gasolina e flex. Diesel: 3%." },
    { uf: "CE", nome: "Ceará", ipva: 3, nota: "Varia com a potência: 2,5% até 100 cv, 3% de 101 a 180 cv, 3,5% acima." },
    { uf: "DF", nome: "Distrito Federal", ipva: 3 },
    { uf: "ES", nome: "Espírito Santo", ipva: 2 },
    { uf: "GO", nome: "Goiás", ipva: 3.45, nota: "Varia com a potência: 3% até 100 cv, 3,45% acima. Uma fonte cita 3,75%." },
    { uf: "MA", nome: "Maranhão", ipva: 2.5, nota: "2,5% até R$ 150 mil de valor venal; 3% acima." },
    { uf: "MT", nome: "Mato Grosso", ipva: 3, nota: "Varia com a cilindrada: 2% até 1.000 cc, 3% acima." },
    { uf: "MS", nome: "Mato Grosso do Sul", ipva: 3, nota: "As fontes divergem: 3% para carros de passeio (três fontes) ou 5% (uma). Confirme." },
    { uf: "MG", nome: "Minas Gerais", ipva: 4 },
    { uf: "PA", nome: "Pará", ipva: 2.5 },
    { uf: "PB", nome: "Paraíba", ipva: 2.5 },
    { uf: "PR", nome: "Paraná", ipva: 1.9 },
    { uf: "PE", nome: "Pernambuco", ipva: 2.4, nota: "Movidos a combustível. GNV: 1,5%." },
    { uf: "PI", nome: "Piauí", ipva: 2.5, nota: "2,5% até R$ 150 mil de valor venal; 3% acima." },
    { uf: "RJ", nome: "Rio de Janeiro", ipva: 4, nota: "Gasolina e flex. GNV e híbridos: 1,5%; elétricos: 0,5%." },
    { uf: "RN", nome: "Rio Grande do Norte", ipva: 3 },
    { uf: "RS", nome: "Rio Grande do Sul", ipva: 3 },
    { uf: "RO", nome: "Rondônia", ipva: 3 },
    { uf: "RR", nome: "Roraima", ipva: 3 },
    { uf: "SC", nome: "Santa Catarina", ipva: 2 },
    { uf: "SP", nome: "São Paulo", ipva: 4 },
    { uf: "SE", nome: "Sergipe", ipva: 2.5, nota: "2,5% até R$ 120 mil de valor venal; 3% acima." },
    { uf: "TO", nome: "Tocantins", ipva: 3.5, nota: "Varia com a potência: 2,5% até 100 cv, 3,5% acima." }
  ],

  /* textos dos popups (ícone "i") — linguagem simples */
  dicas: {
    carro: { t: "Escolha o carro", d: "Procure o modelo na lista. O preço é o de tabela 0 km (valor de referência). Você pode ajustar o valor logo abaixo, e a conta inteira se adapta." },
    preco: { t: "Preço do carro", d: "É quanto você pagaria pelo carro novo. Se o seu valor for diferente do da tabela, digite ou arraste: todo o resto da conta acompanha." },
    carros: { t: "Carros na frota", d: "Quantos carros a sua empresa teria. O custo por carro não muda; só o total da frota." },
    km: { t: "Quilômetros por mês", d: "Quanto cada carro roda por mês. Quanto mais roda, mais revisões e pneus." },
    prazo: { t: "Tempo com o carro", d: "Por quanto tempo você ficaria com o carro antes de vendê-lo. Prazos curtos pesam mais, porque o carro perde valor mais rápido no começo." },
    fin: { t: "À vista ou financiado", d: "À vista: o dinheiro sai do caixa de uma vez. Financiado: 30% de entrada e o resto em parcelas, com juros de 1,20% ao mês. Os juros aparecem à parte no resultado." },
    mov: { t: "Mensalidade da Movida", d: "Digite o valor da proposta que você recebeu da Movida para ver a diferença. É opcional." },
    perfil: { t: "Sobre você", d: "A idade do motorista principal e o estado onde o carro é emplacado mudam o seguro e o IPVA. Com eles, calculamos a média de cada carro e já refazemos a conta inteira." },
    premissas: { t: "Premissas da conta", d: "São os números que sustentam o cálculo. Em \"Médias de mercado\", cada um vem de uma fonte oficial ou de referência, com a fonte indicada logo abaixo. Em \"Premissas do estudo\", voltam os números do estudo executivo. Em qualquer caso, você pode ajustar." },
    res: { t: "Quanto o carro vale no fim", d: "Quanto o carro vale quando você for vendê-lo, em % do que pagou. A média vem da Tabela FIPE de nov/2026: comparamos o preço do modelo 0 km com o do mesmo modelo de anos anteriores (1 ano mais velho = 12 meses, 2 anos = 24 meses etc.). Quanto menor o %, maior a desvalorização." },
    rend: { t: "Rendimento do dinheiro", d: "Quanto o dinheiro preso no carro renderia por ano se estivesse aplicado. Usamos a Selic que o mercado espera, em média, durante o prazo escolhido (Banco Central, Boletim Focus de 19/11/2026). É bruto, antes de imposto: se o seu dinheiro rende menos, ajuste." },
    seg: { t: "Seguro", d: "Custo anual de uma apólice completa (casco, terceiros e acidentes pessoais), em % do valor do carro. É uma estimativa feita com os dados abertos da SUSEP, o órgão que regula seguros: taxa do modelo ou da categoria, ajustada pelo estado e pela idade do motorista. Não é cotação: se você tiver uma, digite o valor aqui." },
    uf: { t: "Estado e IPVA", d: "O IPVA muda de estado para estado, e em alguns varia com a potência ou o valor do carro. As alíquotas de 2026 foram levantadas em reportagens e sites especializados e não foram conferidas uma a uma nas Secretarias da Fazenda: confirme a do seu estado e ajuste se precisar." },
    lic: { t: "Licenciamento", d: "Taxa anual do Detran para manter o carro regularizado. Varia por estado. Usamos R$ 300, o valor do estudo de referência (é uma estimativa, não encontramos tabela oficial consolidada): confirme no Detran do seu estado." },
    rev: { t: "Revisões", d: "Custo de uma revisão programada, a cada 10.000 km. A média vem dos pacotes de revisão com preço fechado da Volkswagen (Vale+, tabela de out/2026): R$ 849 por revisão no Polo Track e no Tera 1.0, R$ 919 nos TSI e valores maiores nos modelos mais caros. Usamos como referência para todas as marcas, pois nem todas divulgam preço fechado." },
    pneu: { t: "Pneus", d: "Custo de um jogo de 4 pneus, trocado a cada 40.000 km. Partimos de R$ 2.500 (estudo de referência) para carros compactos e subimos nos que usam pneus maiores, pela proporção de preços observada em loja online (Pneubest, nov/2026). É uma estimativa: marcas e medidas mudam muito o valor." },
    horas: { t: "Tempo da sua equipe", d: "Horas por mês que alguém da sua equipe gasta com multas, documentos, IPVA, seguro, oficina e venda do carro. Usamos 1,5 h por mês, o mesmo do estudo de referência. É uma estimativa: não existe dado oficial para isso." },
    hora: { t: "Custo da hora da equipe", d: "Quanto custa para a empresa uma hora dessa pessoa. Partimos do rendimento médio do trabalhador brasileiro (IBGE, PNAD Contínua, jul–set/2026: R$ 3.790 por mês), dividimos por 190,7 horas e somamos 70% de encargos (13º, férias, FGTS e INSS, estimativa). Se a pessoa que cuida da frota ganha mais, ajuste." },
    parado: { t: "Imprevistos e carro parado", d: "Reserva mensal para os dias em que o carro está na oficina e você precisa de outra solução (aluguel avulso, táxi, perda de produtividade). Estimativa: 4 dias parado por ano × R$ 150 de diária de carro alugado ÷ 12 meses = R$ 50 por mês. A diária vem de páginas de preço da Localiza (compacto acima de R$ 154; econômico acima de R$ 122, média de 12 meses em São Paulo)." },
    resultado: { t: "Custo real por carro", d: "Soma de tudo o que o carro custa de verdade: desvalorização, dinheiro parado, seguro, impostos, manutenção e imprevistos. Não inclui combustível." },
    passo: { t: "A conta passo a passo", d: "Aqui você vê cada parte do cálculo com os seus números. Tudo muda na hora quando você ajusta qualquer campo." },
    medio: { t: "Valor médio do carro", d: "É a média entre o que o carro vale quando você o compra e o que vale quando o vende. Usamos esse valor para calcular seguro, IPVA e rendimento." },
    m_depr: { t: "Desvalorização", d: "O que o carro perde de valor no período: preço pago menos o que ele vale no fim." },
    m_capital: { t: "Dinheiro parado", d: "O que o dinheiro investido no carro renderia, ano a ano, se estivesse aplicado ou no seu negócio." },
    m_seguro: { t: "Seguro", d: "Valor médio do carro vezes a taxa anual do seguro, vezes os anos." },
    m_ipva: { t: "IPVA", d: "Imposto anual do estado: valor médio do carro vezes a alíquota, vezes os anos." },
    m_lic: { t: "Licenciamento", d: "Taxa anual para manter o carro regularizado." },
    m_rev: { t: "Revisões", d: "Quantidade de revisões no período (km rodados ÷ 10.000) vezes o custo de cada uma." },
    m_pneu: { t: "Pneus", d: "Quantos jogos de pneus o carro usa no período (km rodados ÷ 40.000) vezes o custo de cada um." },
    m_equipe: { t: "Tempo da equipe", d: "Horas que sua equipe dedica ao carro, vezes o custo da hora, vezes os meses." },
    m_parado: { t: "Carro parado", d: "Reserva mensal para imprevistos, vezes os meses." }
  },

  /* guia rápido (popups em sequência) */
  guia: [
    { sel: "#perfil", dica: "perfil" },
    { sel: "#combo-btn", dica: "carro" },
    { sel: "#in-km", dica: "km" },
    { sel: "#in-prazo", dica: "prazo" },
    { sel: "#assum", dica: "premissas" },
    { sel: "#result", dica: "resultado" },
    { sel: "#passo", dica: "passo" }
  ],

  padrao: { carros: 10, km: 1000, prazo: 36 },

  /* cada grupo junta itens do estudo em linguagem simples */
  grupos: [
    { k: "desval", nome: "Desvalorização", texto: "O carro vale menos a cada mês que passa.", cor: "#B83600" },
    { k: "parado", nome: "Dinheiro parado", texto: "O que esse dinheiro renderia se não estivesse preso no carro.", cor: "#FF5000" },
    { k: "seguro", nome: "Seguro", texto: "A apólice do carro, todo ano.", cor: "#FF7F3F" },
    { k: "impostos", nome: "IPVA e licenciamento", texto: "Os impostos anuais do carro.", cor: "#FFA070" },
    { k: "manut", nome: "Manutenção e pneus", texto: "Revisões, peças de desgaste e troca de pneus.", cor: "#FFC09B" },
    { k: "equipe", nome: "Equipe e imprevistos", texto: "Tempo da sua equipe cuidando do carro e dias de carro parado.", cor: "#FFDCC8" }
  ],

  incluso: [
    { t: "IPVA e licenciamento", d: "Pagos e cuidados pela Movida" },
    { t: "Manutenção", d: "Preventiva e corretiva, com atendimento em até 24h" },
    { t: "Pneus", d: "Troca a cada 40.000 km" },
    { t: "Carro reserva", d: "Ilimitado, liberado em até 24h" },
    { t: "Proteção completa", d: "Rastreador 4G e franquia de R$ 250 em vidros e para-choques" },
    { t: "Portal de multas e do gestor", d: "Sem custos administrativos escondidos" }
  ],
  contrato: ["15 dias de tolerância na devolução, sem multa", "Perda total só a partir de 70% da tabela FIPE"],

  /* botão final: preencha o href (e-mail, WhatsApp, formulário). Vazio = botão some. */
  cta: { texto: "Peça uma proposta", href: "" },

  aviso:
    "Calculadora: usa médias de mercado (FIPE, Banco Central, SUSEP, IBGE e outras fontes listadas em Premissas da conta) e valores de tabela 0 km; são referências para uma primeira conta, não cotações, e o IPVA não foi conferido nas Secretarias da Fazenda. Primeira página: valores ilustrativos para um Fiat Argo 1.0 a R$ 84.316,50 (média entre duas referências de mercado), sujeitos à versão exata, ao perfil de uso e à proposta comercial da Movida. Combustível, multas, estacionamento e pedágios ficam de fora porque custam o mesmo comprando ou alugando. Valide o tratamento fiscal com a sua contabilidade."
};
