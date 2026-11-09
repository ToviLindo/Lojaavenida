# Loja Avenida — site institucional

Site estático (HTML, CSS e JavaScript puro). Sem build, sem banco de dados, sem login, sem dependências.

## Estrutura
```
index.html        página principal (todas as seções)
404.html          página de erro personalizada
css/style.css     estilos e responsividade
js/main.js        menu, rolagem, galeria (lightbox), FAQ, voltar ao topo
assets/img/       imagens (WebP/SVG) e imagem de compartilhamento (og-image.jpg)
assets/icons/     favicon e ícone para iPhone
sitemap.xml, robots.txt, vercel.json
```

## Rodar localmente
Abra `index.html` no navegador. Para simular o servidor: `python3 -m http.server 8000` na pasta e acesse http://localhost:8000. A página 404 só aparece em servidor (ex.: `/qualquer-coisa`).

## Publicar na Vercel
1. Envie a pasta para um repositório no GitHub e importe em vercel.com (Framework: **Other**, sem comando de build, diretório raiz). Ou use `npx vercel` dentro da pasta.
2. Depois de publicar, troque **SEU-DOMINIO.vercel.app** pelo endereço real em: `index.html` (og:url, og:image e dados estruturados), `sitemap.xml` e `robots.txt`.

## Como editar (procure por "EDITAR" nos comentários do `index.html`)
- **Horários:** seção `#horarios`, troque "A confirmar" em cada dia. Use a nota abaixo para feriados. Atualize também a resposta do FAQ sobre horários.
- **Fotos:** salve em `assets/img/` em WebP (uma versão grande, até 1400 px, e uma `-sm` de ~720 px). Em "Conheça nossa loja" (`#loja`), copie um `<li>` da galeria e ajuste `src`, `data-full`, `alt` e `data-cap`. Em "Nós temos" (`#nos-temos`), troque a imagem, o nome ou a frase de cada cartão. O hero usa `fachada.webp`.
- **Instagram:** a galeria é manual (o site não se conecta ao Instagram). Na seção `#instagram`, troque o `src` das 4 imagens por fotos de publicações recentes e, se quiser, o `href` pelo link de cada post.
- **Avaliações:** substitua o bloco `.empty` pelo modelo `review-grid` do comentário, somente com depoimentos reais e autorizados.
- **Novidades:** copie um `<article class="news-card">` por novidade.
- **História da loja:** pilar "Nossa história", na seção Sobre nós.
- **FAQ:** copie um `<details>` por pergunta.

## Informações confirmadas usadas no site
Instagram @lojaavenidamtba · Av. Paraná, 1971, Lagoinha, Mandirituba – PR · telefone e WhatsApp (41) 98739-1070, telefone fixo (41) 3633-1478 (lido no letreiro da fachada) (o botão abre a conversa com uma mensagem inicial, editável no `?text=` dos links `wa.me`). Horários, história, fotos reais e avaliações ainda não foram informados e não foram inventados.
