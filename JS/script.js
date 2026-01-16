// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Web cargada correctamente");

  // ===============================
  // MENÚ HAMBURGUESA
  // ===============================
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu--light");
  const header = document.querySelector(".header");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
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


// ===============================
// GIF / VIDEO CARDS (HOVER + TAP)
// ===============================
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

  // Móvil: tap
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


const frameElement = document.getElementById("frame-sequence");

if (frameElement && typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  const frameCount = 71; // 0000 → 0070

  const currentFrame = (index) =>
    `MEDIA/3d/moc${String(index).padStart(4, "0")}.jpg`;

  // Precarga de imágenes
  const images = [];
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  const animationState = { frame: 0 };

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      gsap.to(animationState, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: "#mocasin3d",
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true
        },
        onUpdate: () => {
          frameElement.src = currentFrame(
            Math.round(animationState.frame)
          );
        }
      });
    },
    "(max-width: 767px)": function () {
      frameElement.src = currentFrame(0);
    }
  });
}
