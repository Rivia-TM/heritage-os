(function(){
  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }

  // Only show debug blocks if ?debug=1
  function applyDebug(){
    var p = new URLSearchParams(location.search);
    var debug = p.get("debug")==="1";
    qsa("[data-debug-only]").forEach(function(n){
      n.style.display = debug ? "block" : "none";
    });
  }

  // Hide duplicate auth links outside our footer container
  function hideDupAuthLinks(){
    var footer = qs("#hos-footer");
    var allowed = new Set();
    if (footer){
      qsa("a[href]", footer).forEach(function(a){ allowed.add(a.getAttribute("href")); });
    }
    var targets = [
      "signup.html","creer-un-compte.html",
      "forgot.html","mot-de-passe-oublie.html"
    ];
    qsa("a[href]").forEach(function(a){
      var href = (a.getAttribute("href")||"").trim();
      if (!href) return;
      var isTarget = targets.some(function(t){ return href.indexOf(t) !== -1; });
      if (!isTarget) return;
      // if link is not inside footer, hide it
      if (!footer || !footer.contains(a)){
        a.classList.add("hos-hidden");
      }
    });
  }

  // Replace small card title "HÉRITAGE" with your logo if present
  function swapMiniBrand(){
    // We only target small headers inside cards, not the big hero logo.
    var logo = (window.HOS_LOGO_URL || "").trim();
    if (!logo) return;

    qsa(".card, [class*='card']").forEach(function(card){
      // find the first small-uppercase-ish element that contains "HÉRITAGE"
      var candidates = qsa("*", card).slice(0, 12);
      candidates.forEach(function(el){
        var t = (el.textContent||"").trim().toUpperCase();
        if (t === "HÉRITAGE" || t === "HERITAGE"){
          // Avoid touching big hero by checking size / context
          var rect = el.getBoundingClientRect();
          if (rect.height > 40) return;
          // Replace content once
          if (el.getAttribute("data-hos-swapped")==="1") return;
          el.setAttribute("data-hos-swapped","1");
          el.innerHTML = '<span class="hos-brand-mini"><img src="'+logo+'" alt="Logo"/></span>';
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    applyDebug();
    hideDupAuthLinks();
    swapMiniBrand();
  });
})();
