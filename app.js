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
});
