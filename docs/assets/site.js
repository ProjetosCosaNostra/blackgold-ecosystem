
(async()=>{
  const local={
    home:"index.html",
    news:"news.html",
    products:"products.html",
    next:"next.html",
    ecosystem:"ecosystem.html",
    "lang-pt":"index.html"
  };
  let links={};
  try{
    const r=await fetch("data/links.json",{cache:"no-store"});
    if(r.ok) links=await r.json();
  }catch(e){}
  document.querySelectorAll(".hotspot[data-action]").forEach(a=>{
    const key=a.dataset.action;
    const href=local[key] || links[key];
    if(href){
      a.href=href;
      if(/^https?:\/\//i.test(href)){
        a.target="_blank"; a.rel="noopener noreferrer";
      }
    }else{
      a.removeAttribute("href");
      a.classList.add("disabled");
      a.setAttribute("aria-disabled","true");
      if(key==="lang-en"||key==="lang-es"){
        a.title="Idioma visual ainda não aprovado para esta versão.";
      }else{
        a.title="Destino será ativado quando o ativo tiver URL pública.";
      }
      a.addEventListener("click",ev=>ev.preventDefault());
    }
  });
})();
