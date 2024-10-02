// Palabras para el juego
const palabras = ['javascript', 'html', 'css', 'programacion', 'desarrollo', 'ahorcado'];
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
let intentosRestantes = 6;
let letrasAdivinadas = [];
let aciertos = Array(palabra.length).fill('_');

// Mostrar palabra oculta
function mostrarPalabra() {
    document.getElementById('palabra').textContent = aciertos.join(' ');
}

// Mostrar alfabeto
function mostrarAlfabeto() {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    const contenedorAlfabeto = document.getElementById('alfabeto');
    alfabeto.split('').forEach(letra => {
        const boton = document.createElement('button');
        boton.textContent = letra;
        boton.addEventListener('click', () => adivinarLetra(letra, boton));
        contenedorAlfabeto.appendChild(boton);
    });
}

// Adivinar letra
function adivinarLetra(letra, boton) {
    boton.disabled = true;
    if (letrasAdivinadas.includes(letra)) {
        return;
    }

    letrasAdivinadas.push(letra);

    if (palabra.includes(letra)) {
        // Reemplazar aciertos en la palabra oculta
        palabra.split('').forEach((char, index) => {
            if (char === letra) {
                aciertos[index] = letra;
            }
        });
    } else {
        intentosRestantes--;
    }

    actualizarJuego();
}

// Actualizar estado del juego
function actualizarJuego() {
    mostrarPalabra();
    document.getElementById('intentos').textContent = `Intentos restantes: ${intentosRestantes}`;
    document.getElementById('letras-adivinadas').textContent = `Letras adivinadas: ${letrasAdivinadas.join(', ')}`;

    // Verificar si ganó
    if (!aciertos.includes('_')) {
        document.getElementById('mensaje').textContent = '¡Felicidades, ganaste!';
        deshabilitarBotones();
    }

    // Verificar si perdió
    if (intentosRestantes <= 0) {
        document.getElementById('mensaje').textContent = `Perdiste, la palabra era: ${palabra}`;
        deshabilitarBotones();
    }
}

// Deshabilitar botones después de terminar el juego
function deshabilitarBotones() {
    document.querySelectorAll('#alfabeto button').forEach(boton => {
        boton.disabled = true;
    });
}

// Iniciar el juego
function iniciarJuego() {
    mostrarPalabra();
    mostrarAlfabeto();
}

iniciarJuego();
