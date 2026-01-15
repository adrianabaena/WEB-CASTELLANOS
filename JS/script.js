document.addEventListener("DOMContentLoaded", () => {
  console.log("Web Castellano 1920 cargada correctamente");

  // Safe navigation: sólo añadir el listener si los elementos existen
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu--light');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});

// carrousel historia
// --- Galería Artesanía (stack + zoom al centro) ---
if (document.querySelector(".gallery") && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".gallery .card");

  const ACTIVE_SCALE =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--activeScale")) || 1.07;

  const BASE_SCALE =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--baseScale")) || 0.96;

  const clamp = (min, max, v) => Math.min(max, Math.max(min, v));

  // Rotación leve (opcional, estilo editorial)
  cards.forEach((card, i) => {
    const rot = (i % 2 === 0 ? -1 : 1) * gsap.utils.random(0.6, 1.4);
    gsap.set(card, { rotate: rot, transformOrigin: "50% 55%" });
  });

  function updateCards() {
    const viewportCenter = window.scrollY + window.innerHeight / 2;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardTop = window.scrollY + rect.top;
      const cardCenter = cardTop + rect.height / 2;

      const dist = Math.abs(cardCenter - viewportCenter);
      const norm = clamp(0, 1, dist / (window.innerHeight * 0.55));

      const t = 1 - norm;
      const ease = t * t * (3 - 2 * t); // smoothstep

      const scale = gsap.utils.interpolate(BASE_SCALE, ACTIVE_SCALE, ease);
      const opacity = gsap.utils.interpolate(0.82, 1, ease);
      const z = Math.round(ease * 100);

      gsap.set(card, { scale, opacity, zIndex: z });
    });
  }

  ScrollTrigger.create({
    start: 0,
    end: () => document.body.scrollHeight - window.innerHeight,
    onUpdate: updateCards
  });

  updateCards();

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
    updateCards();
  });
}
