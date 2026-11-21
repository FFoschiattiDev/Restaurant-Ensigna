document.addEventListener("DOMContentLoaded", function() { // Esperamos a que toda la página HTML cargue antes de ejecutar el código

    // ==========================================
    // 1. CONFIGURACIÓN DE FECHA MÍNIMA (MÍNIMO MAÑANA)
    // ==========================================

    const inputFecha = document.getElementById("fecha");
    
    // Obtenemos la fecha de hoy y le sumamos 1 día
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);

    // Formateamos la fecha a "AAAA-MM-DD" que es el formato que pide HTML
    const anio = manana.getFullYear();
    const mes = String(manana.getMonth() + 1).padStart(2, '0');
    const dia = String(manana.getDate()).padStart(2, '0');
    const fechaMinima = `${anio}-${mes}-${dia}`;

    // Aplicamos esa fecha mínima al campo del calendario
    inputFecha.setAttribute("min", fechaMinima);


    // ==========================================
    // 2. MANEJO DEL FORMULARIO, FORMSPREE Y MODAL
    // ==========================================

    const formulario = document.getElementById("form-reserva");
    const modal = document.getElementById("modal-reserva");
    const btnCerrarModal = document.getElementById("btn-cerrar-modal");

    formulario.addEventListener("submit", async function(evento) {

        evento.preventDefault(); // Evitamos que la página se recargue o salga de tu web al enviar

        // Verificamos por seguridad que el navegador valide todos los campos 'required'
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        // Recopilamos todos los datos de los 7 campos (usando sus atributos 'name')
        const datosFormulario = new FormData(formulario);

        try {
            // Enviamos los datos a Formspree en segundo plano
            const respuesta = await fetch(formulario.action, {
                method: formulario.method,
                body: datosFormulario,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (respuesta.ok) {
                // Si Formspree recibió los datos bien:
                modal.style.display = "flex"; // 1. Mostramos el modal cambiando su display a 'flex' (para centrarlo)
                formulario.reset(); // 2. Limpiamos los campos del formulario
            } else { // Si hubo un fallo de conexión con el Fromspree:
                alert("Hubo un problema al enviar la reserva. Fallo de conexión con el backend.");
            }
        } catch (error) { // Si no se identifica un error conocido:
            alert("Error de conexión. Revisa tu internet e inténtalo de nuevo.");
        }
    });


    // ==========================================
    // 3. CERRAR EL MODAL AL HACER CLIC EN '¡Perfecto!'
    // ==========================================

    btnCerrarModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // También cerramos el modal si el usuario hace clic fuera del cuadro blanco
    window.addEventListener("click", function(evento) {
        if (evento.target === modal) {
            modal.style.display = "none";
        }
    });

    // ==========================================
    // 4. FUNCIONAMIENTO DE LA NAVBAR TANTO PARA CELULARES Y COMPUTADORAS.
    // ==========================================

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