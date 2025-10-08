// Esperar a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Seleccionar los elementos del DOM que necesitamos
    const form = document.querySelector('#formulario-contacto');
    const feedbackMessage = document.querySelector('#mensaje-feedback');

    // 2. Añadir un "escuchador" de eventos para cuando se envíe el formulario
    form.addEventListener('submit', function(event) {
        // Prevenir que la página se recargue
        event.preventDefault(); 
        
        // 3. Lógica simple de validación
        const emailInput = document.querySelector('#email').value;
        if (emailInput === '') {
            feedbackMessage.textContent = 'Por favor, introduce tu email.';
            feedbackMessage.style.color = 'red';
        } else {
            feedbackMessage.textContent = `¡Gracias por tu mensaje, ${emailInput}!`;
            feedbackMessage.style.color = 'green';
            form.reset(); // Limpia el formulario
        }
    });
});
