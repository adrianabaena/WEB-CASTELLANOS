document.addEventListener("DOMContentLoaded", () => {
  console.log("Web Castellano 1920 cargada correctamente");
});


const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu--light');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

