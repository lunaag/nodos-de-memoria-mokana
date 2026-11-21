const selectorRelatos = document.getElementById("selector-relatos");
const visorRelato = document.getElementById("visor-relato");

const relatosPruebaPrototipo = [
    {
        id: "relato-1",
        boton: "Relato de prueba 1: La palabra en el fogón",
        titulo: "La palabra compartida alrededor del fogón (Prueba de prototipo)",
        etiqueta: "Relato de prueba 1 • Solo para validar el prototipo • Sujeto a validación cultural",
        imagen: "img/portada-mokana.jpg",
        alt: "Ilustración de encuentro comunitario y memoria oral",
        texto: "En este relato de prueba imaginamos un encuentro escolar y comunitario donde los mayores cuentan cómo las historias se cuidan cuando se escuchan con paciencia y se anotan con respeto. Sirve únicamente para probar cómo se muestra un relato en el prototipo antes de incorporar testimonios validados."
    },
    {
        id: "relato-2",
        boton: "Relato de prueba 2: Semillas y memoria",
        titulo: "Semillas que cuidan la memoria del territorio (Prueba de prototipo)",
        etiqueta: "Relato de prueba 2 • Solo para validar el prototipo • Sujeto a validación cultural",
        imagen: "img/modulo-relatos.jpg",
        alt: "Ilustración de memoria y tradición cultural",
        texto: "Este segundo relato de prueba representa una historia breve sobre el cuidado de lo propio y el aprendizaje en grupo. Está incluido solo como muestra de prototipo para verificar la lectura, el diseño y el botón de accesibilidad en voz alta."
    }
];

function renderizarRelato(indice) {
    const relato = relatosPruebaPrototipo[indice];
    if (!relato || !visorRelato) return;

    visorRelato.innerHTML =
        '<img src="' + relato.imagen + '" alt="' + relato.alt + '">' +
        '<div class="meta-relato">' + relato.etiqueta + '</div>' +
        '<h4>' + relato.titulo + '</h4>' +
        '<p style="margin-bottom:0;">' + relato.texto + '</p>';

    if (selectorRelatos) {
        const botones = selectorRelatos.querySelectorAll(".btn-relato");
        botones.forEach(function(btn, i) {
            btn.classList.toggle("activo", i === indice);
        });
    }
}

function inicializarRelatos() {
    if (!selectorRelatos || !visorRelato) return;
    selectorRelatos.innerHTML = "";

    relatosPruebaPrototipo.forEach(function(relato, indice) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn-relato";
        boton.textContent = relato.boton;
        boton.addEventListener("click", function() {
            renderizarRelato(indice);
        });
        selectorRelatos.appendChild(boton);
    });

    renderizarRelato(0);
}

inicializarRelatos();