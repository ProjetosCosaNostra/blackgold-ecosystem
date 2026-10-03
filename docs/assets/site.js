(async()=>{
  "use strict";

  const local = {
    home: "index.html",
    news: "news.html",
    products: "products.html",
    next: "next.html",
    ecosystem: "ecosystem.html",
    "lang-pt": "index.html"
  };

  let links = {};
  try {
    const r = await fetch("data/links.json", {cache:"no-store"});
    if (r.ok) links = await r.json();
  } catch (_) {}

  const esc = (v="") => String(v)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");

  const targetFor = key => local[key] || links[key] || null;

  function wireAnchor(a) {
    const key = a.dataset.action;
    if (!key) return;

    if (key.startsWith("panel-")) {
      a.removeAttribute("href");
      a.addEventListener("click", ev => {
        ev.preventDefault();
        openPanel(key.slice(6));
      });
      return;
    }

    const href = targetFor(key);

    if (href) {
      a.href = href;
      a.classList.remove("disabled");
      a.removeAttribute("aria-disabled");

      if (/^https?:\/\//i.test(href)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    } else {
      a.removeAttribute("href");
      a.classList.add("disabled");
      a.setAttribute("aria-disabled","true");

      if (key === "lang-en" || key === "lang-es") {
        a.title = "Idioma visual ainda não aprovado para esta versão.";
      } else if (key === "book") {
        a.title = "Livro publicado. Link oficial da Amazon em validação.";
      } else if (key === "budget") {
        a.title = "Orçamento no Ponto — quase pronto.";
      } else {
        a.title = "Destino ainda não publicado.";
      }

      a.addEventListener("click", ev => ev.preventDefault());
    }
  }

  document.querySelectorAll(".hotspot[data-action]").forEach(wireAnchor);

  const data = {
    apps: {
      eyebrow: "ATIVOS PUBLICADOS",
      title: "Apps e produtos digitais",
      intro: "Acesso direto aos ativos BlackGold que já possuem destino público validado.",
      items: [
        {title:"Preço no Ponto", meta:"PUBLICADO • PLAY STORE", desc:"Aplicativo já disponível na Google Play.", action:"price_no_ponto", cta:"Abrir na Play Store"},
        {title:"FitNexus Coach", meta:"ATIVO • WEB", desc:"Projeto oficial do ecossistema BlackGold.", action:"fitnexus", cta:"Acessar"},
        {title:"AppEvidex", meta:"ATIVO • WEB", desc:"Ativo oficial publicado no Cloudflare Pages.", action:"appevidex", cta:"Acessar"},
        {title:"Orçamento no Ponto", meta:"QUASE PRONTO", desc:"Novo aplicativo em fase final de preparação para publicação.", action:"budget", cta:"Em breve", disabled:true}
      ]
    },
    publications: {
      eyebrow: "PUBLICAÇÕES",
      title: "Conteúdo original BlackGold",
      intro: "Publicações que transformam conhecimento em ativos de longo prazo.",
      items: [
        {title:"SEU SERVIÇO TEM PREÇO", meta:"PUBLICADO", desc:"Quanto cobrar pelo seu trabalho — guia prático de precificação para MEI, autônomos e prestadores de serviço.", action:"book", cta:"Link Amazon em validação", disabled:true}
      ]
    },
    tools: {
      eyebrow: "FERRAMENTAS",
      title: "Ferramentas e soluções",
      intro: "Produtos construídos para produtividade, aprendizado e execução.",
      items: [
        {title:"BlackGold Course Translator", meta:"EM DESTAQUE", desc:"Tradução sincronizada de legendas e transcrições de cursos diretamente no navegador.", action:"course", cta:"Conhecer o produto"},
        {title:"AppEvidex", meta:"ATIVO", desc:"Ativo web oficial do ecossistema.", action:"appevidex", cta:"Acessar"}
      ]
    },
    community: {
      eyebrow: "COMUNIDADE",
      title: "Comunidade BlackGold",
      intro: "Canais para acompanhar novidades, conteúdo e evolução dos projetos.",
      items: [
        {title:"Telegram — BlackGold Society", meta:"COMUNIDADE", desc:"Canal oficial da comunidade.", action:"telegram", cta:"Entrar no Telegram"},
        {title:"GitHub — Projetos Cosa Nostra", meta:"DESENVOLVIMENTO", desc:"Repositórios e projetos oficiais.", action:"github", cta:"Abrir GitHub"},
        {title:"LinkedIn", meta:"PROFISSIONAL", desc:"Atualizações profissionais do ecossistema.", action:"linkedin", cta:"Abrir LinkedIn"}
      ]
    },
    channels: {
      eyebrow: "CANAIS OFICIAIS",
      title: "Siga a BlackGold",
      intro: "Destinos oficiais para novidades, conteúdo e comunidade.",
      items: [
        {title:"Instagram", meta:"SOCIAL", action:"instagram", cta:"Abrir"},
        {title:"TikTok", meta:"SOCIAL", action:"tiktok", cta:"Abrir"},
        {title:"Kwai", meta:"SOCIAL", action:"kwai", cta:"Abrir"},
        {title:"YouTube", meta:"SOCIAL", action:"youtube", cta:"Abrir"},
        {title:"Facebook", meta:"SOCIAL", action:"facebook", cta:"Abrir"},
        {title:"Telegram", meta:"COMUNIDADE", action:"telegram", cta:"Abrir"}
      ]
    },
    all: {
      eyebrow: "ECOSSISTEMA BLACKGOLD",
      title: "Ativos e destinos oficiais",
      intro: "Projetos publicados, produtos em preparação e canais oficiais reunidos em um só lugar.",
      items: [
        {title:"Loja Oficial / BlackGold Beauty Finds", meta:"ATIVO • LOJA", action:"store", cta:"Acessar loja"},
        {title:"Preço no Ponto", meta:"PUBLICADO • PLAY STORE", action:"price_no_ponto", cta:"Abrir Play Store"},
        {title:"FitNexus Coach", meta:"ATIVO • WEB", action:"fitnexus", cta:"Acessar"},
        {title:"AppEvidex", meta:"ATIVO • WEB", action:"appevidex", cta:"Acessar"},
        {title:"BlackGold Course Translator", meta:"EM DESTAQUE", action:"course", cta:"Conhecer"},
        {title:"Orçamento no Ponto", meta:"QUASE PRONTO", action:"budget", cta:"Em breve", disabled:true},
        {title:"SEU SERVIÇO TEM PREÇO", meta:"PUBLICADO", action:"book", cta:"Link Amazon em validação", disabled:true}
      ]
    }
  };

  let panelRoot = null;
  let lastFocus = null;

  function ensurePanel() {
    if (panelRoot) return panelRoot;

    panelRoot = document.createElement("div");
    panelRoot.className = "bg-asset-modal";
    panelRoot.hidden = true;
    panelRoot.innerHTML = `
      <div class="bg-asset-backdrop" data-close="1"></div>
      <section class="bg-asset-dialog" role="dialog" aria-modal="true" aria-labelledby="bg-asset-title">
        <button class="bg-asset-close" type="button" aria-label="Fechar" data-close="1">×</button>
        <div class="bg-asset-eyebrow"></div>
        <h2 id="bg-asset-title"></h2>
        <p class="bg-asset-intro"></p>
        <div class="bg-asset-grid"></div>
      </section>`;

    document.body.appendChild(panelRoot);

    panelRoot.addEventListener("click", ev => {
      if (ev.target.closest("[data-close]")) closePanel();
    });

    document.addEventListener("keydown", ev => {
      if (!panelRoot.hidden && ev.key === "Escape") closePanel();
    });

    return panelRoot;
  }

  function itemHtml(item) {
    const href = targetFor(item.action);
    const disabled = item.disabled || !href;
    const attrs = disabled
      ? `class="bg-asset-link is-disabled" aria-disabled="true"`
      : `class="bg-asset-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer"`;

    return `
      <article class="bg-asset-card">
        <div>
          <span class="bg-asset-meta">${esc(item.meta || "")}</span>
          <h3>${esc(item.title)}</h3>
          ${item.desc ? `<p>${esc(item.desc)}</p>` : ""}
        </div>
        <a ${attrs}>${esc(item.cta || "Abrir")} <span aria-hidden="true">→</span></a>
      </article>`;
  }

  function openPanel(kind) {
    const spec = data[kind] || data.all;
    const root = ensurePanel();

    lastFocus = document.activeElement;
    root.querySelector(".bg-asset-eyebrow").textContent = spec.eyebrow;
    root.querySelector("#bg-asset-title").textContent = spec.title;
    root.querySelector(".bg-asset-intro").textContent = spec.intro;
    root.querySelector(".bg-asset-grid").innerHTML = spec.items.map(itemHtml).join("");

    root.hidden = false;
    document.body.classList.add("bg-modal-open");
    root.querySelector(".bg-asset-close").focus();
  }

  function closePanel() {
    if (!panelRoot) return;
    panelRoot.hidden = true;
    document.body.classList.remove("bg-modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function addHotspot(action, x, y, w, h, label) {
    const shell = document.querySelector(".visual-shell");
    if (!shell) return;

    const a = document.createElement("a");
    a.className = "hotspot bg-runtime-hotspot";
    a.dataset.action = action;
    a.setAttribute("aria-label", label);
    a.style.left = `${x}%`;
    a.style.top = `${y}%`;
    a.style.width = `${w}%`;
    a.style.height = `${h}%`;

    shell.appendChild(a);
    wireAnchor(a);
  }

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // Quick-access row visible in the approved art.
  if (["index.html","products.html","next.html"].includes(page)) {
    addHotspot("panel-apps",         4.1, 86.0, 17.6, 6.8, "Apps");
    addHotspot("panel-publications",22.2, 86.0, 18.3, 6.8, "Publicações");
    addHotspot("panel-tools",       41.1, 86.0, 17.8, 6.8, "Ferramentas");
    addHotspot("panel-community",   59.5, 86.0, 17.2, 6.8, "Comunidade");
    addHotspot("panel-channels",    77.3, 86.0, 18.0, 6.8, "Canais oficiais");
  }

  // Product category filters visible in Produtos e Ativos.
  if (page === "products.html") {
    addHotspot("panel-all",          4.3, 39.0, 17.0, 5.6, "Todos os ativos");
    addHotspot("panel-apps",        21.8, 39.0, 17.5, 5.6, "Apps");
    addHotspot("panel-publications",39.8, 39.0, 18.4, 5.6, "Publicações");
    addHotspot("panel-tools",       58.7, 39.0, 17.9, 5.6, "Ferramentas");
    addHotspot("panel-all",         77.1, 39.0, 18.5, 5.6, "Institucional");
  }

  // "Ver todos os projetos" on the Ecosystem page.
  if (page === "ecosystem.html") {
    addHotspot("panel-all", 83.7, 52.5, 12.0, 3.6, "Ver todos os projetos");
  }
})();

// BG_GATE06_VISIBLE_PUBLISHED_ASSETS
(()=>{
  "use strict";

  const LINKS = {
    store: "https://blackgold-beauty-finds-br.pages.dev/",
    fitnexus: "https://projetoscosanostra.github.io/FitNexus_Coach_BlackGold/",
    appevidex: "https://appevidex.pages.dev/",
    price_no_ponto: "https://play.google.com/store/apps/details?id=br.com.lafamigliaplayworks.preconoponto&pcampaignid=web_share",
    instagram: "https://www.instagram.com/cosanostra.blackgold/",
    tiktok: "https://www.tiktok.com/@cosanostraresolve?_r=1&_t=ZS-99Gu6t5IHQY",
    kwai: "https://kwai-video.com/u/@cosanostra.blackgold/CwdSwBPA",
    youtube: "https://www.youtube.com/@cosanostra.blackgold",
    facebook: "https://www.facebook.com/cosanostra.blackgold/",
    telegram: "https://t.me/BlackGoldSociety",
    github: "https://github.com/ProjetosCosaNostra",
    linkedin: "https://www.linkedin.com/in/felipe-projetoscosanostra/",
    contact: "mailto:projetoscosanostra@gmail.com"
  };

  const ASSETS = [
    {code:"BF",tag:"LOJA OFICIAL",title:"BlackGold Beauty Finds",desc:"Beleza, estilo e curadoria BlackGold.",href:LINKS.store},
    {code:"FN",tag:"ATIVO WEB",title:"FitNexus Coach",desc:"Projeto oficial do ecossistema.",href:LINKS.fitnexus},
    {code:"AE",tag:"ATIVO WEB",title:"AppEvidex",desc:"Plataforma oficial publicada.",href:LINKS.appevidex},
    {code:"PP",tag:"PLAY STORE",title:"Preço no Ponto",desc:"Aplicativo publicado no Google Play.",href:LINKS.price_no_ponto}
  ];

  function card(item) {
    const a = document.createElement("a");
    a.className = "bg-live-asset-card";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `${item.title} — ${item.tag}`);
    a.innerHTML = `
      <span class="bg-live-asset-code">${item.code}</span>
      <span class="bg-live-asset-copy">
        <small>${item.tag}</small>
        <strong>${item.title}</strong>
        <em>${item.desc}</em>
      </span>
      <span class="bg-live-asset-arrow" aria-hidden="true">→</span>`;
    return a;
  }

  function addAssetRow(mode) {
    const shell = document.querySelector(".visual-shell");
    if (!shell) return;

    const row = document.createElement("section");
    row.className = `bg-live-assets bg-live-assets--${mode}`;
    row.setAttribute("aria-label","Ativos publicados BlackGold");

    ASSETS.forEach(item => row.appendChild(card(item)));
    shell.appendChild(row);
  }

  function addLinkHotspot(href, x, y, w, h, label) {
    const shell = document.querySelector(".visual-shell");
    if (!shell) return;

    const a = document.createElement("a");
    a.className = "hotspot bg-direct-hotspot";
    a.href = href;
    a.target = href.startsWith("mailto:") ? "_self" : "_blank";
    if (!href.startsWith("mailto:")) a.rel = "noopener noreferrer";
    a.setAttribute("aria-label",label);
    a.style.left = `${x}%`;
    a.style.top = `${y}%`;
    a.style.width = `${w}%`;
    a.style.height = `${h}%`;
    shell.appendChild(a);
  }

  const page = (location.pathname.split("/").pop() || "index.html").replace(/\/$/,"").toLowerCase();

  if (page === "products.html" || page === "products") {
    addAssetRow("products");
  }

  if (page === "ecosystem.html" || page === "ecosystem") {
    addAssetRow("ecosystem");

    addLinkHotspot(LINKS.instagram, 23.6, 64.0, 18.8, 6.3, "Instagram BlackGold");
    addLinkHotspot(LINKS.tiktok,    43.0, 64.0, 18.8, 6.3, "TikTok BlackGold");
    addLinkHotspot(LINKS.kwai,      62.8, 64.0, 18.8, 6.3, "Kwai BlackGold");

    addLinkHotspot(LINKS.youtube,   23.6, 70.5, 18.8, 6.2, "YouTube BlackGold");
    addLinkHotspot(LINKS.facebook,  43.0, 70.5, 18.8, 6.2, "Facebook BlackGold");
    addLinkHotspot(LINKS.telegram,  62.8, 70.5, 18.8, 6.2, "Telegram BlackGold Society");

    addLinkHotspot(LINKS.github,    23.6, 78.2, 23.4, 7.8, "GitHub Projetos Cosa Nostra");
    addLinkHotspot(LINKS.linkedin,  47.5, 78.2, 23.2, 7.8, "LinkedIn BlackGold");
    addLinkHotspot(LINKS.contact,   71.3, 78.2, 23.1, 7.8, "Contato BlackGold");
  }
})();