

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        // Prevenimos que el formulario se envíe de la forma tradicional
        event.preventDefault();

        // Obtenemos los valores de los campos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Correo de destino
        const recipientEmail = 'contacto@clustervalledeatlixco.mx';
        // Asunto del correo
        const subject = 'Mensaje de Contacto desde clustervalledeatlixco.mx';
        // Cuerpo del correo con los datos del formulario
        const body = `Hola, mi nombre es ${name}.\n\nMi correo es: ${email}\nMi teléfono es: ${phone}\n\nEscribo para...`;

        // Creamos el enlace mailto completo
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Abrimos el cliente de correo del usuario
        window.location.href = mailtoLink;
    });
});
