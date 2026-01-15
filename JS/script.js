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
const items = document.querySelectorAll(".item");

items.forEach(item => {

  ScrollTrigger.create({
    trigger: item,
    start: "top center",
    end: "bottom center",
    scrub: true,
    onUpdate: self => {
      const progress = 1 - Math.abs(self.progress - 0.5) * 2;

      gsap.to(item, {
        scale: 0.9 + progress * 0.15,
        opacity: 0.7 + progress * 0.3,
        duration: 0.2,
        overwrite: true
      });
    }
  });

});