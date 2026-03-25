document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES PRINCIPALES
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    // Seleccionamos los enlaces que tienen submenús (clase .dropdown)
    const dropdowns = document.querySelectorAll('.dropdown > a');


    // 6. INYECTAR ESTILOS CRÍTICOS PARA EL DESPLIEGUE MÓVIL
    const style = document.createElement('style');
    style.innerHTML = `
        /* Estilos de Revelación */

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
