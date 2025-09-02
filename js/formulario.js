document.addEventListener('DOMContentLoaded', function() {
    // --- CÓDIGO PARA EL BOTÓN DE CORREO (SUBMIT) ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const recipientEmail = 'contacto@clustervalledeatlixco.mx';
        const subject = 'Mensaje de Contacto desde clustervalledeatlixco.mx';
        const body = `Hola, mi nombre es ${name}.\n\nMi correo es: ${email}\nMi teléfono es: ${phone}\n\nEscribo para...`;

        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });

    // --- NUEVO CÓDIGO PARA EL BOTÓN DE WHATSAPP ---
    const whatsappBtn = document.getElementById('whatsappBtn');
    whatsappBtn.addEventListener('click', function(event) {
        // Prevenimos que el enlace se abra inmediatamente
        event.preventDefault();

        // Obtenemos los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Verificamos si los campos requeridos están llenos
        if (!name || !email || !phone) {
            alert('Por favor, completa todos los campos antes de enviar por WhatsApp.');
            return; // Detenemos la ejecución si falta algún campo
        }

        // Número de teléfono de destino (sin el '+' o '00')
        const targetPhone = '5212227091191'; // Asegúrate de que este es el número correcto

        // Creamos el mensaje para WhatsApp
        const whatsappMessage = `Hola, mi nombre es ${name}.\nMi correo es: ${email}\nMi teléfono es: ${phone}\n\nEscribo para..`;

        // Creamos el enlace de WhatsApp completo
        const whatsappLink = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;

        // Abrimos el enlace en una nueva pestaña
        window.open(whatsappLink, '_blank');
    });
});