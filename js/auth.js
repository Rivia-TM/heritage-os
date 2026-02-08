// HERITAGE OS - Apple-like login flow (step 1 email, step 2 password)
// Bloc 59 palette + Inter. Logo is an asset (assets/heritageos-logo.png).

(function () {
  const $ = (sel) => document.querySelector(sel);

  const state = { step: 1 };

  // Supabase config: put your URL + anon key here (anon key is public by design)
  // Example:
  // const SUPABASE_URL = "https://xxxx.supabase.co";
  // const SUPABASE_ANON_KEY = "eyJ..."; 
  const SUPABASE_URL = "";
  const SUPABASE_ANON_KEY = "";

  const supabase =
    (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY)
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
      : null;

  const els = {
    email: $("#email"),
    password: $("#password"),
    remember: $("#remember"),
    title: $("#title"),

    stepEmail: $("#stepEmail"),
    stepPassword: $("#stepPassword"),

    arrowEmail: $("#arrowEmail"),
    arrowPassword: $("#arrowPassword"),

    forgot: $("#forgot"),
    create: $("#createAccount"),
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

  function goStep(step) {
    state.step = step;

    if (step === 1) {
      els.stepEmail.classList.remove("hidden");
      els.stepPassword.classList.add("hidden");
      setStatus("");
      requestAnimationFrame(() => els.email && els.email.focus());
      return;
    }

    els.stepEmail.classList.add("hidden");
    els.stepPassword.classList.remove("hidden");
    setStatus("");
    requestAnimationFrame(() => els.password && els.password.focus());
  }

  async function doLogin() {
    const email = normalizeEmail(els.email.value);
    const password = (els.password.value || "").trim();

    if (!validateEmail(email)) {
      setStatus("Adresse e-mail invalide.", true);
      goStep(1);
      return;
    }
    if (!password) {
      setStatus("Mot de passe requis.", true);
      return;
    }

    if (!supabase) {
      setStatus("Supabase non configuré (URL + anon key).", true);
      return;
    }

    setStatus("Connexion…");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setStatus("Identifiants incorrects.", true);
        return;
      }

      // Remember me (best-effort, client-side hint)
      if (els.remember && els.remember.checked) {
        localStorage.setItem("heritageos_remember", "1");
        localStorage.setItem("heritageos_email", email);
      } else {
        localStorage.removeItem("heritageos_remember");
        localStorage.removeItem("heritageos_email");
      }

      setStatus("Connecté.");
      // TODO: redirect to your app space
      // window.location.href = "/app.html";
      console.log("Signed in:", data);
    } catch (e) {
      console.error(e);
      setStatus("Erreur de connexion.", true);
    }
  }

  function handleEmailContinue() {
    const email = normalizeEmail(els.email.value);
    if (!validateEmail(email)) {
      setStatus("Adresse e-mail invalide.", true);
      return;
    }
    goStep(2);
  }

  // Prefill email if remembered
  try {
    const remember = localStorage.getItem("heritageos_remember") === "1";
    const email = localStorage.getItem("heritageos_email") || "";
    if (remember && email && els.email) {
      els.email.value = email;
      if (els.remember) els.remember.checked = true;
    }
  } catch (_) {}

  // Events
  els.arrowEmail.addEventListener("click", handleEmailContinue);
  els.arrowPassword.addEventListener("click", doLogin);

  els.email.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleEmailContinue();
  });

  els.password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doLogin();
  });

  els.forgot.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = normalizeEmail(els.email.value);
    if (!validateEmail(email)) {
      setStatus("Saisis ton e-mail d’abord.", true);
      goStep(1);
      return;
    }
    if (!supabase) {
      setStatus("Supabase non configuré (URL + anon key).", true);
      return;
    }

    setStatus("Envoi du lien…");
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setStatus("Impossible d’envoyer le lien.", true);
      return;
    }
    setStatus("Lien envoyé si l’e-mail existe.");
  });

  els.create.addEventListener("click", (e) => {
    e.preventDefault();
    // TODO: route to signup page
    setStatus("Création de compte: à brancher sur ta page d’inscription.");
  });

  // Init
  goStep(1);
})();
