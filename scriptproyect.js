/**
 * scriptproyect.js - ROAN CONTRATISTAS S.A.C.
 * Manejo de animaciones para la galería de proyectos
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selección de todos los elementos de la galería
    const projectItems = document.querySelectorAll('.gallery-item-static');

    // 2. Configuración del Observador (Intersection Observer)
    // Esto detecta cuando el usuario hace scroll y llega a la imagen
    const appearanceOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceOnScroll = new IntersectionObserver(function(entries, appearanceOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Añadimos una clase de CSS para la animación
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                appearanceOnScroll.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, appearanceOptions);

    // 3. Inicialización de los elementos (Estado inicial invisible)
    projectItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "all 0.6s ease-out";
        appearanceOnScroll.observe(item);
    });

    // 4. Log para confirmar que el script cargó correctamente
    console.log("Galería de proyectos inicializada correctamente.");
});