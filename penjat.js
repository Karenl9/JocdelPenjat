// Declaración de variables globales para rastrear estadísticas del juego.
let paraula = ""; 
let paraulaSecreta = "";  
let intents = 0;  
let lletresUsades = []; 
let totalPartides = 0;  
let partidesGuanyades = 0; 
let partidesPerdudes = 0;  
const intentsMax = 7;
let imatges = [
    "imatges/penjat_0.png",
    "imatges/penjat_1.png",
    "imatges/penjat_2.png",
    "imatges/penjat_3.png",
    "imatges/penjat_4.png",
    "imatges/penjat_5.png",
    "imatges/penjat_6.png",
];  // Rutas de las imágenes para el juego

// Elementos HTML
const jocPenjat = document.getElementById("jocPenjat");
const abecedari = document.getElementById("abecedari");
const imatgePenjat = document.getElementById("imatgePenjat");
const lletresUtilitzades = document.getElementById("lletresUtilitzades");
const caixaLletresUtilitzades = document.getElementById("caixaLletresUtilitzades");

// Función para iniciar una nueva partida
function novaPartida() {
    totalPartides++;
    reiniciarJoc();
    paraula = prompt("Introdueix la paraula").toUpperCase();
    mostrarAbecedari();
    mostrarParaulaSecreta();
}

// Función para manejar el clic en una letra del abecedario
function clickLletra(lletra) {
    if (lletresUsades.includes(lletra)) {
        alert(`Ja has utilitzat la lletra ${lletra}`);
        return;
    }
    lletresUsades.push(lletra);
    if (!paraula.includes(lletra)) {
        intents++;
    }
    actualitzarInterficies();
}

// Función para mostrar las letras utilizadas
function mostrarLletresUtilitzades() {
    const caixaLletresUtilitzades = document.getElementById("caixaLletresUtilitzades");
    caixaLletresUtilitzades.innerHTML = "";
    for (let i = 0; i < lletresUsades.length; i++) {
        const lletra = lletresUsades[i];
        let boton = document.createElement("button");
        boton.textContent = lletra;
        // Estilizar el botón
        if (paraula.includes(lletra)) {
            boton.classList.add("btn", "btn-white", "m-2");
        } else {
            boton.classList.add("btn", "btn-dark", "m-2");
        }
        caixaLletresUtilitzades.appendChild(boton);
    }
}

// Función para mostrar la imagen actual del juego
function mostrarImmatgePenjat() {
    imatgePenjat.src = imatges[intents];
}

// Función para mostrar el abecedario
function mostrarAbecedari() {
    const lletres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < lletres.length; i++) {
        const lletra = lletres[i];
        const boton = document.createElement("button");
        boton.classList.add("btn", "btn-outline-dark", "m-1");
        boton.textContent = lletra;
        boton.addEventListener("click", function () {
            clickLletra(lletra);
        });
        abecedari.appendChild(boton);
    }
}

// Función para mostrar la representación actualizada de la palabra a adivinar
function mostrarParaulaSecreta() {
    for (let i = 0; i < paraula.length; i++) {
        const element = "_";
        const span = document.createElement("span");
        span.classList.add("badge", "rounded-pill", "text-dark");
        span.style.fontSize = "2rem";
        span.style.margin = "1rem";
        span.textContent = element;
        jocPenjat.appendChild(span);
    }
}

// Función para actualizar la representación de la palabra a adivinar
function actualitzarParaulaSecreta() {
    paraulaSecreta = "";
    jocPenjat.innerHTML = "";
    for (let i = 0; i < paraula.length; i++) {
        const lletra = paraula[i];
        const span = document.createElement("span");
        span.classList.add("badge", "rounded-pill", "text-dark");
        span.style.fontSize = "2rem";
        span.style.margin = "1rem";

        if (lletresUsades.includes(lletra)) {
            span.textContent = lletra;
            paraulaSecreta += lletra;
        } else {
            span.textContent = "_";
        }
        jocPenjat.appendChild(span);
    }
}

// Función para actualizar todas las interfaces del juego
function actualitzarInterficies() {
    mostrarLletresUtilitzades();
    actualitzarParaulaSecreta();
    comprovarResultat();
}

// Función para reiniciar el juego
function reiniciarJoc() {
    paraula = "";
    intents = 0;
    lletresUsades = [];
    paraulaSecreta = "";
    imatgePenjat.src = imatges[intents];
    abecedari.innerHTML = "";
    jocPenjat.innerHTML = "";
    caixaLletresUtilitzades.innerHTML = "";
}

// Función para mostrar las estadísticas del juego en una ventana emergente
function mostrarEstadistiques() {
    partidesGuanyades = localStorage.getItem('partidesGuanyades') || 0;
    partidesPerdudes = localStorage.getItem('partidesPerdudes') || 0;
    const porcentatgeGuanyades = calcularPorcentatge(partidesGuanyades, totalPartides);
    const porcentatgePerdudes = calcularPorcentatge(partidesPerdudes, totalPartides);
    const Estadistiques = window.open("", "Estadistiques", "width=500,height=400");
    Estadistiques.document.write("<h1>Estadístiques</h1>");
    Estadistiques.document.write(`<p>Total de partides: ${totalPartides}</p>`);
    Estadistiques.document.write(`<p>Partidas guanyaddes (${porcentatgeGuanyades}%): ${partidesGuanyades}</p>`);
    Estadistiques.document.write(`<p>Partidas perdudes (${porcentatgePerdudes}%): ${partidesPerdudes}</p>`);
}

// Función para calcular el porcentaje
function calcularPorcentatge(valor, totalPartides) {
    return (valor / totalPartides) * 100;
}


// Función para comprobar el resultado del juego (ganar o perder)
function comprovarResultat() {
    if (paraula == paraulaSecreta) {
        partidesGuanyades++;
        alert("HAS GUANYAT!!!! :)");
        reiniciarJoc();
    }
    if (intents === intentsMax) {
        partidesPerdudes++;
        alert(`Has perdut :( la paraula era ${paraula}. Intenta-ho altre vegada! :)`);
        reiniciarJoc();
    }
    localStorage.setItem('partidesGuanyades', partidesGuanyades);
    localStorage.setItem('partidesPerdudes', partidesPerdudes);
}

// Función para eliminar las estadísticas almacenadas
function eliminarEstadistiques() {
    localStorage.removeItem('totalPartides');
    localStorage.removeItem('partidesGuanyades');
    localStorage.removeItem('partidesPerdudes');
    localStorage.clear();
    alert("S'ha eliminat les Estadístiques");
}
   