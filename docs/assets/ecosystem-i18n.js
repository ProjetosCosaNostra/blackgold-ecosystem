(()=>{
  "use strict";

  const KEY = "bg_lang";
  const VALID = new Set(["pt","en","es"]);
  const shell = document.querySelector(".visual-shell");

  if (!shell) return;

  const qs = new URLSearchParams(location.search);
  const queryLang = qs.get("lang");
  const saved = localStorage.getItem(KEY);

  let lang = VALID.has(queryLang) ? queryLang : (VALID.has(saved) ? saved : "pt");

  const copy = {
    en: {
      title: "BlackGold Ecosystem",
      nav: ["Highlight","News","Products","Next","Ecosystem"],
      kicker: "ECOSYSTEM",
      heroTitle: "BlackGold Ecosystem",
      heroBody: "Official ecosystem page where projects, store, channels, community and contact come together in one place. A constantly expanding ecosystem, ready to welcome new assets, products and channels.",
      status: "ACTIVE ECOSYSTEM",
      note: "Always ready to receive new projects, assets and channels.",
      side: ["PROJECTS","STORE","CHANNELS","COMMUNITY","CONTACT","AND MUCH MORE"],
      sec1Title: "Projects and Assets",
      sec1Body: "Discover the main projects, products and ecosystem assets.",
      sec2Title: "Published Assets",
      sec2Body: "Official apps and platforms in the ecosystem, already available for access.",
      sec3Title: "Community and Networks",
      sec3Body: "Official channels to follow news, content and be part of our community.",
      sec4Title: "Company and Contact",
      sec4Body: "Institutional information, project repository and contact channel.",
      courseTitle: "BlackGold Course Translator",
      courseBody: "Course translation with AI.",
      bookTitle: "Your Service Has a Price",
      bookBody: "Strategy, pricing and mindset to turn knowledge into value.",
      budgetTitle: "Budget on Point",
      budgetBody: "Organize, plan and control your projects with greater clarity and results.",
      expansionTitle: "Ecosystem Expansion",
      expansionBody: "More products, tools and communities in development.",
      access: "Access",
      details: "See details",
      learn: "Learn more",
      storeDesc: "Beauty, style and BlackGold curation.",
      fitDesc: "Official ecosystem project.",
      appDesc: "Official published platform.",
      priceDesc: "App on Google Play.",
      storeCta: "Access the store",
      priceCta: "Access on Play Store",
      githubDesc: "Official project repository.",
      linkedinDesc: "Follow our professional updates.",
      contactDesc: "Questions, partnerships and new opportunities.",
      footer: "Building products, knowledge and opportunities for a freer and more prosperous digital future.",
      privacy: "Privacy",
      contact: "Contact"
    },
    es: {
      title: "Ecosistema BlackGold",
      nav: ["Destacado","Novedades","Productos","Próximos","Ecosistema"],
      kicker: "ECOSISTEMA",
      heroTitle: "Ecosistema BlackGold",
      heroBody: "Página oficial del ecosistema donde proyectos, tienda, canales, comunidad y contacto se unen en un solo lugar. Un ecosistema en constante expansión, listo para recibir nuevos activos, productos y canales.",
      status: "ECOSISTEMA ACTIVO",
      note: "Siempre listo para recibir nuevos proyectos, activos y canales.",
      side: ["PROYECTOS","TIENDA","CANALES","COMUNIDAD","CONTACTO","Y MUCHO MÁS"],
      sec1Title: "Proyectos y Activos",
      sec1Body: "Conoce los principales proyectos, productos y activos del ecosistema.",
      sec2Title: "Activos publicados",
      sec2Body: "Aplicaciones y plataformas oficiales del ecosistema, ya disponibles para acceder.",
      sec3Title: "Comunidad y Redes",
      sec3Body: "Canales oficiales para seguir novedades, contenidos y formar parte de nuestra comunidad.",
      sec4Title: "Empresa y Contacto",
      sec4Body: "Información institucional, repositorio de proyectos y canal de contacto.",
      courseTitle: "BlackGold Course Translator",
      courseBody: "Traducción de cursos con IA.",
      bookTitle: "Tu Servicio Tiene Precio",
      bookBody: "Estrategia, precios y mentalidad para transformar conocimiento en valor.",
      budgetTitle: "Presupuesto en el Punto",
      budgetBody: "Organiza, planifica y controla tus proyectos con más claridad y resultados.",
      expansionTitle: "Expansión del Ecosistema",
      expansionBody: "Más productos, herramientas y comunidades en desarrollo.",
      access: "Acceder",
      details: "Ver detalles",
      learn: "Saber más",
      storeDesc: "Belleza, estilo y curaduría BlackGold.",
      fitDesc: "Proyecto oficial del ecosistema.",
      appDesc: "Plataforma oficial publicada.",
      priceDesc: "Aplicación en Google Play.",
      storeCta: "Acceder a la tienda",
      priceCta: "Acceder en Play Store",
      githubDesc: "Repositorio oficial de proyectos.",
      linkedinDesc: "Sigue nuestras actualizaciones profesionales.",
      contactDesc: "Dudas, alianzas y nuevas oportunidades.",
      footer: "Construyendo productos, conocimiento y oportunidades para un futuro digital más libre y próspero.",
      privacy: "Privacidad",
      contact: "Contacto"
    }
  };

  const positions = {
    nav:       [585,18,590,54],
    kicker:    [116,93,235,36],
    heroTitle: [116,122,615,67],
    heroBody:  [116,188,610,96],
    status:    [122,284,236,49],
    note:      [378,286,250,52],
    side:      [1404,181,178,155],

    sec1Title: [102,390,230,46],
    sec1Body:  [102,432,220,75],
    sec2Title: [102,558,235,44],
    sec2Body:  [102,600,220,74],
    sec3Title: [102,690,248,44],
    sec3Body:  [102,730,225,72],
    sec4Title: [102,807,260,44],
    sec4Body:  [102,846,245,58],

    c1: [458,365,155,94],
    c2: [758,365,155,100],
    c3: [1040,365,158,100],
    c4: [1411,365,164,100],

    b1: [421,486,171,34],
    b2: [753,486,166,34],
    b3: [1030,486,168,34],
    b4: [1417,486,157,34],

    a1: [420,561,190,55],
    a2: [754,561,185,55],
    a3: [1053,561,180,55],
    a4: [1398,561,180,55],

    ab1:[356,622,276,34],
    ab2:[650,622,300,34],
    ab3:[962,622,305,34],
    ab4:[1287,622,300,34],

    gh: [493,816,235,42],
    li: [900,816,235,42],
    ct: [1285,816,280,42],

    footer:[382,895,360,36],
    footerLinks:[1053,895,235,36]
  };

  let layer = null;

  function setBox(el, key) {
    const [x,y,w,h] = positions[key];
    Object.assign(el.style,{
      left:`${x}px`,
      top:`${y}px`,
      width:`${w}px`,
      height:`${h}px`
    });
  }

  function zone(key, className, html) {
    const el = document.createElement("div");
    el.className = `eco-i18n-zone ${className}`;
    setBox(el,key);
    el.innerHTML = html;
    return el;
  }

  function buildLayer(dict,currentLang) {
    const root = document.createElement("div");
    root.className = "eco-i18n-layer";
    root.setAttribute("aria-hidden","true");

    const nav = zone("nav","eco-i18n-nav",dict.nav.map((n,i)=>
      `<span class="${i===4?"active":""}">${n}</span>`
    ).join(""));
    root.appendChild(nav);

    root.appendChild(zone("kicker","eco-i18n-kicker eco-i18n-mask",dict.kicker));
    root.appendChild(zone("heroTitle","eco-i18n-title eco-i18n-mask",dict.heroTitle));
    root.appendChild(zone("heroBody","eco-i18n-body eco-i18n-mask",dict.heroBody));
    root.appendChild(zone("status","eco-i18n-status",dict.status));
    root.appendChild(zone("note","eco-i18n-note eco-i18n-mask",dict.note));
    root.appendChild(zone("side","eco-i18n-side eco-i18n-mask",dict.side.join("<br>")));

    root.appendChild(zone("sec1Title","eco-i18n-section-title eco-i18n-mask",dict.sec1Title));
    root.appendChild(zone("sec1Body","eco-i18n-section-copy eco-i18n-mask",dict.sec1Body));
    root.appendChild(zone("sec2Title","eco-i18n-section-title eco-i18n-mask",dict.sec2Title));
    root.appendChild(zone("sec2Body","eco-i18n-section-copy eco-i18n-mask",dict.sec2Body));
    root.appendChild(zone("sec3Title","eco-i18n-section-title eco-i18n-mask",dict.sec3Title));
    root.appendChild(zone("sec3Body","eco-i18n-section-copy eco-i18n-mask",dict.sec3Body));
    root.appendChild(zone("sec4Title","eco-i18n-section-title eco-i18n-mask",dict.sec4Title));
    root.appendChild(zone("sec4Body","eco-i18n-section-copy eco-i18n-mask",dict.sec4Body));

    root.appendChild(zone("c1","eco-i18n-card",`<strong>${dict.courseTitle}</strong><span>${dict.courseBody}</span>`));
    root.appendChild(zone("c2","eco-i18n-card",`<strong>${dict.bookTitle}</strong><span>${dict.bookBody}</span>`));
    root.appendChild(zone("c3","eco-i18n-card",`<strong>${dict.budgetTitle}</strong><span>${dict.budgetBody}</span>`));
    root.appendChild(zone("c4","eco-i18n-card",`<strong>${dict.expansionTitle}</strong><span>${dict.expansionBody}</span>`));

    root.appendChild(zone("b1","eco-i18n-button",dict.access+" →"));
    root.appendChild(zone("b2","eco-i18n-button",dict.details+" →"));
    root.appendChild(zone("b3","eco-i18n-button",dict.access+" →"));
    root.appendChild(zone("b4","eco-i18n-button",dict.learn+" →"));

    root.appendChild(zone("a1","eco-i18n-asset",`<strong>BlackGold Beauty Finds</strong><span>${dict.storeDesc}</span>`));
    root.appendChild(zone("a2","eco-i18n-asset",`<strong>FitNexus Coach</strong><span>${dict.fitDesc}</span>`));
    root.appendChild(zone("a3","eco-i18n-asset",`<strong>AppEvidex</strong><span>${dict.appDesc}</span>`));
    root.appendChild(zone("a4","eco-i18n-asset",`<strong>Preço no Ponto</strong><span>${dict.priceDesc}</span>`));

    root.appendChild(zone("ab1","eco-i18n-button",dict.storeCta+" →"));
    root.appendChild(zone("ab2","eco-i18n-button",dict.access+" →"));
    root.appendChild(zone("ab3","eco-i18n-button",dict.access+" →"));
    root.appendChild(zone("ab4","eco-i18n-button",dict.priceCta+" →"));

    root.appendChild(zone("gh","eco-i18n-small",`GitHub<br>${dict.githubDesc}`));
    root.appendChild(zone("li","eco-i18n-small",`LinkedIn<br>${dict.linkedinDesc}`));
    root.appendChild(zone("ct","eco-i18n-small",`Contact<br>${dict.contactDesc}`));

    root.appendChild(zone("footer","eco-i18n-footer",dict.footer));
    root.appendChild(zone("footerLinks","eco-i18n-footer",`${dict.privacy} &nbsp; | &nbsp; ${dict.contact} &nbsp; | &nbsp; GitHub`));

    const langbar = document.createElement("div");
    langbar.className = "eco-i18n-langbar";
    langbar.innerHTML = ["pt","en","es"].map(code =>
      `<span class="eco-i18n-langdot ${code===currentLang?"active":""}">${code.toUpperCase()}</span>`
    ).join("");
    root.appendChild(langbar);

    return root;
  }

  function resizeLayer() {
    if (!layer) return;
    const scale = shell.clientWidth / 1672;
    layer.style.transform = `scale(${scale})`;
  }

  function applyLanguage(next,{pushUrl=true}={}) {
    lang = VALID.has(next) ? next : "pt";
    localStorage.setItem(KEY,lang);

    document.body.dataset.ecoLang = lang;
    document.documentElement.lang = lang==="pt" ? "pt-BR" : lang;
    document.title = lang==="pt"
      ? "Ecossistema — BlackGold"
      : `${copy[lang].title} — BlackGold`;

    if (layer) {
      layer.remove();
      layer = null;
    }

    if (lang !== "pt") {
      layer = buildLayer(copy[lang],lang);
      shell.appendChild(layer);
      resizeLayer();
    }

    if (pushUrl) {
      const u = new URL(location.href);
      if (lang === "pt") u.searchParams.delete("lang");
      else u.searchParams.set("lang",lang);
      history.replaceState(null,"",u);
    }

    document.querySelectorAll(".eco-lang-trigger").forEach(a => {
      const isActive = a.dataset.lang === lang;
      a.setAttribute("aria-current",isActive ? "true" : "false");
      a.title = isActive
        ? (lang==="pt" ? "Português ativo" : lang==="en" ? "English active" : "Español activo")
        : `Switch to ${a.dataset.lang.toUpperCase()}`;
    });
  }

  document.querySelectorAll(".eco-lang-trigger").forEach(a => {
    a.addEventListener("click",ev => {
      ev.preventDefault();
      applyLanguage(a.dataset.lang);
    });
  });

  addEventListener("resize",resizeLayer,{passive:true});
  applyLanguage(lang,{pushUrl:false});
})();