(function () {
  const $ = (id) => document.getElementById(id);

  const email = $("email");
  const pass = $("password");
  const stepEmail = $("stepEmail");
  const stepPassword = $("stepPassword");
  const arrowEmail = $("arrowEmail");
  const arrowPassword = $("arrowPassword");
  const status = $("status");
  const remember = $("remember");

  function setStatus(msg){ if(status) status.textContent = msg || ""; }

  try{
    if(remember) remember.checked = localStorage.getItem("heritage_remember")==="1";
    if(email){
      const lastEmail = localStorage.getItem("heritage_email");
      if(lastEmail) email.value = lastEmail;
    }
  }catch{}

  function goPassword(){
    const v = (email?.value || "").trim();
    if(!v) return setStatus("Entrez votre e-mail.");
    if(!v.includes("@")) return setStatus("E-mail invalide.");
    setStatus("");
    stepEmail?.classList.add("hidden");
    stepPassword?.classList.remove("hidden");
    try{ localStorage.setItem("heritage_email", v); }catch{}
    pass?.focus();
  }

  function goLogin(){
    const v = (pass?.value || "").trim();
    if(!v) return setStatus("Entrez votre mot de passe.");
    setStatus("Connexion… (Supabase à brancher)");
  }

  arrowEmail?.addEventListener("click", goPassword);
  arrowPassword?.addEventListener("click", goLogin);
  email?.addEventListener("keydown", (e)=>{ if(e.key==="Enter") goPassword(); });
  pass?.addEventListener("keydown", (e)=>{ if(e.key==="Enter") goLogin(); });

  remember?.addEventListener("change", ()=>{
    try{ localStorage.setItem("heritage_remember", remember.checked ? "1" : "0"); }catch{}
  });

  const signupForm = $("signupForm");
  const signupStatus = $("signupStatus");
  signupForm?.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd = new FormData(signupForm);
    const p1 = String(fd.get("password")||"");
    const p2 = String(fd.get("password2")||"");
    if(p1.length < 8) return (signupStatus.textContent="Mot de passe: 8 caractères minimum.");
    if(p1 !== p2) return (signupStatus.textContent="Les mots de passe ne correspondent pas.");
    signupStatus.textContent="Création non branchée (Supabase à connecter).";
  });

  const forgotForm = $("forgotForm");
  const forgotStatus = $("forgotStatus");
  forgotForm?.addEventListener("submit",(e)=>{
    e.preventDefault();
    forgotStatus.textContent="Envoi non branché (Supabase à connecter).";
  });
})();
