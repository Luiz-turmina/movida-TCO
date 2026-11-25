/* mercado.js — médias de mercado das premissas (gerado por _pesquisa-movida/build_mercado.py em 25/11/2026).
   Fontes: FIPE, BCB, SUSEP, IBGE, VW, Pneubest. Não editar à mão. */
window.MOVIDA_MERCADO = {
 "versao": "2026-11-25",
 "selic": {
  "meta": 13.75,
  "focus": {
   "2026": 13.75,
   "2027": 13.0,
   "2028": 11.0,
   "2029": 10.5,
   "2030": 10.25
  },
  "rend": {
   "12": 13.38,
   "24": 12.69,
   "36": 12.04,
   "48": 11.62,
   "60": 11.35
  }
 },
 "seguro": {
  "uf": {
   "PE": 1.047,
   "SP": 1.009,
   "SE": 0.894,
   "MG": 0.998,
   "RS": 0.916,
   "ES": 0.922,
   "GO": 1.023,
   "RJ": 1.347,
   "AM": 1.047,
   "MA": 1.086,
   "MS": 0.963,
   "PR": 0.898,
   "SC": 0.813,
   "DF": 0.874,
   "PI": 1.102,
   "PB": 0.937,
   "AL": 0.964,
   "CE": 1.002,
   "PA": 1.111,
   "BA": 1.023,
   "RN": 1.007,
   "MT": 1.096,
   "TO": 1.07,
   "AC": 1.04
  },
  "rc": {
   "RS": 1.38,
   "SC": 1.415,
   "PR": 1.386,
   "SP": 1.302,
   "MG": 1.338,
   "RJ": 1.249,
   "ES": 1.327,
   "BA": 1.242,
   "SE": 1.259,
   "PE": 1.252,
   "PB": 1.263,
   "RN": 1.241,
   "AL": 1.256,
   "CE": 1.296,
   "PI": 1.251,
   "MA": 1.258,
   "PA": 1.234,
   "AM": 1.317,
   "AP": 1.29,
   "RO": 1.268,
   "RR": 1.297,
   "AC": 1.257,
   "MT": 1.294,
   "MS": 1.351,
   "DF": 1.33,
   "GO": 1.279,
   "TO": 1.239
  },
  "rcNac": 1.316,
  "idade": [
   [
    21.5,
    1.543
   ],
   [
    30.5,
    1.121
   ],
   [
    40.5,
    1.009
   ],
   [
    50.5,
    0.969
   ],
   [
    60,
    0.888
   ]
  ],
  "cascoPadrao": 0.024827167650144536
 },
 "revisao": [
  {
   "ate": 105000,
   "v": 849,
   "txt": "Pacote Vale+ da VW para Polo Track e Tera 1.0: R$ 2.547 pelas 3 primeiras revisões, ou R$ 849 cada."
  },
  {
   "ate": 200000,
   "v": 919,
   "txt": "Pacote Vale+ da VW para modelos TSI e SUVs: R$ 2.757 pelas 3 primeiras revisões, ou R$ 919 cada."
  },
  {
   "ate": 1000000000.0,
   "v": 1483,
   "txt": "Pacote Vale+ da VW para Jetta GLI e Tiguan: R$ 4.449 pelas 3 primeiras revisões, ou R$ 1.483 cada."
  }
 ],
 "pneus": [
  {
   "ate": 140000,
   "v": 2500,
   "txt": "Compactos (aro 14 a 16): R$ 2.500, valor do estudo. Em loja online, marcas de entrada saem por R$ 920 a R$ 1.360 o jogo; marcas conhecidas custam mais."
  },
  {
   "ate": 250000,
   "v": 3500,
   "txt": "SUVs e picapes médias (aro 17): R$ 2.500 × 1,4, razão entre os preços observados (225/65 R17 ÷ 205/60 R16, Pneubest)."
  },
  {
   "ate": 1000000000.0,
   "v": 4500,
   "txt": "Picapes grandes e SUVs de luxo (aro 17 a 18): estimativa de R$ 4.500 o jogo."
  }
 ],
 "hora": {
  "salario": 3790,
  "horasMes": 190.7,
  "encargos": 1.7,
  "valor": 33.8
 },
 "carros": {
  "REF|Fiat Argo 1.0": {
   "res": {
    "12": 76.7,
    "24": 74.1,
    "36": 70.6,
    "48": 64.3,
    "60": 59.7
   },
   "resTxt": "Tabela FIPE: o Argo com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.025535660419425937,
   "cascoTxt": "Taxa-base do casco: 2,55% do valor segurado (modelo, 33.723 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "AX|KWID ZEN 1.0 FLEX 12V 5P MEC.": {
   "res": {
    "12": 79.0,
    "24": 72.2,
    "36": 68.2,
    "48": 63.1,
    "60": 56.7
   },
   "resTxt": "Tabela FIPE: o Kwid com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.03152312355528116,
   "cascoTxt": "Taxa-base do casco: 3,15% do valor segurado (modelo, 45.866 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "AX|MOBI LIKE 1.0 FIRE FLEX 5P.": {
   "res": {
    "12": 78.7,
    "24": 71.9,
    "36": 68.8,
    "48": 65.8,
    "60": 62.7
   },
   "resTxt": "Tabela FIPE: o Mobi com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.032361812475781154,
   "cascoTxt": "Taxa-base do casco: 3,24% do valor segurado (modelo, 23.080 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "AX|KWID INTENSE 1.0 FLEX 12V 5P MEC.": {
   "res": {
    "12": 79.0,
    "24": 72.2,
    "36": 68.2,
    "48": 63.1,
    "60": 56.7
   },
   "resTxt": "Tabela FIPE: o Kwid com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.03152312355528116,
   "cascoTxt": "Taxa-base do casco: 3,15% do valor segurado (modelo, 45.866 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "AX|MOBI TREKKING 1.0 FLEX 5P.": {
   "res": {
    "12": 78.7,
    "24": 71.9,
    "36": 68.8,
    "48": 65.8,
    "60": 62.7
   },
   "resTxt": "Tabela FIPE: o Mobi com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.032361812475781154,
   "cascoTxt": "Taxa-base do casco: 3,24% do valor segurado (modelo, 23.080 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "B|ARGO DRIVE 1.0 6V FLEX": {
   "res": {
    "12": 76.7,
    "24": 74.1,
    "36": 70.6,
    "48": 64.3,
    "60": 59.7
   },
   "resTxt": "Tabela FIPE: o Argo com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.025535660419425937,
   "cascoTxt": "Taxa-base do casco: 2,55% do valor segurado (modelo, 33.723 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "B|ARGO 1.0 6V FLEX": {
   "res": {
    "12": 76.7,
    "24": 74.1,
    "36": 70.6,
    "48": 64.3,
    "60": 59.7
   },
   "resTxt": "Tabela FIPE: o Argo com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.025535660419425937,
   "cascoTxt": "Taxa-base do casco: 2,55% do valor segurado (modelo, 33.723 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "BS|HB20S COMFORT 1.0 FLEX 12V MEC.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BS|CRONOS DRIVE 1.0 6V FLEX": {
   "res": {
    "12": 74.7,
    "24": 70.3,
    "36": 66.1,
    "48": 60.1,
    "60": 58.7
   },
   "resTxt": "Tabela FIPE: o Cronos com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02516130445273018,
   "cascoTxt": "Taxa-base do casco: 2,52% do valor segurado (modelo, 8.489 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "BS|HB20S COMFORT PLUS 1.0 FLEX 12V MEC.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BS|ONIX SEDAN PLUS 1.0 12V MEC.": {
   "res": {
    "12": 74.9,
    "24": 70.3,
    "36": 66.8,
    "48": 64.9,
    "60": 61.3
   },
   "resTxt": "Tabela FIPE: o Onix com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.025321255971261565,
   "cascoTxt": "Taxa-base do casco: 2,53% do valor segurado (modelo, 1.471 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "BS|LOGAN ZEN FLEX 1.0 12V 4P MEC.": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BS|HB20S LIMITED 1.0 FLEX 12V MEC.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BX|POLO TRACK 1.0 FLEX 12V 5P": {
   "res": {
    "12": 87.7,
    "24": 82.4,
    "36": 79.1,
    "48": 74.2,
    "60": 70.6
   },
   "resTxt": "Tabela FIPE: o Polo com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BX|HB20 COMFORT PLUS 1.0 FLEX 12V MEC.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BX|HB20 COMFORT 1.0 FLEX 12V MEC.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BX|ONIX HATCH 1.0 12V FLEX 5P MEC.": {
   "res": {
    "12": 74.9,
    "24": 70.3,
    "36": 66.8,
    "48": 64.9,
    "60": 61.3
   },
   "resTxt": "Tabela FIPE: o Onix com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.025321255971261565,
   "cascoTxt": "Taxa-base do casco: 2,53% do valor segurado (modelo, 1.471 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "BX|HB20 SENSE PLUS 1.0 FLEX 12V MEC.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BX|HB20 LIMITED 1.0 FLEX 12V MEC.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BX|C3 XTR 1.0 6V 5P": {
   "res": {
    "12": 80.5,
    "24": 73.8,
    "36": 71.1,
    "48": 66.7,
    "60": 63.5
   },
   "resTxt": "Tabela FIPE: o C3 com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "BX|C3 LIVE PACK 1.0 FLEX 6V 5P MEC.": {
   "res": {
    "12": 80.5,
    "24": 73.8,
    "36": 71.1,
    "48": 66.7,
    "60": 63.5
   },
   "resTxt": "Tabela FIPE: o C3 com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "D|HB20 LIMITED 1.0 TB FLEX 12V AUT.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "D|HB20 COMF. PLUS TECH 1.0 TB FLEX 12V AUT": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "D|ARGO DRIVE 1.3 8V FLEX AUT.": {
   "res": {
    "12": 76.7,
    "24": 74.1,
    "36": 70.6,
    "48": 64.3,
    "60": 59.7
   },
   "resTxt": "Tabela FIPE: o Argo com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.025535660419425937,
   "cascoTxt": "Taxa-base do casco: 2,55% do valor segurado (modelo, 33.723 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "D|POLO COMFORTLINE TSI 1.0 FLEX 12V AUT.": {
   "res": {
    "12": 87.7,
    "24": 82.4,
    "36": 79.1,
    "48": 74.2,
    "60": 70.6
   },
   "resTxt": "Tabela FIPE: o Polo com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "D|POLO HIGHLINE TSI 1.0 FLEX 12V AUT.": {
   "res": {
    "12": 87.7,
    "24": 82.4,
    "36": 79.1,
    "48": 74.2,
    "60": 70.6
   },
   "resTxt": "Tabela FIPE: o Polo com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "D|YARIS XL 1.5 FLEX 16V 5P AUT.": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "D|POLO SENSE TSI 1.0 FLEX 12V AUT": {
   "res": {
    "12": 87.7,
    "24": 82.4,
    "36": 79.1,
    "48": 74.2,
    "60": 70.6
   },
   "resTxt": "Tabela FIPE: o Polo com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "E|SPIN PREMIER 1.8 8V ECONO.FLEX 5P AUT.": {
   "res": {
    "12": 78.4,
    "24": 60.0,
    "36": 54.1,
    "48": 50.2,
    "60": 48.7
   },
   "resTxt": "Tabela FIPE: o Spin com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.024318220744239782,
   "cascoTxt": "Taxa-base do casco: 2,43% do valor segurado (modelo, 4.087 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "E|SPIN LTZ 1.8 8V ECONO.FLEX 5P AUT.": {
   "res": {
    "12": 78.4,
    "24": 60.0,
    "36": 54.1,
    "48": 50.2,
    "60": 48.7
   },
   "resTxt": "Tabela FIPE: o Spin com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.024318220744239782,
   "cascoTxt": "Taxa-base do casco: 2,43% do valor segurado (modelo, 4.087 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "F|CRONOS DRIVE 1.3 8V FLEX": {
   "res": {
    "12": 74.7,
    "24": 70.3,
    "36": 66.1,
    "48": 60.1,
    "60": 58.7
   },
   "resTxt": "Tabela FIPE: o Cronos com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02516130445273018,
   "cascoTxt": "Taxa-base do casco: 2,52% do valor segurado (modelo, 8.489 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "F|VIRTUS TSI 1.0 FLEX 12V 4P MEC.": {
   "res": {
    "12": 76.3,
    "24": 71.5,
    "36": 68.8,
    "48": 62.5,
    "60": 56.4
   },
   "resTxt": "Tabela FIPE: o Virtus com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02293819688314894,
   "cascoTxt": "Taxa-base do casco: 2,29% do valor segurado (modelo, 16.022 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "FX|HB20S LIMITED 1.0 TB FLEX 12V AUT.": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "FX|CRONOS DRIVE 1.3 8V FLEX AUT.": {
   "res": {
    "12": 74.7,
    "24": 70.3,
    "36": 66.1,
    "48": 60.1,
    "60": 58.7
   },
   "resTxt": "Tabela FIPE: o Cronos com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02516130445273018,
   "cascoTxt": "Taxa-base do casco: 2,52% do valor segurado (modelo, 8.489 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "FX|VIRTUS TSI 1.0 FLEX 12V 4P AUT.": {
   "res": {
    "12": 76.3,
    "24": 71.5,
    "36": 68.8,
    "48": 62.5,
    "60": 56.4
   },
   "resTxt": "Tabela FIPE: o Virtus com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02293819688314894,
   "cascoTxt": "Taxa-base do casco: 2,29% do valor segurado (modelo, 16.022 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "FX|HB20S COM. PLUS TECH 1.0 TB FLEX 12V AUT": {
   "res": {
    "12": 89.0,
    "24": 74.2,
    "36": 66.7,
    "48": 59.8,
    "60": 56.9
   },
   "resTxt": "Tabela FIPE: o HB20 com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "FX|VIRTUS HIGHLINE 200 TSI 1.0 FLEX 12V AUT": {
   "res": {
    "12": 76.3,
    "24": 71.5,
    "36": 68.8,
    "48": 62.5,
    "60": 56.4
   },
   "resTxt": "Tabela FIPE: o Virtus com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02293819688314894,
   "cascoTxt": "Taxa-base do casco: 2,29% do valor segurado (modelo, 16.022 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "FX|YARIS XL SEDAN 1.5 FLEX 16V 4P AUT.": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "FX|VERSA SENSE 1.6 16V FLEX AUT.": {
   "res": {
    "12": 77.9,
    "24": 71.8,
    "36": 67.2,
    "48": 61.2,
    "60": 59.3
   },
   "resTxt": "Tabela FIPE: o Versa com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.023357343414681247,
   "cascoTxt": "Taxa-base do casco: 2,34% do valor segurado (modelo, 30 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "FX|VERSA ADVANCE 1.6 16V FLEX AUT.": {
   "res": {
    "12": 77.9,
    "24": 71.8,
    "36": 67.2,
    "48": 61.2,
    "60": 59.3
   },
   "resTxt": "Tabela FIPE: o Versa com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.023357343414681247,
   "cascoTxt": "Taxa-base do casco: 2,34% do valor segurado (modelo, 30 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "G|TERA 1.0 MPI FLEX 12V 5P MEC.": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|PULSE DRIVE 1.3 8V FLEX AUT.": {
   "res": {
    "12": 86.6,
    "24": 80.2,
    "36": 76.8,
    "48": 73.4,
    "60": 69.8
   },
   "resTxt": "Tabela FIPE: o Pulse com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|KARDIAN EVOLUT. FLEX 1.0 TB 12V 5P AUT.": {
   "res": {
    "12": 75.8,
    "24": 73.5,
    "36": 68.8,
    "48": 64.5,
    "60": 61.4
   },
   "resTxt": "Tabela FIPE: o Kardian com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|KAIT ADVANCE 1.6 16V AUT.": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|BASALT SHINE 1.0 FLEX TB 200 5P AUT.": {
   "res": {
    "12": 80.7,
    "24": 73.8,
    "36": 69.1,
    "48": 64.9,
    "60": 61.7
   },
   "resTxt": "Tabela FIPE: o Basalt com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|KICKS PLAY ACTIVE PLUS 1.6 16V FLEX AUT.": {
   "res": {
    "12": 84.8,
    "24": 77.6,
    "36": 72.6,
    "48": 68.1,
    "60": 64.8
   },
   "resTxt": "Tabela FIPE: o Kicks com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|KICKS SENSE 1.6 16V FLEX AUT.": {
   "res": {
    "12": 84.8,
    "24": 77.6,
    "36": 72.6,
    "48": 68.1,
    "60": 64.8
   },
   "resTxt": "Tabela FIPE: o Kicks com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|KICKS PLAY SENSE 1.6 16V FLEX AUT.": {
   "res": {
    "12": 84.8,
    "24": 77.6,
    "36": 72.6,
    "48": 68.1,
    "60": 64.8
   },
   "resTxt": "Tabela FIPE: o Kicks com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|KAIT EXCLUSIVE 1.6 16V AUT.": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|KARDIAN TECHNO FLEX 1.0 TB 12V 5P AUT.": {
   "res": {
    "12": 75.8,
    "24": 73.5,
    "36": 68.8,
    "48": 64.5,
    "60": 61.4
   },
   "resTxt": "Tabela FIPE: o Kardian com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H|PULSE AUDACE TURBO 200 AUT. (HÍBRIDO)": {
   "res": {
    "12": 86.6,
    "24": 80.2,
    "36": 76.8,
    "48": 73.4,
    "60": 69.8
   },
   "resTxt": "Tabela FIPE: o Pulse com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "H1|TANK 300 2.0 16V AWD AUT.(HIBRIDO)": {
   "res": {
    "12": 80.0,
    "24": 73.2,
    "36": 68.5,
    "48": 64.3,
    "60": 61.1
   },
   "resTxt": "Tabela FIPE: o Tank 300 com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HN|CRETA COMFORT 1.0 TB 12V FLEX AUT.": {
   "res": {
    "12": 81.9,
    "24": 74.6,
    "36": 71.8,
    "48": 69.7,
    "60": 66.3
   },
   "resTxt": "Tabela FIPE: o Creta com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HN|CRETA COMFORT SAFETY 1.0 TB 12V AUT.": {
   "res": {
    "12": 81.9,
    "24": 74.6,
    "36": 71.8,
    "48": 69.7,
    "60": 66.3
   },
   "resTxt": "Tabela FIPE: o Creta com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HN|2008 ALLURE 1.0 TURBO 200 5P AUT.": {
   "res": {
    "12": 81.2,
    "24": 74.3,
    "36": 69.5,
    "48": 65.2,
    "60": 62.0
   },
   "resTxt": "Tabela FIPE: o 2008 com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HN|CRETA LIMITED 1.0 TB 12V FLEX AUT.": {
   "res": {
    "12": 81.9,
    "24": 74.6,
    "36": 71.8,
    "48": 69.7,
    "60": 66.3
   },
   "resTxt": "Tabela FIPE: o Creta com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HW|T-CROSS 200 TSI 1.0 FLEX 12V 5P AUT.": {
   "res": {
    "12": 79.0,
    "24": 71.2,
    "36": 67.8,
    "48": 64.3,
    "60": 60.8
   },
   "resTxt": "Tabela FIPE: o T-Cross com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.020037151980208598,
   "cascoTxt": "Taxa-base do casco: 2,00% do valor segurado (modelo, 12.038 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "HW|NIVUS COMFORTLINE 1.0 200 TSI FLEX AUT.": {
   "res": {
    "12": 80.4,
    "24": 74.2,
    "36": 68.9,
    "48": 66.6,
    "60": 64.5
   },
   "resTxt": "Tabela FIPE: o Nivus com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02571474304659034,
   "cascoTxt": "Taxa-base do casco: 2,57% do valor segurado (modelo, 969 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "HW|DUSTER INTENSE PLUS 1.6 16V FLEX AUT.": {
   "res": {
    "12": 73.4,
    "24": 67.3,
    "36": 63.0,
    "48": 59.1,
    "60": 56.2
   },
   "resTxt": "Tabela FIPE: o Duster com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HW|T-CROSS COMFOR. 200 TSI 1.0 FLEX 5P AUT.": {
   "res": {
    "12": 79.0,
    "24": 71.2,
    "36": 67.8,
    "48": 64.3,
    "60": 60.8
   },
   "resTxt": "Tabela FIPE: o T-Cross com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.020037151980208598,
   "cascoTxt": "Taxa-base do casco: 2,00% do valor segurado (modelo, 12.038 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "HW|NIVUS HIGHLINE 1.0 200 TSI FLEX AUT.": {
   "res": {
    "12": 80.4,
    "24": 74.2,
    "36": 68.9,
    "48": 66.6,
    "60": 64.5
   },
   "resTxt": "Tabela FIPE: o Nivus com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02571474304659034,
   "cascoTxt": "Taxa-base do casco: 2,57% do valor segurado (modelo, 969 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "HW|2008 ALLURE 1.0 TURBO 200 5P AUT.": {
   "res": {
    "12": 81.2,
    "24": 74.3,
    "36": 69.5,
    "48": 65.2,
    "60": 62.0
   },
   "resTxt": "Tabela FIPE: o 2008 com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HW|T-CROSS HIG. 250 TSI 1.4 FLEX 16V 5P AUT": {
   "res": {
    "12": 79.0,
    "24": 71.2,
    "36": 67.8,
    "48": 64.3,
    "60": 60.8
   },
   "resTxt": "Tabela FIPE: o T-Cross com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.020037151980208598,
   "cascoTxt": "Taxa-base do casco: 2,00% do valor segurado (modelo, 12.038 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "HW|CRETA ACTION 1.6 16V FLEX AUT.": {
   "res": {
    "12": 81.9,
    "24": 74.6,
    "36": 71.8,
    "48": 69.7,
    "60": 66.3
   },
   "resTxt": "Tabela FIPE: o Creta com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HW|RENEGADE LONG. T270 1.3 TB 4X2 FLEX AUT": {
   "res": {
    "12": 77.9,
    "24": 77.9,
    "36": 77.5,
    "48": 73.7,
    "60": 70.1
   },
   "resTxt": "Tabela FIPE: o Renegade com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HX|TERA COMFORT 1.0 170 TSI FLEX 12V 5P AUT": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HY|BOREAL EVOLUTION 1.3 TURBO 16V 5P AUT.": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HY|COMPASS LONG. T270 1.3 TB 4X2 FLEX AUT.": {
   "res": {
    "12": 68.7,
    "24": 67.2,
    "36": 63.1,
    "48": 58.7,
    "60": 55.8
   },
   "resTxt": "Tabela FIPE: o Compass com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HY|TAOS COMFORTLINE 1.4 250 TSI FLEX AUT.": {
   "res": {
    "12": 79.6,
    "24": 72.3,
    "36": 66.5,
    "48": 61.3,
    "60": 58.2
   },
   "resTxt": "Tabela FIPE: o Taos com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HY|COROLLA CROSS XRE 2.0 16V FLEX AUT.": {
   "res": {
    "12": 78.5,
    "24": 70.9,
    "36": 66.0,
    "48": 63.0,
    "60": 60.0
   },
   "resTxt": "Tabela FIPE: o Corolla Cross com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HY|FASTBACK AUDACE 200 TB AUT (HÍBRIDO)": {
   "res": {
    "12": 75.1,
    "24": 69.4,
    "36": 65.3,
    "48": 61.3,
    "60": 58.3
   },
   "resTxt": "Tabela FIPE: o Fastback com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HY|TAOS HIGHLINE 1.4 250 TSI FLEX AUT.": {
   "res": {
    "12": 79.6,
    "24": 72.3,
    "36": 66.5,
    "48": 61.3,
    "60": 58.2
   },
   "resTxt": "Tabela FIPE: o Taos com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HZ|HAVAL H6 2 1.5 (HIBRIDO)": {
   "res": {
    "12": 76.2,
    "24": 68.0,
    "36": 65.2,
    "48": 61.1,
    "60": 58.2
   },
   "resTxt": "Tabela FIPE: o Haval H6 com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "HZ|GS4 ELITE (HÍBRIDO)": {
   "res": {
    "12": 78.5,
    "24": 71.8,
    "36": 67.2,
    "48": 63.1,
    "60": 60.0
   },
   "resTxt": "Sem série completa na FIPE para este modelo: usamos a mediana dos 27 modelos pesquisados ({p}% do 0 km com {a} de uso).",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "K|SPIN PREMIER 1.8 8V ECONO.FLEX 5P AUT.": {
   "res": {
    "12": 78.4,
    "24": 60.0,
    "36": 54.1,
    "48": 50.2,
    "60": 48.7
   },
   "resTxt": "Tabela FIPE: o Spin com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.024318220744239782,
   "cascoTxt": "Taxa-base do casco: 2,43% do valor segurado (modelo, 4.087 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "KX|COMMANDER LONGITUDE T270 1.3 TB FLEX AUT": {
   "res": {
    "12": 71.2,
    "24": 67.4,
    "36": 61.3,
    "48": 56.0,
    "60": 53.2
   },
   "resTxt": "Tabela FIPE: o Commander com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "KX|COMMANDER LIMITED T270 1.3 TB FLEX AUT.": {
   "res": {
    "12": 71.2,
    "24": 67.4,
    "36": 61.3,
    "48": 56.0,
    "60": 53.2
   },
   "resTxt": "Tabela FIPE: o Commander com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "KX|COMMANDER OVERLAND T270 1.3 TB FLEX AUT.": {
   "res": {
    "12": 71.2,
    "24": 67.4,
    "36": 61.3,
    "48": 56.0,
    "60": 53.2
   },
   "resTxt": "Tabela FIPE: o Commander com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "KX|TIGGO 8 MAX DRIVE 1.6 TURBO AUT.": {
   "res": {
    "12": 78.5,
    "24": 67.1,
    "36": 61.9,
    "48": 59.5,
    "60": 56.6
   },
   "resTxt": "Tabela FIPE: o Tiggo 8 com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "L|SAVEIRO ROBUST 1.6 TOTAL FLEX 16V": {
   "res": {
    "12": 72.3,
    "24": 66.3,
    "36": 59.3,
    "48": 55.6,
    "60": 52.9
   },
   "resTxt": "Tabela FIPE: o Saveiro com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.022750017819560295,
   "cascoTxt": "Taxa-base do casco: 2,28% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "L|STRADA ENDURANCE 1.3 FLEX 8V CS PLUS": {
   "res": {
    "12": 83.4,
    "24": 81.2,
    "36": 78.1,
    "48": 74.2,
    "60": 71.3
   },
   "resTxt": "Tabela FIPE: o Strada com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.024705964245018083,
   "cascoTxt": "Taxa-base do casco: 2,47% do valor segurado (modelo, 1.062 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "LX|SAVEIRO ROBUST 1.6 TOTAL FLEX 16V CD": {
   "res": {
    "12": 72.3,
    "24": 66.3,
    "36": 59.3,
    "48": 55.6,
    "60": 52.9
   },
   "resTxt": "Tabela FIPE: o Saveiro com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.022750017819560295,
   "cascoTxt": "Taxa-base do casco: 2,28% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "LX|STRADA FREEDOM 1.3 FLEX 8V CD": {
   "res": {
    "12": 83.4,
    "24": 81.2,
    "36": 78.1,
    "48": 74.2,
    "60": 71.3
   },
   "resTxt": "Tabela FIPE: o Strada com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.024705964245018083,
   "cascoTxt": "Taxa-base do casco: 2,47% do valor segurado (modelo, 1.062 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "LX|SAVEIRO CROSS 1.6 T.FLEX 16V CD": {
   "res": {
    "12": 72.3,
    "24": 66.3,
    "36": 59.3,
    "48": 55.6,
    "60": 52.9
   },
   "resTxt": "Tabela FIPE: o Saveiro com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.022750017819560295,
   "cascoTxt": "Taxa-base do casco: 2,28% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "M|KANGOO ADVANCED 1.6 16V FLEX": {
   "res": {
    "12": 75.9,
    "24": 75.9,
    "36": 71.5,
    "48": 67.0,
    "60": 63.7
   },
   "resTxt": "Tabela FIPE: o Kangoo com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02091214724549505,
   "cascoTxt": "Taxa-base do casco: 2,09% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "M|FIORINO ENDURANCE 1.3 FLEX 8V 2P": {
   "res": {
    "12": 78.6,
    "24": 71.9,
    "36": 67.3,
    "48": 63.1,
    "60": 60.1
   },
   "resTxt": "Tabela FIPE: o Fiorino com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02091214724549505,
   "cascoTxt": "Taxa-base do casco: 2,09% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "M|FIORINO ENDURANCE EVO 1.4 FLEX 8V 2P": {
   "res": {
    "12": 78.6,
    "24": 71.9,
    "36": 67.3,
    "48": 63.1,
    "60": 60.1
   },
   "resTxt": "Tabela FIPE: o Fiorino com {a} de uso vale {p}% do 0 km (mediana de 1 versão). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02091214724549505,
   "cascoTxt": "Taxa-base do casco: 2,09% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "QX|VIRTUS EXCLUSIVE 250TSI 1.4 FLEX 16V AUT": {
   "res": {
    "12": 76.3,
    "24": 71.5,
    "36": 68.8,
    "48": 62.5,
    "60": 56.4
   },
   "resTxt": "Tabela FIPE: o Virtus com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.02293819688314894,
   "cascoTxt": "Taxa-base do casco: 2,29% do valor segurado (modelo, 16.022 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "QX|COROLLA GLI 2.0 16V FLEX AUT.": {
   "res": {
    "12": 82.6,
    "24": 75.1,
    "36": 68.2,
    "48": 63.1,
    "60": 60.2
   },
   "resTxt": "Tabela FIPE: o Corolla com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.021539145452030534,
   "cascoTxt": "Taxa-base do casco: 2,15% do valor segurado (modelo, 5.090 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "QX|COROLLA XEI 2.0 FLEX 16V AUT.": {
   "res": {
    "12": 82.6,
    "24": 75.1,
    "36": 68.2,
    "48": 63.1,
    "60": 60.2
   },
   "resTxt": "Tabela FIPE: o Corolla com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.021539145452030534,
   "cascoTxt": "Taxa-base do casco: 2,15% do valor segurado (modelo, 5.090 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "SS|TORO FREEDOM 1.3 T270 4X2 FLEX AUT.": {
   "res": {
    "12": 76.2,
    "24": 70.5,
    "36": 66.6,
    "48": 60.9,
    "60": 57.9
   },
   "resTxt": "Tabela FIPE: o Toro com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.022750017819560295,
   "cascoTxt": "Taxa-base do casco: 2,28% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "SS|TORO ENDURANCE 1.3 T270 4X2 FLEX AUT.": {
   "res": {
    "12": 76.2,
    "24": 70.5,
    "36": 66.6,
    "48": 60.9,
    "60": 57.9
   },
   "resTxt": "Tabela FIPE: o Toro com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.022750017819560295,
   "cascoTxt": "Taxa-base do casco: 2,28% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "SX|RANGER XLS 2.0 4X4 CD DIESEL AUT.": {
   "res": {
    "12": 77.9,
    "24": 73.4,
    "36": 68.7,
    "48": 64.4,
    "60": 61.3
   },
   "resTxt": "Tabela FIPE: o Ranger com {a} de uso vale {p}% do 0 km (mediana de 4 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.022750017819560295,
   "cascoTxt": "Taxa-base do casco: 2,28% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "T|T-CROSS COMFOR. 200 TSI 1.0 FLEX 5P AUT.": {
   "res": {
    "12": 79.0,
    "24": 71.2,
    "36": 67.8,
    "48": 64.3,
    "60": 60.8
   },
   "resTxt": "Tabela FIPE: o T-Cross com {a} de uso vale {p}% do 0 km (mediana de 3 versões).",
   "casco": 0.020037151980208598,
   "cascoTxt": "Taxa-base do casco: 2,00% do valor segurado (modelo, 12.038 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "T|TAOS COMFORTLINE 1.4 250 TSI FLEX AUT.": {
   "res": {
    "12": 79.6,
    "24": 72.3,
    "36": 66.5,
    "48": 61.3,
    "60": 58.2
   },
   "resTxt": "Tabela FIPE: o Taos com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "T|COROLLA GLI 2.0 16V FLEX AUT.": {
   "res": {
    "12": 82.6,
    "24": 75.1,
    "36": 68.2,
    "48": 63.1,
    "60": 60.2
   },
   "resTxt": "Tabela FIPE: o Corolla com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.021539145452030534,
   "cascoTxt": "Taxa-base do casco: 2,15% do valor segurado (modelo, 5.090 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "T|COROLLA CROSS XRE 2.0 16V FLEX AUT.": {
   "res": {
    "12": 78.5,
    "24": 70.9,
    "36": 66.0,
    "48": 63.0,
    "60": 60.0
   },
   "resTxt": "Tabela FIPE: o Corolla Cross com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "T|COMPASS LONG. T270 1.3 TB 4X2 FLEX AUT.": {
   "res": {
    "12": 68.7,
    "24": 67.2,
    "36": 63.1,
    "48": 58.7,
    "60": 55.8
   },
   "resTxt": "Tabela FIPE: o Compass com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "T|COROLLA XEI 2.0 FLEX 16V AUT.": {
   "res": {
    "12": 82.6,
    "24": 75.1,
    "36": 68.2,
    "48": 63.1,
    "60": 60.2
   },
   "resTxt": "Tabela FIPE: o Corolla com {a} de uso vale {p}% do 0 km (mediana de 2 versões).",
   "casco": 0.021539145452030534,
   "cascoTxt": "Taxa-base do casco: 2,15% do valor segurado (modelo, 5.090 car-years na SUSEP 2021, combinada com a média da categoria)."
  },
  "T|TIGGO 8 TXS 1.6 16V TGDI AUT.": {
   "res": {
    "12": 78.5,
    "24": 67.1,
    "36": 61.9,
    "48": 59.5,
    "60": 56.6
   },
   "resTxt": "Tabela FIPE: o Tiggo 8 com {a} de uso vale {p}% do 0 km (mediana de 2 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "TT|HAVAL H6 2 1.5 (HIBRIDO)": {
   "res": {
    "12": 76.2,
    "24": 68.0,
    "36": 65.2,
    "48": 61.1,
    "60": 58.2
   },
   "resTxt": "Tabela FIPE: o Haval H6 com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.02329402615588946,
   "cascoTxt": "Taxa-base do casco: 2,33% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  },
  "TT|COMMANDER LIMITED T270 1.3 TB FLEX AUT.": {
   "res": {
    "12": 71.2,
    "24": 67.4,
    "36": 61.3,
    "48": 56.0,
    "60": 53.2
   },
   "resTxt": "Tabela FIPE: o Commander com {a} de uso vale {p}% do 0 km (mediana de 3 versões). Alguns anos foram completados ou suavizados pela curva dos demais modelos.",
   "casco": 0.024827167650144536,
   "cascoTxt": "Taxa-base do casco: 2,48% do valor segurado (média da categoria, SUSEP 2021; sem dados deste modelo)."
  }
 },
 "fontes": [
  {
   "n": "Desvalorização",
   "t": "Tabela FIPE de nov/2026 (API pública da FIPE): preço do modelo 0 km comparado ao de anos anteriores, mediana das versões.",
   "u": "https://veiculos.fipe.org.br"
  },
  {
   "n": "Rendimento",
   "t": "Meta Selic de 13,75% (BCB) e mediana das projeções do Boletim Focus de 19/11/2026 (13,0% em 2027; 11,0% em 2028; 10,5% em 2029), média da trajetória no prazo.",
   "u": "https://www.bcb.gov.br/publicacoes/focus"
  },
  {
   "n": "Seguro",
   "t": "Dados abertos da SUSEP (Autoseg): prêmio ÷ importância segurada por modelo, estado e faixa de idade do condutor, mais coberturas de terceiros e acidentes pessoais. Base de 2021; a taxa foi mantida porque seguro e carro novo subiram em ritmo parecido no IPCA/IBGE desde 03/2021 (+27,9% e +33,0%).",
   "u": "https://www2.susep.gov.br/menuestatistica/Autoseg/principal.aspx"
  },
  {
   "n": "IPVA",
   "t": "Alíquotas de 2026 levantadas em reportagens e sites especializados (Exame/SBT News, Revista Carro, Valor Final). Não conferidas nas Secretarias da Fazenda.",
   "u": "https://sbtnews.sbt.com.br/noticia/brasil/ipva-2026-qual-estado-com-maior-e-menor-imposto-veja-ranking"
  },
  {
   "n": "Revisões",
   "t": "Pacotes de revisão Volkswagen Vale+ (tabela de out/2026), usados como referência para todas as marcas.",
   "u": "https://garagem360.com.br/?p=322449"
  },
  {
   "n": "Pneus",
   "t": "Preços observados na Pneubest (nov/2026) usados só para a proporção entre medidas; o valor-base é o do estudo de referência.",
   "u": "https://www.pneubest.com.br"
  },
  {
   "n": "Custo da hora",
   "t": "Rendimento médio do trabalho, PNAD Contínua jul–set/2026 (IBGE): R$ 3.790; 44 h por semana; 70% de encargos (estimativa).",
   "u": "https://sidra.ibge.gov.br/tabela/6390"
  },
  {
   "n": "Licenciamento, imprevistos e tempo da equipe",
   "t": "Estimativas (estudo de referência e diária de aluguel da Localiza). Não existe fonte oficial para estes itens."
  }
 ],
 "aviso": "Médias de mercado são referências para uma primeira conta, não cotações. Para uma proposta fechada, use os valores reais de cada item."
};
