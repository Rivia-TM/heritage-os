/* global supabase */
(function(){
  const $ = (s, r=document) => r.querySelector(s);

  function getCfg(){
    const url = (window.HERITAGE_SUPABASE_URL || "").trim();
    const key = (window.HERITAGE_SUPABASE_ANON_KEY || "").trim();
    return {url, key};
  }

  function storageForRemember(remember){
    const base = remember ? window.localStorage : window.sessionStorage;
    return { getItem:(k)=>base.getItem(k), setItem:(k,v)=>base.setItem(k,v), removeItem:(k)=>base.removeItem(k) };
  }

  function makeClient(remember){
    const {url, key} = getCfg();
    if(!url || !key) return {client:null, error:"CONFIG"};
    const client = supabase.createClient(url, key, {
      auth:{ persistSession:true, storage:storageForRemember(remember), autoRefreshToken:true, detectSessionInUrl:true }
    });
    return {client, error:null};
  }

  function setMsg(el, text, kind){
    if(!el) return;
    el.textContent = text || "";
    el.classList.remove("error","ok");
    if(kind) el.classList.add(kind);
  }

  function pwStrong(pw){
    return pw.length>=8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw);
  }

  window.HeritageApp = { $, setMsg, pwStrong, makeClient, getCfg };
})();
