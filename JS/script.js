document.addEventListener("DOMContentLoaded", () => {
  console.log("Web Castellano 1920 cargada correctamente");
});


const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu--light');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

(function () {
    const imgs = document.querySelectorAll(".photo-stack__img");
    if (!imgs.length) return;

    const stepMs = 1100;     // cada cuánto aparece una nueva foto
    const holdMs = 1200;     // pausa cuando ya han aparecido todas
    const resetFadeMs = 350; // suavidad al resetear

    let i = 0;

    function resetStack() {
      imgs.forEach(img => img.classList.remove("is-visible"));
      i = 0;
    }

    function next() {
      if (i < imgs.length) {
        imgs[i].classList.add("is-visible");
        i++;
        setTimeout(next, stepMs);
        return;
      }

      setTimeout(() => {
        imgs.forEach(img => (img.style.transitionDuration = resetFadeMs + "ms"));
        resetStack();

        setTimeout(() => {
          imgs.forEach(img => (img.style.transitionDuration = ""));
          next();
        }, resetFadeMs + 80);
      }, holdMs);
    }

    resetStack();
    setTimeout(next, 250);
  })();