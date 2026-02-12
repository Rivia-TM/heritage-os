/* HERITAGE_AUTH_PACK:1770924906051295522 */
(function () {
  function pickClient() {
    // If index.html already creates a client, we reuse it.
    const names = ['supabaseClient', 'sb', 'client', 'supabase_client', 'SUPABASE'];
    for (const n of names) {
      try {
        const v = (typeof window !== "undefined") ? window[n] : null;
        if (v && v.auth && typeof v.auth.getSession === "function") return v;
      } catch (e) {}
    }

    // Some setups expose "supabase" namespace (with createClient), not the client.
    try {
      if (window.supabase && window.supabase.auth && typeof window.supabase.auth.getSession === "function") {
        return window.supabase;
      }
    } catch(e) {}

    // If they only expose namespace: window.supabase.createClient(url,key), we need url/key.
    // We DON'T invent keys. If your client isn't created, your index.html config is missing.
    return null;
  }

  async function requireAuth(redirectTo) {
    const sb = pickClient();
    if (!sb) throw new Error("Supabase client introuvable. Vérifie que index.html initialise bien supabase.createClient(url, anonKey).");
    const { data } = await sb.auth.getSession();
    const session = data && data.session;
    if (!session) {
      window.location.href = redirectTo || "/index.html";
      return null;
    }
    return { sb, session };
  }

  function qs(sel) { return document.querySelector(sel); }
  function setText(sel, txt) { const el = qs(sel); if (el) el.textContent = txt; }
  function setHint(txt) { setText("#hint", txt); }

  window.HERITAGE = {
    pickClient,
    requireAuth,
    qs,
    setHint,
    setText,
  };
})();
