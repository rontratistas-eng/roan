document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPostulacion');
    const formContainer = document.querySelector('.form-container');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Captura de datos
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const telefono = document.getElementById('telefono').value;
            const area = document.getElementById('area_interes').value;
            const mensaje = document.getElementById('mensaje').value;
            const emailEmpresa = "cotratistasroan@gmail.com";

            // 2. Construcción de URL Gmail
            const asunto = encodeURIComponent(`Postulación: ${area} - ${nombre}`);
            const cuerpo = encodeURIComponent(
                `[RECUERDA ADJUNTAR TU CV EN PDF]\n\n` +
                `Estimado equipo de Recursos Humanos de ROAN CONTRATISTAS,\n\n` +
                `Deseo postular al área de ${area}. Mis datos:\n\n` +
                `- Nombre: ${nombre}\n` +
                `- Correo: ${correo}\n` +
                `- Teléfono: ${telefono}\n` +
                `- Mensaje: ${mensaje ? mensaje : 'Sin comentarios.'}\n\n` +
                `Adjunto mi CV para su revisión.\n\n` +
                `Atentamente,\n${nombre}`
            );

            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailEmpresa}&su=${asunto}&body=${cuerpo}`;

            // 3. Feedback y Limpieza
            const btn = form.querySelector('.btn-submit');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> REDIRIGIENDO...';
            btn.disabled = true;

            setTimeout(() => {
                // Abrir Gmail en pestaña nueva
                window.open(gmailUrl, '_blank');

                // LIMPIEZA: Resetear el formulario
                form.reset();

                // CAMBIO DE APARTADO: Reemplazar el formulario por un mensaje de éxito
                formContainer.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 40px; animation: fadeIn 0.8s;">
                        <i class="fas fa-check-circle" style="font-size: 50px; color: #2ecc71; margin-bottom: 20px;"></i>
                        <h2 style="color: #000;">¡SOLICITUD INICIADA!</h2>
                        <p style="margin-bottom: 25px;">Se ha abierto una nueva pestaña en Gmail para completar tu postulación.</p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #e31e24; text-align: left; margin-bottom: 25px;">
                            <small><strong>Nota:</strong> Si no ves la pestaña, asegúrate de permitir las ventanas emergentes (pop-ups) en tu navegador.</small>
                        </div>
                        <a href="index.html" class="btn-submit" style="text-decoration: none; display: inline-flex; width: auto; padding: 12px 30px;">
                            VOLVER AL INICIO
                        </a>
                    </div>
                `;
            }, 1000);
        });
    }
});