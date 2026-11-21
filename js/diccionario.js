const campoBusqueda = document.getElementById("buscar-palabra");
const botonBusqueda = document.getElementById("boton-buscar");
const resultadoBusqueda = document.getElementById("resultado-busqueda");
const contenedorSugerencias = document.getElementById("sugerencias-diccionario");

const palabrasPruebaPrototipo = [
    {
        termino: "memoria",
        categoria: "Sustantivo (ejemplo de prototipo)",
        significado: "Recuerdo vivo, relato y enseñanza que pasa de generación en generación dentro de la comunidad.",
        ejemplo: "La memoria comunitaria ayuda a cuidar las historias y saberes locales."
    },
    {
        termino: "raíz",
        categoria: "Sustantivo (ejemplo de prototipo)",
        significado: "Base, origen y vínculo profundo con el territorio y la historia compartida.",
        ejemplo: "Conocer nuestras raíces fortalece el respeto por quienes nos antecedieron."
    },
    {
        termino: "palabra",
        categoria: "Sustantivo (ejemplo de prototipo)",
        significado: "Expresión oral o escrita que nombra el mundo y mantiene viva la comunicación.",
        ejemplo: "Cada palabra compartida con respeto enriquece el aprendizaje colectivo."
    },
    {
        termino: "comunidad",
        categoria: "Sustantivo (ejemplo de prototipo)",
        significado: "Grupo de personas que construye, cuida y valida saberes de manera participativa.",
        ejemplo: "El proyecto busca sumar a la comunidad sin extraer conocimientos sin permiso."
    }
];

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function renderizarSugerencias() {
    if (!contenedorSugerencias) return;
    contenedorSugerencias.innerHTML = "";

    palabrasPruebaPrototipo.forEach(function(item) {
        const botonChip = document.createElement("button");
        botonChip.type = "button";
        botonChip.className = "chip-palabra";
        botonChip.textContent = item.termino + " (prueba)";
        botonChip.addEventListener("click", function() {
            if (campoBusqueda) {
                campoBusqueda.value = item.termino;
            }
            mostrarFichaPalabra(item);
        });
        contenedorSugerencias.appendChild(botonChip);
    });
}

function mostrarFichaPalabra(item) {
    if (!resultadoBusqueda) return;
    resultadoBusqueda.innerHTML =
        '<div class="ficha-palabra-titulo">' + item.termino + ' <span style="font-size:14px;color:#49352A;">[Dato de prueba del prototipo]</span></div>' +
        '<div class="ficha-palabra-meta">' + item.categoria + '</div>' +
        '<p><strong>Definición de prueba:</strong> ' + item.significado + '</p>' +
        '<p style="margin-bottom:0;"><strong>Ejemplo de uso:</strong> "' + item.ejemplo + '"</p>';
}

function buscarPalabra() {
    if (!campoBusqueda || !resultadoBusqueda) return;

    const consulta = campoBusqueda.value.trim();
    if (consulta === "") {
        resultadoBusqueda.innerHTML =
            "<p style='margin-bottom:0;'>Escribe una palabra de prueba (como <strong>memoria</strong>, <strong>raíz</strong>, <strong>palabra</strong> o <strong>comunidad</strong>) o toca una etiqueta.</p>";
        return;
    }

    const consultaLimpia = normalizarTexto(consulta);
    const coincidencia = palabrasPruebaPrototipo.find(function(item) {
        return (
            normalizarTexto(item.termino).includes(consultaLimpia) ||
            normalizarTexto(item.significado).includes(consultaLimpia)
        );
    });

    if (coincidencia) {
        mostrarFichaPalabra(coincidencia);
    } else {
        const disponibles = palabrasPruebaPrototipo.map(function(p) { return p.termino; }).join(", ");
        resultadoBusqueda.innerHTML =
            "<p style='margin-bottom:0;'>No encontramos '<strong>" + consulta +
            "</strong>' entre las palabras de prueba del prototipo. Puedes probar con: <strong>" +
            disponibles + "</strong>. Recuerda que el contenido definitivo requiere validación cultural.</p>";
    }
}

renderizarSugerencias();

if (resultadoBusqueda && resultadoBusqueda.innerHTML.trim() === "") {
    resultadoBusqueda.innerHTML =
        "<p style='margin-bottom:0;'>Selecciona una palabra de prueba o escribe un término para probar la búsqueda del prototipo.</p>";
}

if (botonBusqueda) {
    botonBusqueda.addEventListener("click", buscarPalabra);
}

if (campoBusqueda) {
    campoBusqueda.addEventListener("keydown", function(evento) {
        if (evento.key === "Enter") {
            buscarPalabra();
        }
    });
}