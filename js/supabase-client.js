/**
 * Supabase client bootstrap (CDN)
 * Requires: env.js loaded first
 */
(function () {
  var env = window.__ENV || {};
  var url = env.SUPABASE_URL || "";
  var key = env.SUPABASE_ANON_KEY || "";

  window.__sb_ready = false;

  function fail(msg) {
    console.error(msg);
    window.__sb_ready = false;
  }

  if (!url || !key) {
    fail("Supabase config missing: SUPABASE_URL / SUPABASE_ANON_KEY");
    return;
  }

  if (!window.supabase || !window.supabase.createClient) {
    fail("Supabase CDN not loaded: include @supabase/supabase-js in index.html before this file.");
    return;
  }

  window.supabaseClient = window.supabase.createClient(url, key);
  window.__sb_ready = true;
})();
