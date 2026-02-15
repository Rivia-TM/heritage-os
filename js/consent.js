(function(){
  const KEY="heritage_consent_v1";
  const qs=s=>document.querySelector(s);
  const get=()=>{try{return localStorage.getItem(KEY)}catch(e){return null}};
  const set=v=>{try{localStorage.setItem(KEY,v)}catch(e){}};
  const show=()=>{const el=qs("#consent"); if(el) el.style.display="block";};
  const hide=()=>{const el=qs("#consent"); if(el) el.style.display="none";};

  function enableAnalytics(){
    // Matomo recommandé. Tant que MATOMO_URL / SITE_ID vides => rien nest
