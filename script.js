// Menú móvil (patrón de la skill landing-negocio-general)
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  const closeNav = () => { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    if (open) { closeNav(); } else { toggle.setAttribute("aria-expanded", "true"); nav.classList.add("is-open"); }
  });
  nav.querySelectorAll("a").forEach((l) => l.addEventListener("click", closeNav));
  document.addEventListener("click", (e) => { if (!(toggle.closest("header") || document).contains(e.target)) closeNav(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });
});

// Scroll a anclas animado a mano (el smooth nativo se congela en clics reales)
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = id === "top" ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector(".site-header");
      const offset = header ? header.offsetHeight : 0;
      const to = id === "top" ? 0 : target.getBoundingClientRect().top + scrollY - offset;
      history.pushState(null, "", "#" + id);
      if (reduce) { scrollTo(0, to); return; }
      const from = scrollY, dist = to - from, start = performance.now(), dur = 600;
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        scrollTo(0, from + dist * ease(t));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
})();
