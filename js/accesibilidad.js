const btnMenuAccesibilidad = document.getElementById("btn-menu-accesibilidad");
const textoAudioBase = document.getElementById("texto-audio");
const seccionContenidoAudio = document.getElementById("contenido");

let leyendoVoz = false;

function obtenerTextoParaLeer() {
    if (seccionContenidoAudio && !seccionContenidoAudio.hidden) {
        const clon = seccionContenidoAudio.cloneNode(true);
        const ocultos = clon.querySelectorAll("[hidden]");
        ocultos.forEach(function(elemento) {
            elemento.remove();
        });
        const botones = clon.querySelectorAll("button");
        botones.forEach(function(boton) {
            boton.remove();
        });
        const textoVisible = clon.textContent.replace(/\s+/g, " ").trim();
        if (textoVisible) {
            return textoVisible;
        }
    }

    if (textoAudioBase && textoAudioBase.textContent.trim()) {
        return textoAudioBase.textContent.trim();
    }

    return "Bienvenido a Nodos de Memoria Mokaná.";
}

function actualizarEstadoBotonAccesibilidad(activo) {
    leyendoVoz = activo;
    if (!btnMenuAccesibilidad) return;

    btnMenuAccesibilidad.setAttribute("aria-pressed", String(activo));
    btnMenuAccesibilidad.classList.toggle("activa", activo);

    const etiqueta = btnMenuAccesibilidad.querySelector("span");
    if (etiqueta) {
        etiqueta.textContent = activo ? "Detener lectura" : "Accesibilidad";
    }
}

function detenerLecturaVoz() {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
    actualizarEstadoBotonAccesibilidad(false);
}

if (btnMenuAccesibilidad) {
    btnMenuAccesibilidad.addEventListener("click", function() {
        if (!("speechSynthesis" in window)) {
            alert("Tu navegador no admite la lectura en voz alta.");
            return;
        }

        if (leyendoVoz || window.speechSynthesis.speaking) {
            detenerLecturaVoz();
            return;
        }

        window.speechSynthesis.cancel();

        const lectura = new SpeechSynthesisUtterance(obtenerTextoParaLeer());
        lectura.lang = "es-CO";
        lectura.rate = 0.9;

        lectura.onend = function() {
            actualizarEstadoBotonAccesibilidad(false);
        };

        lectura.onerror = function() {
            actualizarEstadoBotonAccesibilidad(false);
        };

        actualizarEstadoBotonAccesibilidad(true);
        window.speechSynthesis.speak(lectura);
    });
}