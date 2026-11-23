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
    "Valores ilustrativos para um Fiat Argo 1.0 a R$ 84.316,50 (média entre duas referências de mercado), sujeitos à versão exata, ao perfil de uso e à proposta comercial da Movida. Combustível, multas, estacionamento e pedágios ficam de fora porque custam o mesmo comprando ou alugando. Valide o tratamento fiscal com a sua contabilidade."
};
