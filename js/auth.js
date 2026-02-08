// HERITAGE OS - Apple-like login flow (email -> password)
// Bloc 59: palette + calm spacing handled by css/heritage.css

(function () {
  const $ = (s) => document.querySelector(s);

  const els = {
    email: $("#email"),
    password: $("#password"),
    remember: $("#remember"),
    stepEmail: $("#stepEmail"),
    stepPassword: $("#stepPassword"),
    arrowEmail: $("#arrowEmail"),
    arrowPassword: $("#arrowPassword"),
    forgot: $("#forgot"),
    createEmail: $("#createAccountEmail"),
    createPassword: $("#createAccountPassword"),
    status: $("#status"),
  };

  function setStatus(msg, isError = false) {
    els.status.textContent = msg || "";
    els.status.style.opacity = msg ? "1" : "0";
    els.status.style.color = isError ? "rgba(255,210,210,.92)" : "rgba(242,241,237,.72)";
  }

  function normalizeEmail(v) {
    return (v || "").trim();
  }

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function goEmailStep() {
    els.stepEmail.classList.remove("hidden");
    els.stepPassword.classList.add("hidden");
    setStatus("");
    setTimeout(() => els.email && els.email.focus(), 20);
  }

  function goPasswordStep() {
    els.stepEmail.classList.add("hidden");
    els.stepPassword.classList.remove("hidden");
    setStatus("");
    setTimeout(() => els.password && els.password.focus(), 20);
  }

  // ---- Supabase (client-side anon key ONLY)
  // IMPORTANT:
  // - URL + ANON KEY go here (client-safe).
  // - Never put service_role key in the browser.
  const SUPABASE_URL = window.__SUPABASE_URL || "";
  const SUPABASE_ANON_KEY = window.__SUPABASE_ANON_KEY || "";

  const supabase =
    (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase)
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
      : null;

  async function signInEmailPassword(email, password) {
    if (!supabase) {
      setStatus("Configuration Supabase manquante (URL / ANON KEY).", true);
      return;
    }

    setStatus("Connexion…");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus("Identifiants incorrects.", true);
        return;
      }

      // Remember-me hook:
      // Supabase gère déjà une session persistante par défaut.
      // Si tu veux un mode "session uniquement" quand la case n'est pas cochée,
      // on le fera après (c’est un réglage fin, pas un bricolage).
      setStatus("Connecté.");
      // TODO: redirect
      // window.location.href = "/app";
      console.log("Signed in:", data);
    } catch (e) {
      setStatus("Erreur réseau. Réessaie.", true);
    }
  }

  // ---- Events
  els.arrowEmail.addEventListener("click", () => {
    const email = normalizeEmail(els.email.value);
    if (!validateEmail(email)) {
      setStatus("Adresse e-mail invalide.", true);
      els.email.focus();
      return;
    }
    setStatus("");
    goPasswordStep();
  });

  els.arrowPassword.addEventListener("click", () => {
    const email = normalizeEmail(els.email.value);
    const password = (els.password.value || "").trim();

    if (!validateEmail(email)) {
      setStatus("Adresse e-mail invalide.", true);
      goEmailStep();
      return;
    }
    if (!password) {
      setStatus("Entre ton mot de passe.", true);
      els.password.focus();
      return;
    }
    signInEmailPassword(email, password);
  });

  els.email.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.arrowEmail.click();
  });

  els.password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.arrowPassword.click();
  });

  els.forgot.addEventListener("click", (e) => {
    e.preventDefault();
    setStatus("Flux “mot de passe oublié” à brancher.", false);
    // TODO: supabase.auth.resetPasswordForEmail(email)
  });

  function onCreate(e){
    e.preventDefault();
    setStatus("Flux “créer un compte” à brancher.", false);
    // TODO: redirect/signup
  }
  els.createEmail.addEventListener("click", onCreate);
  els.createPassword.addEventListener("click", onCreate);

  // Init
  goEmailStep();
})();
