(() => {
  const supported = ["pt-BR","en","es"];
  const text = {
    "pt-BR": {
      featured:"EM DESTAQUE",
      manifestOk:"Manifesto carregado. Escolha o destino — nenhum redirecionamento é automático.",
      manifestError:"Manifesto indisponível. Use o contato oficial."
    },
    "en": {
      featured:"FEATURED",
      manifestOk:"Manifest loaded. Choose the destination — no automatic redirect.",
      manifestError:"Manifest unavailable. Use the official contact."
    },
    "es": {
      featured:"DESTACADO",
      manifestOk:"Manifiesto cargado. Elige el destino — no hay redirección automática.",
      manifestError:"Manifiesto no disponible. Usa el contacto oficial."
    }
  };

  const langFromBrowser = () => {
    const saved = localStorage.getItem("blackgold-language");
    if (supported.includes(saved)) return saved;
    for (const raw of navigator.languages || [navigator.language || "en"]) {
      const v = String(raw).toLowerCase();
      if (v.startsWith("pt")) return "pt-BR";
      if (v.startsWith("es")) return "es";
      if (v.startsWith("en")) return "en";
    }
    return "en";
  };

  let language = langFromBrowser();

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
    button.addEventListener("click", () => {
      language = supported.includes(button.dataset.lang) ? button.dataset.lang : "en";
      localStorage.setItem("blackgold-language", language);
      document.documentElement.lang = language;
      document.querySelectorAll("[data-lang]").forEach((b) => {
        b.classList.toggle("active", b.dataset.lang === language);
      });
      location.reload();
    });
  });

  const esc = (value) => String(value ?? "")
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#039;");

  const statusLabel = (status) => ({
    live:"ATIVO",
    published:"PUBLICADO",
    launching:"EM LANÇAMENTO",
    coming_soon:"EM BREVE"
  }[status] || String(status || "").toUpperCase());

  async function getJson(path) {
    const response = await fetch(path,{cache:"no-store"});
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return response.json();
  }

  function renderFeatured(content) {
    const root = document.getElementById("featured-card");
    if (!root) return;
    const item = content.assets.find(x => x.id === content.featured_asset_id) || content.assets[0];
    if (!item) return;

    root.querySelector(".badge").textContent = item.kicker || text[language].featured;
    root.querySelector("h2").textContent = item.title;
    root.querySelector("p").textContent = item.summary;

    const cta = root.querySelector("a");
    if (item.url) {
      cta.hidden = false;
      cta.href = item.url;
      cta.target = "_blank";
      cta.rel = "noopener noreferrer";
      cta.textContent = item.cta || "Abrir";
    } else {
      cta.hidden = true;
    }
  }

  function renderNews(content) {
    const root = document.getElementById("news-grid");
    if (root) {
      root.innerHTML = content.news.slice(0,3).map(n => `
        <article class="news-card">
          <div class="news-meta"><span>${esc(n.category)}</span><time>${esc(n.date)}</time></div>
          <h3>${esc(n.title)}</h3>
          <p>${esc(n.summary)}</p>
        </article>
      `).join("");
    }

    const archive = document.getElementById("news-archive");
    if (archive) {
      archive.innerHTML = content.news.map(n => `
        <article class="news-row">
          <time>${esc(n.date)}</time>
          <span>${esc(n.category)}</span>
          <div><h2>${esc(n.title)}</h2><p>${esc(n.summary)}</p></div>
        </article>
      `).join("");
    }
  }

  function renderPortfolio(content) {
    const root = document.getElementById("portfolio-grid");
    if (!root) return;
    const sorted = [...content.assets].sort((a,b)=>(b.priority||0)-(a.priority||0));
    root.innerHTML = sorted.map(a => {
      const clickable = Boolean(a.url);
      const body = `
        <div class="asset-card-top">
          <span class="eyebrow">${esc(a.kicker || a.kind)}</span>
          <span class="status ${esc(a.status)}">${esc(statusLabel(a.status))}</span>
        </div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.summary)}</p>
        <span class="asset-cta">${esc(a.cta || "")}${clickable ? " ↗" : ""}</span>`;
      if (clickable) {
        return `<a class="asset-card" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${body}</a>`;
      }
      return `<article class="asset-card">${body}</article>`;
    }).join("");
  }

  function renderPipeline(content) {
    const root = document.getElementById("pipeline-grid");
    if (!root) return;
    root.innerHTML = content.pipeline.map((p,i)=>`
      <article class="pipeline-card">
        <small>0${i+1} • ${esc(p.stage)}</small>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.note)}</p>
      </article>
    `).join("");
  }

  function ecoCard(item) {
    const label = item.labels?.[language] || item.labels?.en || item.id;
    const target = item.canonical_url.startsWith("mailto:") ? "_self" : "_blank";
    return `
      <a class="eco-card" href="${esc(item.canonical_url)}" target="${target}" ${target==="_blank"?'rel="noopener noreferrer"':""}>
        <div><strong>${esc(label)}</strong><small>${esc(item.status)} • ${esc(item.type)}</small></div>
        <span class="eco-arrow">›</span>
      </a>`;
  }

  async function loadContent() {
    const content = await getJson("data/content.json");
    renderFeatured(content);
    renderNews(content);
    renderPortfolio(content);
    renderPipeline(content);
  }

  async function loadEcosystem() {
    const status = document.getElementById("manifest-status");
    if (!status) return;

    try {
      const data = await getJson("data/ecosystem-manifest.v2.1.json");
      const active = data.items.filter(x => x.status === "active");

      const products = document.getElementById("ecosystem-products");
      const social = document.getElementById("ecosystem-social");
      const company = document.getElementById("ecosystem-company");

      if (products) products.innerHTML = active.filter(x => ["app","store"].includes(x.type)).map(ecoCard).join("");
      if (social) social.innerHTML = active.filter(x => ["social","community"].includes(x.type)).map(ecoCard).join("");
      if (company) company.innerHTML = active.filter(x => ["company","contact"].includes(x.type)).map(ecoCard).join("");

      status.textContent = text[language].manifestOk + ` • v${data.version}`;
    } catch (err) {
      console.error(err);
      status.textContent = text[language].manifestError;
      status.previousElementSibling?.classList.add("error");
    }
  }

  loadContent().catch(console.error);
  loadEcosystem().catch(console.error);
})();