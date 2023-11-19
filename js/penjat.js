// Declaración de variables globales para rastrear estadísticas del juego.
let totalPartides = 0;
let partidesGuanyades = 0;
let partidesPerdudes = 0;


// Función principal que presenta un menú y gestiona las opciones del usuario.
function menu() {
    while (true) {
        console.log("Menú:\n1. Iniciar un joc\n2. Estadístiques\n3. Sortir");
        let opcio = prompt("Introdueix un número: ");
        switch (opcio) {
            case "1":
                iniciarJoc(); // Llama a la función para iniciar un juego.
                break;
            case "2":
                mostrarEstadistiques(); // Llama a la función para mostrar estadísticas
                break;
            case "3":
                return;  // Salir del bucle y finalizar el programa.
            default:
                console.log("Opció incorrecta. Si us plau, tria una opció vàlida.");
        }
    }
}

// Función que gestiona la lógica del juego del ahorcado.
function iniciarJoc() {
    // Solicita al usuario que introduzca la palabra para el juego.
    let paraula = prompt("Introdueix la paraula per al joc:");
    let paraulaSecreta = Array.from(paraula);
    let paraulaActual = "_ ".repeat(paraula.length);
    let lletresFallades = [];
    let intents = 6;

    // Bucle principal del juego, se ejecuta mientras haya intentos y letras sin adivinar.
    while (intents > 0 && paraulaActual.includes("_ ")) {
        console.log("Paraula actual: " + paraulaActual);
        let lletra = prompt("Introdueix una lletra:");

         // Validación de entrada: Una letra válida debe tener longitud 1 y ser alfabética.
        if (lletra.length !== 1 || !lletra.match(/[a-zA-Z]/)) {
            console.log("Introdueix una lletra vàlida.");
            continue;   // Vuelve al inicio del bucle si la entrada no es válida.
        }

         // Verifica si la letra introducida está en la palabra secreta.
        if (paraulaSecreta.includes(lletra)) {
            // Actualiza la palabra actual con la letra correcta.
            for (let i = 0; i < paraulaSecreta.length; i++) {
                if (paraulaSecreta[i] === lletra) {
                    paraulaActual = paraulaActual.substring(0, 2 * i) + lletra + paraulaActual.substring(2 * i + 1);
                }
            }
        } else {
            intents--;  // Reduce el número de intentos si la letra no está en la palabra.
            lletresFallades.push(lletra);  // Agrega la letra a la lista de letras falladas.
        }

        // Muestra las letras falladas y la cantidad de intentos restantes.
        console.log("Lletres fallades " + lletresFallades.length + "/6: " + lletresFallades.join(", "));

        // Verifica si se ha adivinado toda la palabra.
        if (!paraulaActual.includes("_ ")) {
            console.log("Felicitats! Has encertat la paraula: " + paraulaSecreta.join(""));
            partidesGuanyades++;
            totalPartides++;
            return; // Sale de la función si se ha ganado el juego.
        }
    }

    // Si el bucle termina, significa que se quedó sin intentos y muestra la palabra secreta.
    console.log("Has mort penjat! La paraula era: " + paraulaSecreta.join(""));
    partidesPerdudes++;
    totalPartides++;
}

// Función para mostrar las estadísticas del juego.
function mostrarEstadistiques() {
    // Calcula y muestra el porcentaje de partidas ganadas y perdidas.
    const percentGuanyades = totalPartides > 0 ? ((partidesGuanyades / totalPartides) * 100).toFixed(2) : 0;
    const percentPerdudes = totalPartides > 0 ? ((partidesPerdudes / totalPartides) * 100).toFixed(2) : 0;

    // Muestra las estadísticas generales del juego.
    console.log("Total de partides: " + totalPartides + "\nPartides guanyades (" + percentGuanyades + "%): " + partidesGuanyades + "\nPartides perdudes (" + percentPerdudes + "%): " + partidesPerdudes);
}
