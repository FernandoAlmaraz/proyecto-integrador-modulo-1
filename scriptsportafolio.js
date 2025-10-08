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
// Paleta
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
// TO - DO List

let tareas = [];

(function cargarTareasGuardadas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    if (Array.isArray(guardadas)) tareas = guardadas;
  } catch {}
  renderizarTareas();
})();

function guardarTareas() {
  try { localStorage.setItem('tareas', JSON.stringify(tareas)); } catch {}
}

function agregarTarea() {
  const input = document.getElementById("nuevaTarea");
  if (!input) return;
  const texto = (input.value || "").trim();
  if (!texto) {
    alert("Escribe una tarea antes de añadir.");
    return;
  }
  tareas.push({ text: texto, done: false });
  input.value = "";
  guardarTareas();
  renderizarTareas();
}

function eliminarTarea(index) {
  tareas.splice(index, 1);
  guardarTareas();
  renderizarTareas();
}

function toggleHecha(index, checked) {
  tareas[index].done = !!checked;
  guardarTareas();
  renderizarTareas();
}

function renderizarTareas() {
  const ul = document.getElementById("listaTareas");
  if (!ul) return;
  ul.innerHTML = "";

  if (tareas.length === 0) {
    ul.innerHTML = `<li class="todo-empty">No hay tareas. ¡Agrega la primera!</li>`;
    return;
  }

  tareas.forEach((t, i) => {
    ul.insertAdjacentHTML("beforeend", `
      <li class="todo-item">
        <input type="checkbox" class="todo-check" ${t.done ? "checked" : ""} onclick="toggleHecha(${i}, this.checked)">
        <span class="todo-text ${t.done ? "done" : ""}">${t.text}</span>
        <button class="todo-del" onclick="eliminarTarea(${i})">Eliminar</button>
      </li>
    `);
  });
}

// API

let epTimer;
function mostrarCargandoEp(mostrar = true, delay = 250) {
  const el = document.getElementById("loader-ep");
  if (!el) return;
  clearTimeout(epTimer);
  if (mostrar) {
    epTimer = setTimeout(() => { el.style.display = "block"; }, delay);
  } else {
    el.style.display = "none";
  }
}
function buildEpisodeImageHTML(imagePath, altText, size = 500) {
  if (!imagePath) return "";

  const fullURL = `https://cdn.thesimpsonsapi.com/${size}${imagePath}`;
  
  return `
    <img
      src="${fullURL}"
      alt="${altText}"
      class="img-episodio"
      loading="lazy"
      onerror="
        this.onerror=null;
        this.src='data:image/svg+xml;utf8,\
        <svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'480\\' height=\\'270\\'>\
          <rect width=\\'100%\\' height=\\'100%\\' fill=\\'#eee\\'/>\
          <text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'#888\\' font-family=\\'Arial\\' font-size=\\'16\\'>Imagen no disponible</text>\
        </svg>';
      "
    >
  `;
}

async function mostrarEpisodioPorId() {
  mostrarCargandoEp(true);

  const rawId = document.getElementById("episodioId")?.value;
  let id = parseInt(rawId, 10);
  if (!Number.isFinite(id) || id < 1) id = 1;

  const cont = document.getElementById("infoEpisodio");
  cont.innerHTML = "";

  try {
    const res = await fetch(`https://thesimpsonsapi.com/api/episodes/${id}`);
    if (!res.ok) throw new Error("No se pudo obtener el episodio");
    const data = await res.json();

    const title    = data.name || `Episodio #${id}`;
    const airDate  = data.airdate || "";
    const season   = data.season ?? "";
    const epnum    = data.episode_number ?? "";
    const synopsis = data.synopsis || "Sinopsis no disponible.";
    const imageTag = buildEpisodeImageHTML(data.image_path, title, 500);

    const meta = [
      season ? `Temporada: <strong>${season}</strong>` : "",
      epnum  ? `Episodio: <strong>${epnum}</strong>`   : "",
      airDate? `Emitido: <strong>${airDate}</strong>`  : ""
    ].filter(Boolean).join(" | ");

    cont.innerHTML = `
      <article class="episodio-card">
        <h3>${title}</h3>
        ${meta ? `<p class="episodio-meta">${meta}</p>` : ""}
        ${imageTag}
        <p>${synopsis}</p>
      </article>
    `;
  } catch (e) {
    cont.textContent = `Error: ${e.message}`;
  } finally {
    mostrarCargandoEp(false);
  }
}