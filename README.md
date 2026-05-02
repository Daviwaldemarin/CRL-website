# CRL Retrovisores — Site Institucional

Site institucional estático em HTML/CSS/JS puro, sem build step, sem frameworks. Pronto para hospedar em qualquer lugar.

## Estrutura

```
site/
├── index.html          # Home
├── produtos.html       # Catálogo filtrável (~70 produtos)
├── empresa.html        # Sobre a empresa
├── contato.html        # Contato + formulário
├── style.css           # Design system completo
├── script.js           # Lógica + base de dados de produtos
├── README.md           # Este arquivo
└── assets/
    ├── logo-crl.png         # Logo azul (fundo claro)
    ├── logo-crl-white.png   # Logo branco (fundo escuro)
    └── hero-mirrors.png     # Imagem hero
```

## Como hospedar

### Opção 1 — Hospedagem tradicional (Hostgator, Hostinger, Locaweb)
1. Acesse o painel cPanel / FTP
2. Suba toda a pasta `site/` para a raiz do domínio (`public_html/`)
3. Pronto — o site está no ar

### Opção 2 — Vercel / Netlify (grátis)
1. Crie uma conta em vercel.com ou netlify.com
2. Arraste a pasta `site/` na interface "Deploy"
3. Configure o domínio personalizado (crlretrovisores.com.br)

### Opção 3 — GitHub Pages (grátis)
1. Crie um repositório público
2. Suba os arquivos
3. Settings → Pages → branch `main` → save

## Personalizar

### Trocar o e-mail de contato
Hoje está como `comercial@rclretrovisores.com.br`. Para alterar, faça busca-e-substitua nos 4 arquivos HTML.

### Trocar telefones
Os 4 números (3461-1074 / 1092 / 1109 / 1114) aparecem em todos os HTMLs. Para mudar, busca-e-substitua.

### Adicionar novos produtos
Abra `script.js` e adicione no array `PRODUTOS`:

```js
{ brand: "Fiat", model: "Novo Modelo", codes: ["RX-999 LD S/C", "RX-998 LE S/C"] },
```

Marcas válidas: `"Fiat"`, `"GM"`, `"VW"`, `"Ford"`, `"Universal"`.
Códigos com `S/C` (sem controle) ficam com badge clara, `C/C` (com controle) com badge azul-marinho.

### Substituir o ícone genérico dos produtos por fotos reais
1. Tire fotos dos retrovisores em fundo branco (ou recorte do PDF do catálogo)
2. Salve em `assets/produtos/RF-310.png`, etc.
3. Em `script.js`, na função `renderProducts`, troque o bloco `mirrorSvg` por:

```js
<img src="assets/produtos/${p.codes[0].split(" ")[0]}.png" alt="${p.model}" />
```

E ajuste o CSS `.product-image` para `padding: 20px` e os `img` para `object-fit: contain`.

### Conectar o formulário de contato a um backend real
Hoje, ao enviar o formulário, ele abre o WhatsApp com a mensagem montada. Para enviar e-mail real:

**Opção mais fácil — Formspree (grátis até 50 envios/mês):**
1. Cadastre-se em formspree.io
2. Crie um formulário e copie o endpoint (algo como `https://formspree.io/f/abcd1234`)
3. Em `contato.html`, altere a tag `<form>`:

```html
<form id="contact-form" class="contact-form reveal reveal-delay-1"
      action="https://formspree.io/f/abcd1234" method="POST">
```

4. Em `script.js`, remova o `e.preventDefault()` ou deixe os dois fluxos (WhatsApp + e-mail).

### Trocar imagens
Substitua os arquivos em `assets/` mantendo os mesmos nomes — todas as páginas vão usar automaticamente.

## Recursos técnicos

- **Performance**: sem libs externas pesadas. Apenas Google Fonts (com preconnect)
- **SEO**: meta descriptions e titles por página, lang `pt-BR`, breadcrumbs
- **Acessibilidade**: estrutura semântica, `aria-label`, respeito a `prefers-reduced-motion`
- **Responsivo**: testado em 1440px (desktop) e 390px (mobile)
- **Filtro por URL**: links como `produtos.html?marca=Fiat` já vão pré-filtrar a marca

## Avisos legais

O disclaimer "As peças e imagens não são as mesmas das montadoras..." está no rodapé de todas as páginas, conforme o catálogo PDF v2.

---

Site desenvolvido com base no catálogo CRL v2 e na identidade visual oficial da marca.
