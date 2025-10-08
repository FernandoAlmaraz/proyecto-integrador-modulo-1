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
function generarColorHex() {
  const letras = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generarPaleta() {
  const contenedor = document.getElementById("contenedorColores");
  contenedor.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = generarColorHex();
    const div = document.createElement("div");
    div.className = "color-item";
    div.style.backgroundColor = color;
    div.textContent = color;
    div.onclick = () => {
      navigator.clipboard.writeText(color).catch(() => {});
      alert(`Color copiado: ${color}`);
    };
    contenedor.appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnPaleta = document.getElementById("btnPaleta");
  if (btnPaleta) btnPaleta.addEventListener("click", generarPaleta);
});