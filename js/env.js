/**
 * Runtime env loader (reads meta tags or localStorage)
 */
(function () {
  function meta(name) {
    var el = document.querySelector('meta[name="' + name + '"]');
    return el ? el.getAttribute("content") : "";
  }

  var w = window;
  w.__ENV = w.__ENV || {};
  w.__ENV.SUPABASE_URL =
    w.__ENV.SUPABASE_URL ||
    meta("supabase-url") ||
    localStorage.getItem("SUPABASE_URL") ||
    "";

  w.__ENV.SUPABASE_ANON_KEY =
    w.__ENV.SUPABASE_ANON_KEY ||
    meta("supabase-anon") ||
    localStorage.getItem("SUPABASE_ANON_KEY") ||
    "";
})();
