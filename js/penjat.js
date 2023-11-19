let totalPartides = 0;
let partidesGuanyades = 0;
let partidesPerdudes = 0;

function menu() {
    while (true) {
        console.log("Menú:\n1. Iniciar un joc\n2. Estadístiques\n3. Sortir");
        let opcio = prompt("Introdueix un número: ");
        switch (opcio) {
            case "1":
                iniciarJoc();
                break;
            case "2":
                mostrarEstadistiques();
                break;
            case "3":
                return;
            default:
                console.log("Opció incorrecta. Si us plau, tria una opció vàlida.");
        }
    }
}

function iniciarJoc() {
    let paraula = prompt("Introdueix la paraula per al joc:");
    let paraulaSecreta = Array.from(paraula);
    let paraulaActual = "_ ".repeat(paraula.length);
    let lletresFallades = [];
    let intents = 6;

    while (intents > 0 && paraulaActual.includes("_ ")) {
        console.log("Paraula actual: " + paraulaActual);
        let lletra = prompt("Introdueix una lletra:");

        if (lletra.length !== 1 || !lletra.match(/[a-zA-Z]/)) {
            console.log("Introdueix una lletra vàlida.");
            continue;
        }

        if (paraulaSecreta.includes(lletra)) {
            for (let i = 0; i < paraulaSecreta.length; i++) {
                if (paraulaSecreta[i] === lletra) {
                    paraulaActual = paraulaActual.substring(0, 2 * i) + lletra + paraulaActual.substring(2 * i + 1);
                }
            }
        } else {
            intents--;
            lletresFallades.push(lletra);
        }
        
        console.log("Lletres fallades " + lletresFallades.length + "/6: " + lletresFallades.join(", "));

        if (!paraulaActual.includes("_ ")) {
            console.log("Felicitats! Has encertat la paraula: " + paraulaSecreta.join(""));
            partidesGuanyades++;
            totalPartides++;
            return;
        }
    }
    
    console.log("Has mort penjat! La paraula era: " + paraulaSecreta.join(""));
    partidesPerdudes++;
    totalPartides++;
}

function mostrarEstadistiques() {
    const percentGuanyades = totalPartides > 0 ? ((partidesGuanyades / totalPartides) * 100).toFixed(2) : 0;
    const percentPerdudes = totalPartides > 0 ? ((partidesPerdudes / totalPartides) * 100).toFixed(2) : 0;

    console.log("Total de partides: " + totalPartides + "\nPartides guanyades (" + percentGuanyades + "%): " + partidesGuanyades + "\nPartides perdudes (" + percentPerdudes + "%): " + partidesPerdudes);
}
