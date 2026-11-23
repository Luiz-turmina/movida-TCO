# Movida Frotas — Custo real: frota própria vs. aluguel

Site estático (HTML + CSS + JS, sem build). Duas páginas num só link: **O custo real** e **Faça a conta** (calculadora).

## Rodar localmente
```bash
python3 -m http.server 8745
# abra http://localhost:8745
```

## Onde mudar as coisas
Tudo em `data.js`: premissas do cálculo, textos dos grupos de custo, lista do que está incluso, aviso final e o botão de contato (`cta.href`; vazio = o botão não aparece).

## Link personalizado por cliente
A mensalidade da Movida não vem fixa. Para enviar um link com a proposta já preenchida:

`https://SEU-SITE.vercel.app/?carros=20&km=2000&prazo=48&preco=90000&movida=3150&financiar=1#conta`

O botão "Copiar link com estes números" na calculadora gera esse link automaticamente.

## Publicar
Suba **todos os arquivos na raiz** do repositório (sem subpastas) e importe na Vercel (Framework: Other, sem build).

Arquivos: `index.html`, `styles.css`, `app.js`, `data.js`, `movida-logo.svg`, `movida-logo-branco.svg`, `favicon.svg`.
