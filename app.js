// Restaurante Ensigna — comportamiento del inicio

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  // Header fijo con fondo sólido al bajar
  const SCROLL_THRESHOLD = 40;

  function updateHeaderOnScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

  // Menú móvil
  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('is-active');
  }

  function toggleNav() {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.classList.toggle('is-active', isOpen);
  }

  navToggle.addEventListener('click', toggleNav);

  // Cierra el menú al elegir una sección o al agrandar la ventana
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeNav();
  });

  // Pestañas del menú
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.panel').forEach(p => { p.hidden = true; p.classList.remove('is-active'); });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    panel.hidden = false;
    panel.classList.add('is-active');
  }));

  // Galería con visor ampliado
  const box = document.getElementById('lightbox');
  const boxImg = box.querySelector('img');
  document.querySelectorAll('.shot').forEach(shot => shot.addEventListener('click', () => {
    boxImg.src = shot.dataset.full;
    boxImg.alt = shot.querySelector('img').alt;
    box.showModal();
  }));
  box.querySelector('.lightbox-close').addEventListener('click', () => box.close());
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
});
