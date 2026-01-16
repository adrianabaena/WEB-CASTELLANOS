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


// ===============================
// SCROLL 3D MOCASÍN (GSAP)
// ===============================
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
      // markers: true // ← descomenta SOLO si quieres debug
    },
    onUpdate: () => {
      frameElement.src = currentFrame(
        Math.round(animationState.frame)
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#historia");
  if (!section) return;

  const scrollArea = section.querySelector(".historia-scroll");
  const imgs = section.querySelectorAll(".photo-stack__img");

  // puntos de activación repartidos
  const thresholds = Array.from({ length: imgs.length }, (_, i) =>
    (i + 1) / (imgs.length + 1)
  );

  function updateStack() {
    const rect = section.getBoundingClientRect();

    // si está lejos de la pantalla, no hace nada
    if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

    const vh = window.innerHeight;
    const scrollAreaHeight = scrollArea.offsetHeight;

    const progress = Math.min(
      1,
      Math.max(0, (-rect.top) / (scrollAreaHeight - vh))
    );

    imgs.forEach((img, i) => {
      img.classList.toggle("is-active", progress >= thresholds[i]);
    });
  }

  updateStack();
  window.addEventListener("scroll", updateStack, { passive: true });
  window.addEventListener("resize", updateStack);
});
