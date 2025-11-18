document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis({
    duration: 1.2,
  });

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});


(function(){
const carousel = document.getElementById('carousel');
const items = Array.from(carousel.querySelectorAll('.carousel-item'));
const videos = items.map(it => it.querySelector('video'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const GAP = 16;


// garantir todos pausados no início
videos.forEach(v => { v.pause(); v.removeAttribute('controls'); });
items.forEach(it => it.classList.add('paused'));


videos.forEach((v, idx) => {
const wrapper = items[idx];
v.addEventListener('click', () => {
if (v.paused) {
videos.forEach(other => { if (other !== v) other.pause(); items.forEach(i => i.classList.add('paused')); });
v.play().catch(err => console.warn('play falhou', err));
wrapper.classList.remove('paused');
// opcional: centralizar o item clicado
const left = wrapper.offsetLeft - (carousel.clientWidth/2) + (wrapper.clientWidth/2);
carousel.scrollTo({ left, behavior: 'smooth' });
} else {
v.pause();
wrapper.classList.add('paused');
}
});
v.addEventListener('play', () => wrapper.classList.remove('paused'));
v.addEventListener('pause', () => wrapper.classList.add('paused'));
});


function scrollByItem(direction = 1){
const first = items[0];
if (!first) return;
const itemWidth = first.getBoundingClientRect().width;
carousel.scrollBy({ left: direction * (itemWidth + GAP), behavior:'smooth' });
}
prevBtn.addEventListener('click', () => scrollByItem(-1));
nextBtn.addEventListener('click', () => scrollByItem(1));


// ao rolar manualmente, pausamos os videos após parar
let isScrolling;
carousel.addEventListener('scroll', () => {
window.clearTimeout(isScrolling);
isScrolling = window.setTimeout(() => { videos.forEach(v => v.pause()); items.forEach(i => i.classList.add('paused')); }, 150);
}, { passive:true });


// acessibilidade: setas do teclado
document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') scrollByItem(-1); if (e.key === 'ArrowRight') scrollByItem(1); });


})();

const carousel = document.getElementById("carousel");
const items = Array.from(carousel.children);
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let itemsPerPage = 3; // quantidade visível

function updateItemsPerPage() {
  const width = window.innerWidth;
  if (width <= 600) {
    itemsPerPage = 1;
  } else if (width <= 960) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 3;
  }
}

function updateCarousel() {
  const itemWidth = items[0].offsetWidth + 10; // largura + margem
  const offset = -(currentIndex * itemWidth);
  carousel.style.transform = `translateX(${offset}px)`;

  // Pausa todos os vídeos
  items.forEach((item) => item.querySelector("video").pause());
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1; // passa de 1 em 1
    updateCarousel();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex + itemsPerPage < items.length) {
    currentIndex += 1; // passa de 1 em 1
    updateCarousel();
  }
});

window.addEventListener("resize", () => {
  updateItemsPerPage();
  if (currentIndex + itemsPerPage > items.length) {
    currentIndex = Math.max(items.length - itemsPerPage, 0);
  }
  updateCarousel();
});

// Inicialização
updateItemsPerPage();
updateCarousel();



const carrossel = document.getElementById("carrosselImagens");
let position = 0;
const speed = 0.7;

function animar() {
  position -= speed;
  carrossel.style.transform = `translateX(${position}px)`;

  const resetPoint = carrossel.scrollWidth / 2;
  if (Math.abs(position) >= resetPoint) {
    position = 0;
  }

  requestAnimationFrame(animar);
}

// Evita que a transição cause delay no início
carrossel.style.willChange = "transform";
animar();

window.addEventListener("scroll", () => {
  const offset = window.pageYOffset;
  const bg = document.getElementById("parallax-bg");
  bg.style.transform = `translateY(${offset * 0.4}px)`;
});

document.addEventListener("DOMContentLoaded", function () {
  if (!window.gsap) {
    console.error("GSAP não carregou. Verifique o CDN.");
    return;
  }});


  