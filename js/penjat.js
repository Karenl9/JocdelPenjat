
let totalPartides = 0;
let partidesGuanyades = 0;
let partidesPerdudes = 0;

function menu() {
    while (true) {
        console.log("Menú:\n1. Iniciar un joc\n2. Estadístiques\n3. Sortir");
        let opcio = prompt("Introduce un numero: ");
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
    const paraula = prompt("Introdueix la paraula per al joc:");
    const paraulaSecreta = paraula.toUpperCase();
    let paraulaActual = "_".repeat(paraulaSecreta.length);
    let lletresFallades = [];
    let intents = 6;

    while (intents > 0) {
        console.log("Paraula actual: " + paraulaActual);
        const lletra = prompt("Introdueix una lletra:");

        if (lletra.length !== 1 || !/^[a-zA-Z]$/.test(lletra)) {
            console.log("Introdueix una lletra vàlida.");
            continue;
        }

        if (paraulaSecreta.includes(lletra)) {
            for (let i = 0; i < paraulaSecreta.length; i++) {
                if (paraulaSecreta[i] === lletra) {
                    paraulaActual = paraulaActual.substring(0, i) + lletra + paraulaActual.substring(i + 1);
                }
            }
        } else {
            lletresFallades.push(lletra);
            intents--;
        }

        alert("Lletres fallades " + lletresFallades.length + "/6: " + lletresFallades.join(", "));

        if (paraulaActual === paraulaSecreta) {
            alert("Felicitats! Has encertat la paraula: " + paraulaSecreta);
            partidesGuanyades++;
            totalPartides++;
            return;
        }
    }

    alert("Has mort penjat! La paraula era: " + paraulaSecreta);
    partidesPerdudes++;
    totalPartides++;
}

function mostrarEstadistiques() {
    const percentGuanyades = (partidesGuanyades / totalPartides * 100).toFixed(2);
    const percentPerdudes = (partidesPerdudes / totalPartides * 100).toFixed(2);

    console.log("Total de partides: " + totalPartides + "\nPartides guanyades (" + percentGuanyades + "%): " + partidesGuanyades + "\nPartides perdudes (" + percentPerdudes + "%): " + partidesPerdudes);
}































