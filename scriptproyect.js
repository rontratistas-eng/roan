/**
 * scriptproyect.js - ROAN CONTRATISTAS S.A.C.
 * Versión LEAFLET (Gratuita)
 */

// ... mantén aquí tu código original de las animaciones (IntersectionObserver) ...

function initMapLeaflet() {
    // 1. Centro del mapa (Trujillo / La Esperanza)
    const centroTrujillo = [-8.0837, -79.0550];

    // 2. Crear el mapa
    const map = L.map('map-proyectos').setView(centroTrujillo, 13);

    // 3. Cargar las capas de diseño (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 4. Base de datos de proyectos
    const obras = [
        {
            nombre: "Av. Egipto - II Etapa",
            pos: [-8.073922, -79.055225],
            foto: "imagenes/BROCHURE/Egipto/imagen03.png",
            descripcion: "Infraestructura Vial"
        },
        {
            nombre: "Av. Tahuantinsuyo",
            pos: [-8.075851, -79.047140],
            foto: "imagenes/TAHUANTINSUYO/imagen01.png",
            descripcion: "Pistas y veredas"
        },
        {
            nombre: "Manuel Arévalo III Etapa",
            pos: [-8.069400, -79.071689],
            foto: "imagenes/BROCHURE/manuelarevaloIIIetapa/imagen01.png",
            descripcion: "Movilidad Urbana"
        },
        {
            nombre: "Calle José Félix Aldao",
            pos: [-8.081939, -79.036162],
            foto: "imagenes/BROCHURE/FelixAldao/imagen05.png",
            descripcion: "Mejoramiento Vial"
        },
        {
            nombre: "Subestación Buenos Aires",
            pos: [-8.138354, -79.047270],
            foto: "imagenes/BROCHURE/BuenosAires/Imangen01.png",
            descripcion: "Infraestructura Eléctrica"
        },
        {
            nombre: "Proyecto Huamachuco",
            pos: [-7.8135, -78.0485],
            foto: "imagenes/BROCHURE/Humachuco/imagen.png",
            descripcion: "Saneamiento Integral"
        },
        {
            nombre: "Polideportivo Los Pinos",
            pos: [-8.048737, -79.051780], // Ubicación en La Esperanza alta
            foto: "imagenes/BROCHURE/LosPinos_Esperanza/Imagen1.png",
            descripcion: "Infraestructura Deportiva"
        },
        {
            nombre: "Plazuela Iquitos",
            pos: [-8.111325, -79.025962], // Ubicación exacta en Trujillo centro
            foto: "imagenes/BROCHURE/trujillo_plazuela_iquitos/imagen06.png",
            descripcion: "Remodelación Urbana"
        },
        {
            nombre: "Instituto Regional de Oftalmología (IRO)",
            pos: [-8.113040, -79.048398], // Ubicación en Av. Mansiche, Trujillo
            foto: "imagenes/IRO/FOTOS/WhatsApp Image 2023-04-03 at 9.53.18 AM (3).jpeg",
            descripcion: "Remodelación Hospitalaria"
        },
        {
            nombre: "Parque Recreativo Castilla",
            pos: [-5.194496, -80.621666], // Coordenadas en Castilla, Piura
            foto: "imagenes/Castilla_PIURA/Castilla1/imagen12.png",
            descripcion: "Infraestructura Recreativa"
        },
        {
            nombre: "Infraestructura Vial Ferreñafe",
            pos: [-6.634528, -79.797857], // Coordenadas en Ferreñafe, Lambayeque
            foto: "imagenes/FERREÑAFE/imagen12.png",
            descripcion: "Pistas y Veredas"
        }
    ];

    // 5. Agregar marcadores al mapa
    obras.forEach(obra => {
        const popupContent = `
            <div class="info-window-card">
                <h3 style="margin:0 0 5px 0; font-size:14px; color:#0a1a35;">${obra.nombre}</h3>
                <img src="${obra.foto}" style="width:100%; height:100px; object-fit:cover; border-radius:5px; margin-bottom:5px;">
                <p style="margin:0; font-size:12px; color:#e31e24; font-weight:bold;">${obra.descripcion}</p>
            </div>
        `;

        L.marker(obra.pos).addTo(map)
            .bindPopup(popupContent);
    });
}
