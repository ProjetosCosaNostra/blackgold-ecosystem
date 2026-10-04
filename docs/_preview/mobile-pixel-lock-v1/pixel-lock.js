(()=>{
  "use strict";

  const links={
    course:"https://projetoscosanostra.github.io/blackgold-course-translator-site/",
    store:"https://blackgold-beauty-finds-br.pages.dev/",
    fitnexus:"https://projetoscosanostra.github.io/FitNexus_Coach_BlackGold/",
    appevidex:"https://appevidex.pages.dev/",
    price_no_ponto:"https://play.google.com/store/apps/details?id=br.com.lafamigliaplayworks.preconoponto&pcampaignid=web_share",
    instagram:"https://www.instagram.com/cosanostra.blackgold/",
    tiktok:"https://www.tiktok.com/@cosanostraresolve?_r=1&_t=ZS-99Gu6t5IHQY",
    kwai:"https://kwai-video.com/u/@cosanostra.blackgold/CwdSwBPA",
    youtube:"https://www.youtube.com/@cosanostra.blackgold",
    facebook:"https://www.facebook.com/cosanostra.blackgold/",
    telegram:"https://t.me/BlackGoldSociety",
    github:"https://github.com/ProjetosCosaNostra",
    linkedin:"https://www.linkedin.com/in/felipe-projetoscosanostra/",
    contact:"mailto:projetoscosanostra@gmail.com",
    book:null
  };

  const toast=document.getElementById("toast");
  let toastTimer=0;

  function showToast(text){
    clearTimeout(toastTimer);
    toast.textContent=text;
    toast.hidden=false;
    toastTimer=setTimeout(()=>{toast.hidden=true},2600);
  }

  document.querySelectorAll("[data-nav]").forEach(el=>{
    el.addEventListener("click",()=>{
      location.href=el.dataset.nav;
    });
  });

  document.querySelectorAll("[data-link]").forEach(el=>{
    el.addEventListener("click",()=>{
      const key=el.dataset.link;
      const url=links[key];

      if(!url){
        showToast("O link oficial do livro será colocado assim que a Amazon liberar.");
        return;
      }

      window.open(url,"_blank","noopener,noreferrer");
    });
  });

  document.querySelectorAll("[data-scroll]").forEach(el=>{
    el.addEventListener("click",()=>{
      const id=el.dataset.scroll;
      const target=id==="top"
        ? document.getElementById("top")
        : document.getElementById(id);

      if(target){
        target.scrollIntoView({behavior:"smooth",block:"start"});
      }
    });
  });

  document.querySelectorAll("[data-lang]").forEach(el=>{
    el.addEventListener("click",()=>{
      const lang=el.dataset.lang;

      if(lang==="pt"){
        showToast("Português — contrato visual aprovado.");
        return;
      }

      if(lang==="en"){
        showToast("Inglês será aplicado sobre esta mesma composição após o PT ficar aprovado no navegador.");
        return;
      }

      if(lang==="es"){
        showToast("Espanhol será aplicado sobre esta mesma composição após o PT ficar aprovado no navegador.");
      }
    });
  });

  const drawer=document.getElementById("drawer");
  const menu=document.getElementById("menuHotspot");

  menu.addEventListener("click",()=>{
    drawer.hidden=!drawer.hidden;
  });

  drawer.addEventListener("click",ev=>{
    if(ev.target===drawer)drawer.hidden=true;
  });

  // Diagnostic only:
  // append ?debug=1 to show the invisible interactive regions.
  const params=new URLSearchParams(location.search);
  if(params.get("debug")==="1"){
    document.documentElement.classList.add("debug-hotspots");
  }
})();