// HERITAGE OS - Apple-like login flow (step 1 email, step 2 password)
// Styling/branding comes from Bloc 59 palette + typography.

(function () {
  const $ = (sel) => document.querySelector(sel);

  const state = { step: 1 };

  const els = {
    email: $("#email"),
    password: $("#password"),
    remember: $("#remember"),
    title: $("#title"),
    subtitle: $("#subtitle"),
    stepEmail: $("#stepEmail"),
    stepPassword: $("#stepPassword"),
    arrowEmail: $("#arrowEmail"),
    arrowPassword: $("#arrowPassword"),
    forgot: $("#forgot"),
    create: $("#createAccount"),
    status: $("#status"),
  };

  function setStatus(msg, isError = false) {
    if (!els.status) return;
    els.status.textContent = msg || "";
    els.status.style.opacity = msg ? "1" : "0";
    els.status.style.color = isError ? "rgba(255,210,210,.9)" : "rgba(242,241,237,.72)";
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
      els.title.textContent = "Connectez-vous pour accéder à votre espace.";
      els.subtitle.textContent = "Connectez-vous à Héritage OS";
      setStatus("");
      setTimeout(() => els.email && els.email.focus(), 50);
      return;
    }

    els.stepEmail.classList.add("hidden");
    els.stepPassword.classList.remove("hidden");
    els.title.textContent = "Connectez-vous à Héritage OS";
    els.subtitle.textContent = "";
    setStatus("");
    setTimeout(() => els.password && els.password.focus(), 50);
  }

  function onContinueEmail() {
    const v = normalizeEmail(els.email.value);
    if (!v) return setStatus("Saisissez votre e-mail ou numéro de téléphone.", true);
    if (v.includes("@") && !validateEmail(v)) return setStatus("Adresse e-mail invalide.", true);
    goStep(2);
  }

  function onLogin() {
    const email = normalizeEmail(els.email.value);
    const pass = (els.password.value || "").trim();
    if (!email) return goStep(1);
    if (!pass) return setStatus("Saisissez votre mot de passe.", true);

    // Placeholder: Supabase auth will be plugged here.
    // For now we validate UI only.
    const remember = !!els.remember.checked;

    setStatus("Connexion…");
    setTimeout(() => {
      setStatus("Connexion prête (UI). Branche Supabase à l’étape suivante.");
      // store remember flag locally (UI-level)
      try {
        localStorage.setItem("heritage_remember", remember ? "1" : "0");
        localStorage.setItem("heritage_email", email);
      } catch (e) {}
    }, 450);
  }

  // UI events
  els.arrowEmail.addEventListener("click", onContinueEmail);
  els.arrowPassword.addEventListener("click", onLogin);

  els.email.addEventListener("keydown", (e) => {
    if (e.key === "Enter") onContinueEmail();
  });

  els.password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") onLogin();
  });

  els.forgot.addEventListener("click", (e) => {
    e.preventDefault();
    setStatus("Mot de passe oublié: à brancher sur Supabase (reset).");
  });

  els.create.addEventListener("click", (e) => {
    e.preventDefault();
    setStatus("Création de compte: à brancher sur Supabase (sign up).");
  });

  // Remember behavior (UI only)
  try {
    const rem = localStorage.getItem("heritage_remember") === "1";
    const savedEmail = localStorage.getItem("heritage_email") || "";
    if (rem && savedEmail) {
      els.remember.checked = true;
      els.email.value = savedEmail;
    }
  } catch (e) {}

  // init
  goStep(1);
})();
