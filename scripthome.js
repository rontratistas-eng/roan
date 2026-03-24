/**
 * PROYECTO: ROAN CONTRATISTAS S.A.C.
 * Archivo: scripthome.js
 * Descripción: Control de slider, estadísticas, menú móvil y chatbot (RoanBot).
 */

// 1. INICIALIZACIÓN DE SERVICIOS EXTERNOS (EmailJS)
if (typeof emailjs !== 'undefined') {
    emailjs.init("zUjP_VL_nyG5sRC4Z");
}

// --- CONFIGURACIÓN GLOBAL DEL CHAT ---
const WHATSAPP_NUM = "51947216423"; 
let flowState = "inicio"; 
let userData = {};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 2. HERO SLIDER AUTOMÁTICO ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000;

    function nextHeroSlide() {
        if(slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    if (slides.length > 0) {
        setInterval(nextHeroSlide, slideInterval);
    }

    // --- 3. CONTADOR ANIMADO (ESTADÍSTICAS) ---
    const stats = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateStats = () => {
        stats.forEach(stat => {
            const updateCount = () => {
                const target = +stat.getAttribute('data-target');
                const count = +stat.innerText;
                const inc = target / speed;

                if (count < target) {
                    stat.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.querySelector('.stats-bar');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) statObserver.observe(statsSection);

    // --- 4. MENÚ MÓVIL Y DROPDOWNS (CORREGIDO PARA TODOS LOS APARTADOS) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Selector universal para todos los menús desplegables (Nosotros, Experiencia, etc.)
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(drop => {
        const trigger = drop.querySelector('a'); // El enlace principal (ej. "Nosotros")

        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                // Si el submenú NO está abierto, bloqueamos la navegación para abrirlo
                if (!drop.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Cerramos otros por si acaso
                    dropdowns.forEach(d => { if(d !== drop) d.classList.remove('active'); });

                    drop.classList.add('active');

                    // Rotación de flecha
                    const icon = this.querySelector('.fa-chevron-down');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                } 
                // Si ya está abierto y vuelven a clickear el nombre, lo cerramos
                else {
                    drop.classList.remove('active');
                    const icon = this.querySelector('.fa-chevron-down');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Cerrar todo al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                dropdowns.forEach(d => d.classList.remove('active'));
                const icon = menuToggle.querySelector('i');
                if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
            }
        }
    });

    // --- 5. TABS DEL CHATBOT ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-tab');
            const targetContent = document.getElementById(target);

            if (targetContent) {
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });

                this.classList.add('active');
                targetContent.classList.add('active');
                targetContent.style.setProperty('display', 'flex', 'important'); 

                if (target === 'chat-content') {
                    const box = document.getElementById('chat-box');
                    if (flowState === "inicio" && box && box.children.length === 0) { 
                        procesarFlujo("", box); 
                    } else if (box) {
                        box.scrollTop = box.scrollHeight;
                    }
                }
            }
        });
    });

    // --- 6. EFECTOS DEL HEADER AL HACER SCROLL ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(10, 26, 53, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '10px 0';
            header.style.backgroundColor = '#0a1a35';
            header.style.boxShadow = 'none';
        }
    });

    // --- 7. GALERÍA INFINITA ---
    const track = document.querySelector('.gallery-track');
    if (track) {
        const items = Array.from(track.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }
});

// --- FUNCIONES DEL CHATBOT ---

function toggleChat() {
    const chat = document.getElementById('chat-container');
    if(chat) {
        const currentDisplay = window.getComputedStyle(chat).display;
        chat.style.display = (currentDisplay === 'none') ? 'flex' : 'none';
    }
}

function minimizeChat(e) {
    if (e) e.stopPropagation();
    const chat = document.getElementById('chat-container');
    if (chat) {
        chat.classList.toggle('minimized');
        const icon = e.currentTarget.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-minus');
            icon.classList.toggle('fa-plus');
        }
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    if (!input || !box) return;

    const text = input.value.trim();
    if (text === "") return;

    box.innerHTML += `<div class="msg-user" style="align-self: flex-end; background: #e31e24; color: white; padding: 8px 12px; border-radius: 10px; margin: 5px 0; font-size: 13px; max-width: 80%;">${text}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;

    setTimeout(() => { procesarFlujo(text, box); }, 600);
}

function procesarFlujo(text, box) {
    let htmlRespuesta = "";

    if (flowState === "inicio") {
        htmlRespuesta = `Hola, soy RoanBot. Para ayudarte mejor, selecciona una opción:
            <div class="chat-options" style="display:flex; flex-direction:column; gap:5px; margin-top:10px;">
                <button class="opt-btn" onclick="setFlow('trabajo')">💼 Trabajar en ROAN</button>
                <button class="opt-btn" onclick="setFlow('cotizar')">🏗️ Cotizar Proyecto</button>
                <button class="opt-btn" onclick="setFlow('whatsapp')">🎧 Servicio al Cliente</button>
            </div>`;
    } 
    else if (flowState === "pidiendo_nombre") {
        userData.nombre = text;
        flowState = "pidiendo_correo";
        htmlRespuesta = `Gracias ${text}. Ahora ingresa tu <strong>Correo</strong>:`;
    } 
    else if (flowState === "pidiendo_correo") {
        userData.correo = text;
        flowState = "pidiendo_tel";
        htmlRespuesta = `¿A qué <strong>Teléfono</strong> podemos contactarte?`;
    }
    else if (flowState === "pidiendo_tel") {
        userData.tel = text;
        flowState = "finalizado";
        if(userData.tipo === "trabajo") {
            htmlRespuesta = `Perfecto. Indica tu área:<br>
                <div class="chat-options" style="display:flex; flex-direction:column; gap:5px; margin-top:10px;">
                    <button class="opt-btn" onclick="enviarFinal('Ingeniería')">Ingeniería</button>
                    <button class="opt-btn" onclick="enviarFinal('Operativo')">Operativo</button>
                    <button class="opt-btn" onclick="enviarFinal('Logística')">Logística</button>
                </div>`;
        } else {
            htmlRespuesta = `¡Datos recibidos! Describe brevemente tu proyecto para finalizar:`;
        }
    }
    else if (flowState === "finalizado") {
        enviarFinal(text);
        return;
    }

    if (htmlRespuesta) {
        box.innerHTML += `<div class="msg-bot" style="align-self: flex-start; background: #f1f1f1; padding: 8px 12px; border-radius: 10px; margin: 5px 0; font-size: 13px; max-width: 85%;">${htmlRespuesta}</div>`;
        box.scrollTop = box.scrollHeight;
    }
}

function setFlow(tipo) {
    const box = document.getElementById('chat-box');
    if (!box) return;
    
    if (tipo === 'whatsapp') {
        window.open(`https://wa.me/${WHATSAPP_NUM}?text=Hola, deseo comunicarme con soporte.`, '_blank');
    } else {
        userData.tipo = tipo;
        flowState = "pidiendo_nombre";
        box.innerHTML += `<div class="msg-bot" style="align-self: flex-start; background: #f1f1f1; padding: 8px 12px; border-radius: 10px; margin: 5px 0; font-size: 13px;">Elegiste ${tipo === 'trabajo' ? 'Trabajar en ROAN' : 'Cotizar Proyecto'}. Ingresa tu <strong>Nombre Completo</strong>:</div>`;
    }
    box.scrollTop = box.scrollHeight;
}

function enviarFinal(detalle) {
    userData.area = detalle; 
    userData.asunto_dinamico = (userData.tipo === 'trabajo') ? "TRABAJAR EN ROAN" : "COTIZAR PROYECTO";

    const box = document.getElementById('chat-box');
    box.innerHTML += `<div class="msg-bot" style="background:#fff3cd; padding: 8px 12px; border-radius: 10px; font-size: 13px;">🚀 Enviando solicitud a ROAN...</div>`;
    box.scrollTop = box.scrollHeight;

    if (typeof emailjs !== 'undefined') {
        emailjs.send("service_bppuqqg", "template_gruoayw", userData)
            .then(() => {
                box.innerHTML = `<div class="msg-bot" style="background:#d4edda; color:#155724; padding: 12px; border-radius: 10px; font-size: 13px; text-align:center;"><strong>¡Éxito!</strong> Solicitud enviada correctamente. Nos contactaremos pronto.</div>`;
                flowState = "inicio";
                userData = {};
            }, (err) => {
                box.innerHTML += `<div class="msg-bot" style="background:#f8d7da; padding: 8px 12px; border-radius: 10px; font-size: 13px;">Error al enviar. Por favor contacta por WhatsApp.</div>`;
            });
    }
}