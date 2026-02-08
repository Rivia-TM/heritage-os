// HERITAGE OS - Apple-like login flow (step 1 email, step 2 password)
// UI fixed (minimal). Background + logo switchable (image OR video) from config below.

(function () {
  const $ = (sel) => document.querySelector(sel);

  // ---- CONFIG (change only these paths when you want) ----
  // Put your files in /assets then set paths here.
  // Example:
  // background: { type:"video", src:"assets/bg.mp4" }
  // brand:      { type:"image", src:"assets/heritage-logo.png" }
  const MEDIA = {
    background: { type: "none",  src: "" }, // "none" | "image" | "video"
    brand:      { type: "none",  src: "" }, // "none" | "image" | "video"
  };
  // -------------------------------------------------------

  const state = { step: 1 };

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

    bgImage: $("#bgImage"),
    bgVideo: $("#bgVideo"),
    brandImage: $("#brandImage"),
    brandVideo: $("#brandVideo"),
  };

  function setStatus(msg, isError = false) {
    els.status.textContent = msg || "";
    els.status.style.opacity = msg ? "1" : "0";
    els.status.style.color = isError ? "rgba(255,210,210,.9)" : "rgba(242,241,237,.72)";
  }

  function normalizeEmail(v) { return (v || "").trim(); }
  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function goStep(step) {
    state.step = step;

    if (step === 1) {
      els.stepEmail.classList.remove("hidden");
      els.stepPassword.classList.add("hidden");
      setStatus("");
      setTimeout(() => els.email && els.email.focus(), 0);
      return;
    }

    els.stepEmail.classList.add("hidden");
    els.stepPassword.classList.remove("hidden");
    setStatus("");
    setTimeout(() => els.password && els.password.focus(), 0);
  }

  function applyMedia() {
    // Background
    els.bgImage.classList.add("hidden");
    els.bgVideo.classList.add("hidden");
    if (MEDIA.background.type === "image" && MEDIA.background.src) {
      els.bgImage.src = MEDIA.background.src;
      els.bgImage.classList.remove("hidden");
    }
    if (MEDIA.background.type === "video" && MEDIA.background.src) {
      els.bgVideo.src = MEDIA.background.src;
      els.bgVideo.classList.remove("hidden");
    }

    // Brand
    els.brandImage.classList.add("hidden");
    els.brandVideo.classList.add("hidden");
    if (MEDIA.brand.type === "image" && MEDIA.brand.src) {
      els.brandImage.src = MEDIA.brand.src;
      els.brandImage.classList.remove("hidden");
    }
    if (MEDIA.brand.type === "video" && MEDIA.brand.src) {
      els.brandVideo.src = MEDIA.brand.src;
      els.brandVideo.classList.remove("hidden");
    }
  }

  function onContinueFromEmail() {
    const email = normalizeEmail(els.email.value);
    if (!validateEmail(email)) {
      setStatus("Adresse e-mail invalide.", true);
      return;
    }
    goStep(2);
  }

  function onLogin() {
    const email = normalizeEmail(els.email.value);
    const pwd = (els.password.value || "").trim();

    if (!validateEmail(email)) { setStatus("Adresse e-mail invalide.", true); goStep(1); return; }
    if (pwd.length < 6) { setStatus("Mot de passe trop court.", true); return; }

    // Placeholder: plug Supabase here later.
    setStatus("Connexion…");
    setTimeout(() => setStatus("Connecté (UI test)."), 500);
  }

  // Events
  els.arrowEmail.addEventListener("click", onContinueFromEmail);
  els.arrowPassword.addEventListener("click", onLogin);

  els.email.addEventListener("keydown", (e) => {
    if (e.key === "Enter") onContinueFromEmail();
  });
  els.password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") onLogin();
  });

  els.forgot.addEventListener("click", (e) => {
    e.preventDefault();
    setStatus("Mot de passe oublié: à brancher.", false);
  });

  els.create.addEventListener("click", (e) => {
    e.preventDefault();
    setStatus("Créer un compte: à brancher.", false);
  });

  // Init
  applyMedia();
  goStep(1);
})();
