document.addEventListener("DOMContentLoaded", () => {
  console.log("Web Castellano 1920 cargada correctamente");
});


const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu--light');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// carrousel historia
(function () {
  const imgs = document.querySelectorAll(".photo-stack__img");
  if (!imgs.length) return;

  const stepMs = 1100;  // ritmo de aparición
  const fadeMs = 450;   // suavidad del reset

  let i = 0;

  function showNext() {
    // si ya están todas visibles, hacemos reset suave y volvemos a la 1
    if (i >= imgs.length) {
      // fade out rápido
      imgs.forEach(img => {
        img.style.transitionDuration = fadeMs + "ms";
        img.classList.remove("is-visible");
      });

      // volvemos al inicio
      i = 0;

      // restauramos transición y continuamos
      setTimeout(() => {
        imgs.forEach(img => (img.style.transitionDuration = ""));
        // arrancamos mostrando la primera otra vez
        showNext();
      }, fadeMs + 80);

      return;
    }

    // mostrar siguiente imagen (se queda apilada)
    imgs[i].classList.add("is-visible");
    i++;

    setTimeout(showNext, stepMs);
  }

  // estado inicial
  imgs.forEach(img => img.classList.remove("is-visible"));
  i = 0;

  setTimeout(showNext, 250);
})();