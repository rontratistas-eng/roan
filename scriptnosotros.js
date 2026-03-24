document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES PRINCIPALES
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    // Seleccionamos los enlaces que tienen submenús (clase .dropdown)
    const dropdowns = document.querySelectorAll('.dropdown > a');

    // 2. LÓGICA DEL MENÚ HAMBURGUESA (ABRIR/CERRAR)
    if(mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic cierre el menú inmediatamente
            navLinks.classList.toggle('active');
        });
    }

    // 3. CORRECCIÓN PARA MÓVIL: DESPLEGAR SUBMENÚS (NOSOTROS / EXPERIENCIA)
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            // Solo se activa en pantallas menores a 992px (ajusta según tu CSS)
            if (window.innerWidth <= 992) {
                e.preventDefault(); // Evita que el enlace recargue la página
                const parent = dropdown.parentElement;
                
                // Cerramos otros submenús abiertos para que no se amontonen
                document.querySelectorAll('.dropdown').forEach(other => {
                    if (other !== parent) other.classList.remove('open');
                });

                // Abrir/Cerrar el actual
                parent.classList.toggle('open');
            }
        });
    });

    // 4. CERRAR MENÚ AL HACER CLIC FUERA (PARA MEJOR UX)
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('active');
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        }
    });

    // 5. EFECTO DE APARICIÓN SUAVE (SCROLL REVEAL)
    const reveals = document.querySelectorAll('.reveal, .map-card');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    function scrollReveal() {
        reveals.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Ejecutar una vez al cargar por si ya hay elementos visibles

    // 6. INYECTAR ESTILOS CRÍTICOS PARA EL DESPLIEGUE MÓVIL
    const style = document.createElement('style');
    style.innerHTML = `
        /* Estilos de Revelación */
        .reveal { opacity: 0; transform: translateY(30px); transition: 0.8s all ease; }
        .reveal.active { opacity: 1; transform: translateY(0); }
        
        /* Estilos de Tarjetas */
        .map-card { transition: 0.5s; }
        .map-card:hover { background: #0a1a35; color: white; }
        .map-card:hover p { color: #ccc; }
        .map-card:hover h3 { color: #e31e24; }

        /* Ajustes para Submenús en Móvil */
        @media (max-width: 992px) {
            .dropdown-content { 
                display: none; 
                list-style: none; 
                padding-left: 15px;
                background: rgba(0,0,0,0.05);
            }
            /* Cuando el JS añade 'open', mostramos el contenido */
            .dropdown.open > .dropdown-content { 
                display: block !important; 
            }
            /* Rotar flechita si tienes una */
            .dropdown.open > a::after {
                transform: rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);
});