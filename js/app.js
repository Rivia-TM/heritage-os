const SUPABASE_URL = "REPLACE_ME_SUPABASE_URL";
const SUPABASE_ANON_KEY = "REPLACE_ME_SUPABASE_ANON_KEY";

const $ = (id) => document.getElementById(id);

function show(id){
  ["view-login","view-signup","view-reset","view-private"].forEach(v => $(v).style.display = (v===id ? "block" : "none"));
}

function setMsg(el, text){
  el.textContent = text || "";
  el.style.color = text?.toLowerCase().includes("ok") ? "rgba(200,255,220,0.85)" : "rgba(255,220,220,0.85)";
}

function route(){
  const h = (location.hash || "#login").replace("#","");
  if(h === "signup") show("view-signup");
  else if(h === "reset") show("view-reset");
  else show("view-login");
}

function storageMode(){
  return $("remember")?.checked ? window.localStorage : window.sessionStorage;
}

function makeClient(){
  return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      storage: storageMode(),
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
}

let sb;

async function refreshUI(){
  const { data } = await sb.auth.getSession();
  const session = data?.session;

  if(session?.user){
    show("view-private");
    $("who").textContent = `Utilisateur: ${session.user.email || "(sans email)"}`;
    return;
  }
  route();
}

async function main(){
  if(SUPABASE_URL.includes("REPLACE_ME") || SUPABASE_ANON_KEY.includes("REPLACE_ME")){
    setMsg($("msg"), "⚠️ Configure SUPABASE_URL et SUPABASE_ANON_KEY dans js/app.js");
    route();
    return;
  }

  sb = makeClient();
  window.addEventListener("hashchange", route);

  $("btn-magic").addEventListener("click", async () => {
    const email = $("login-email").value.trim();
    if(!email) return setMsg($("msg"), "Entre un email.");
    setMsg($("msg"), "Envoi du lien magique…");
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if(error) return setMsg($("msg"), `Erreur: ${error.message}`);
    setMsg($("msg"), "OK: vérifie ta boîte mail (lien de connexion).");
  });

  $("btn-login").addEventListener("click", async () => {
    const email = $("login-email").value.trim();
    const password = $("login-pass").value;
    if(!email || !password) return setMsg($("msg"), "Email + mot de passe requis.");
    setMsg($("msg"), "Connexion…");
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if(error) return setMsg($("msg"), `Erreur: ${error.message}`);
    setMsg($("msg"), "OK");
    await refreshUI();
  });

  $("btn-signup").addEventListener("click", async () => {
    const email = $("su-email").value.trim();
    const password = $("su-pass").value;
    if(!email || !password) return setMsg($("msg2"), "Email + mot de passe requis.");
    setMsg($("msg2"), "Création…");
    const { error } = await sb.auth.signUp({ email, password });
    if(error) return setMsg($("msg2"), `Erreur: ${error.message}`);
    setMsg($("msg2"), "OK: compte créé (si email confirmation activé, vérifie ta boîte).");
  });

  $("btn-reset").addEventListener("click", async () => {
    const email = $("rp-email").value.trim();
    if(!email) return setMsg($("msg3"), "Entre un email.");
    setMsg($("msg3"), "Envoi…");
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
    if(error) return setMsg($("msg3"), `Erreur: ${error.message}`);
    setMsg($("msg3"), "OK: email envoyé.");
  });

  $("btn-logout").addEventListener("click", async () => {
    await sb.auth.signOut();
    location.hash = "#login";
    await refreshUI();
  });

  sb.auth.onAuthStateChange(async () => {
    await refreshUI();
  });

  await refreshUI();
}

main();
