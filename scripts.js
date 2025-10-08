// 1. Función declarativa
function cuadrado(x) {
    return x * x;
}

function mostrarCuadrado() {
    const numero = document.getElementById('numeroCuadrado').value;
    const resultado = cuadrado(numero);
    document.getElementById('resultadoCuadrado').innerHTML = 
        `El cuadrado de ${numero} es ${resultado}`;
}

// 2. Función expresiva
const potencia = function(base, exponente) {
    let resultado = 1;
    for (let i = 0; i < exponente; i++) {
        resultado *= base;
    }
    return resultado;
};

function mostrarPotencia() {
    const base = document.getElementById('base').value;
    const exponente = document.getElementById('exponente').value;
    const resultado = potencia(base, exponente);
    document.getElementById('resultadoPotencia').innerHTML = 
        `${base} elevado a ${exponente} = ${resultado}`;
}

// 3. Arrow function
const dividir = (a, b) => a / b;

function mostrarDivision() {
    const dividendo = document.getElementById('dividendo').value;
    const divisor = document.getElementById('divisor').value;
    const resultado = dividir(dividendo, divisor);
    document.getElementById('resultadoDivision').innerHTML = 
        `${dividendo} ÷ ${divisor} = ${resultado.toFixed(2)}`;
}

// 4. Función anidada
function humus(factor) {
    const ingrediente = (cantidad, unidad, nombre) => {
        const mensaje = `${cantidad * factor} ${unidad} de ${nombre}<br>`;
        document.getElementById('resultadoHummus').innerHTML += mensaje;
    };
    
    document.getElementById('resultadoHummus').innerHTML = '';
    ingrediente(1, "lata", "garbanzos");
    ingrediente(0.5, "taza", "tahini");
    ingrediente(2, "cucharadas", "limón");
}

function prepararHummus() {
    humus(4);
}

// 5. Scope
function probarScope() {
    let x = "global";
    let resultado = '';

    function prueba() {
        let x = "local";
        resultado += `Dentro: ${x}<br>`;
    }

    prueba();
    resultado += `Fuera: ${x}`;
    document.getElementById('resultadoScope').innerHTML = resultado;
}

// 6. Factorial (recursividad)
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularFactorial() {
    const numero = document.getElementById('numeroFactorial').value;
    const resultado = factorial(numero);

    document.getElementById('resultadoFactorial').innerHTML = 
        `${numero}! = ${resultado}`;
}

// Función para cambiar secciones
function cambiarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.boton-menu').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(seccionId).classList.add('active');
    event.target.classList.add('active');
}

// Ejemplo 1: Obtener Personaje Aleatorio (Promesas)
function obtenerPersonajeAleatoria() {
    const id = document.getElementById('personajeID').value;
    fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('No se pudieron obtener los personajes');
            return response.json();
        })
        .then(data => {
            const character = data;
            const html = `
                <h3>${character.name}</h3>
                <p>Ocupación: ${character.occupation}</p>
                <p>Frases: ${character.phrases}</p>
                <img src="https://cdn.thesimpsonsapi.com/500${character.portrait_path}" alt="${character.name}" class="img-simpson">
            `;
            document.getElementById('simpsonQuoteResult').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('simpsonQuoteResult').innerHTML = `Error: ${error.message}`;
        });
}

// Ejemplo 2: Obtener Varios Personajes (Async/Await)
async function obtenerVariasCitas() {
    const numCharacters = parseInt(document.getElementById('numCitas').value, 10);

    try {
        const response = await fetch('https://thesimpsonsapi.com/api/characters');
        if (!response.ok) throw new Error('No se pudieron obtener los personajes');

        const data = await response.json();
        const characters = data.results; // aquí está el array real de personajes

        // Fisher-Yates shuffle
        function shuffle(array) {
            let m = array.length, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                [array[m], array[i]] = [array[i], array[m]];
            }
            return array;
        }

        // Mezclar y cortar según numCharacters
        const selectedCharacters = shuffle([...characters]).slice(0, numCharacters);

        // Construir HTML
        let html = '<h3>Personajes de Los Simpsons:</h3>';
        selectedCharacters.forEach(character => {
            html += `
                <div class="ejemplo-api">
                    <h4>${character.name}</h4>
                    <p><strong>Ocupación:</strong> ${character.occupation || 'Desconocida'}</p>
                    <p><strong>Edad:</strong> ${character.age ?? 'N/A'} | <strong>Estado:</strong> ${character.status}</p>
                    <p><strong>Frases:</strong> ${character.phrases.length ? character.phrases.join(' / ') : 'Sin frases registradas'}</p>
                    <img src="https://cdn.thesimpsonsapi.com/500${character.portrait_path}" class="img-simpson">
                </div>
            `;
        });

        document.getElementById('simpsonQuotesResult').innerHTML = html;

    } catch (error) {
        document.getElementById('simpsonQuotesResult').innerHTML = `Error: ${error.message}`;
    }
}

// Ejemplo 3: Obtener Otro Personaje Aleatorio (Fetch + Then)
function otraCitaAleatoria() {
   fetch('https://thesimpsonsapi.com/api/characters')
        .then(response => {
            if (!response.ok) throw new Error('No se pudieron obtener los personajes');
            return response.json();
        })
        .then(data => {
            const characters = data.results; //
            const randomIndex = Math.floor(Math.random() * characters.length);
            const character = characters[randomIndex];

            document.getElementById('randomSimpsonQuote').innerHTML = `
                <h3>${character.name}</h3>
                <p><strong>Ocupación:</strong> ${character.occupation || 'Desconocida'}</p>
                <p><strong>Edad:</strong> ${character.age ?? 'N/A'} | <strong>Estado:</strong> ${character.status}</p>
                <p><strong>Frases:</strong> ${character.phrases.length ? character.phrases[0] : 'Sin frases registradas'}</p>
                <img src="https://cdn.thesimpsonsapi.com/500${character.portrait_path}" 
                     alt="${character.name}" class="img-simpson">
            `;
        })
        .catch(error => {
            document.getElementById('randomSimpsonQuote').innerHTML = `Error: ${error.message}`;
        });
}

// Ejemplo 4: Buscar Personaje por Nombre (Async/Await)
async function citaPorPersonaje() {
   const characterName = document.getElementById('simpsonCharacterName').value.trim().toLowerCase();

    try {
        const response = await fetch('https://thesimpsonsapi.com/api/characters');
        if (!response.ok) throw new Error('No se pudieron obtener los personajes');
        
        const data = await response.json();
        const characters = data.results; // 👈 el array está en results

        // Filtrar personajes cuyo nombre contenga el texto ingresado
        const foundCharacters = characters.filter(char => 
            char.name.toLowerCase().includes(characterName)
        );

        if (foundCharacters.length === 0) {
            document.getElementById('simpsonCharacterResult').innerHTML = `
                <p>No se encontraron personajes con el nombre "<strong>${characterName}</strong>"</p>
            `;
            return;
        }

        // Construir HTML con los resultados
        let html = `<h3>Resultados para "${characterName}":</h3>`;
        foundCharacters.forEach(character => {
            html += `
                <div class="ejemplo-api">
                    <h4>${character.name}</h4>
                    <p><strong>Ocupación:</strong> ${character.occupation || 'Desconocida'}</p>
                    <p><strong>Edad:</strong> ${character.age ?? 'N/A'} | <strong>Estado:</strong> ${character.status}</p>
                    <p><strong>Frases:</strong> ${character.phrases.length ? character.phrases.join(' / ') : 'Sin frases registradas'}</p>
                    <img src="https://cdn.thesimpsonsapi.com/500${character.portrait_path}" 
                         alt="${character.name}" class="img-simpson">
                </div>
            `;
        });

        document.getElementById('simpsonCharacterResult').innerHTML = html;

    } catch (error) {
        document.getElementById('simpsonCharacterResult').innerHTML = `Error: ${error.message}`;
    }
}