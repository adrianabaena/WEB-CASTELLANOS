document.addEventListener("DOMContentLoaded", () => {
  console.log("Web Castellano 1920 cargada correctamente");

  // Safe navigation: sólo añadir el listener si los elementos existen
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu--light');
  const header = document.querySelector('.header');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  if (header) {
    const stickyOffset = 80;

    window.addEventListener('scroll', () => {
      if (window.scrollY > stickyOffset) {
        header.classList.add('header--sticky');
      } else {
        header.classList.remove('header--sticky');
      }
    });
  }
});

// carrousel historia
document.querySelectorAll(".gif-card").forEach(card => {
  const video = card.querySelector(".gif-video");
  if (!video) return;

  card.addEventListener("mouseenter", () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });

  // móvil: tap
  card.addEventListener("touchstart", () => {
    if (video.paused) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, { passive: true });
});
