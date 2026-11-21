const tarjetasModulos = document.querySelectorAll(".tarjeta-modulo[data-modulo]");
const seccionContenido = document.getElementById("contenido");
const tituloContenido = document.getElementById("titulo-contenido");
const descripcionContenido = document.getElementById("descripcion-contenido");
const imagenModuloActivo = document.getElementById("imagen-modulo-activo");
const botonCerrar = document.getElementById("cerrar-contenido");

const indicadorUbicacionActual = document.getElementById("indicador-ubicacion-actual");
const btnMenuInicio = document.getElementById("btn-menu-inicio");
const btnMenuRegresar = document.getElementById("btn-menu-regresar");

const mensajeYuqui = document.getElementById("mensaje-yuqui");
const btnYuquiSiguiente = document.getElementById("btn-yuqui-siguiente");
const yuquiBocadillo = document.getElementById("yuqui-bocadillo");
const btnYuquiMinimizar = document.getElementById("btn-yuqui-minimizar");
const btnYuquiAvatar = document.getElementById("btn-yuqui-avatar");

const formParticipar = document.getElementById("form-participar");
const respuestaParticipacion = document.getElementById("respuesta-participacion");


const seccionesModulos = {
    diccionario: document.getElementById("diccionario"),
    relatos: document.getElementById("relatos"),
    juegos: document.getElementById("juegos"),
    voces: document.getElementById("voces")
};

const informacionModulos = {
    diccionario: {
        ubicacion: "Diccionario",
        titulo: "Diccionario Mokaná",
        descripcion: "Explora este espacio de acercamiento al vocabulario Mokaná.",
        imagen: "img/modulo-diccionario.jpg",
        alt: "Ilustración del Diccionario Mokaná",
        yuqui: "¡En Diccionario puedes escribir una palabra para consultar el vocabulario!"
    },
    relatos: {
        ubicacion: "Relatos",
        titulo: "Relatos y tradiciones",
        descripcion: "Un espacio para conocer y preservar la memoria cultural.",
        imagen: "img/modulo-relatos.jpg",
        alt: "Ilustración de Relatos y tradiciones Mokaná",
        yuqui: "En Relatos se reúnen historias y tradiciones del pueblo Mokaná, cuidando los saberes y la autroría de quienes los comparten."
    },
    juegos: {
        ubicacion: "Juegos",
        titulo: "Aprende jugando",
        descripcion: "Aprende conceptos básicos mediante pequeñas actividades.",
        imagen: "img/modulo-juegos.jpg",
        alt: "Ilustración de Aprende jugando",
        yuqui: "¡En Juegos puedes poner a prueba lo que sabes! Responde la pregunta y revisa la retroalimentación."
    },
    voces: {
        ubicacion: "Voces",
        titulo: "Voces de la Memoria Mokaná",
        descripcion: "Participación comunitaria, colaboradores autorizados, documentación y reconocimiento de fuentes.",
        imagen: "img/modulo-voces.jpg",
        alt: "Ilustración de Voces de la Memoria Mokaná",
        yuqui: "Aquí conocemos cómo participar con respeto, quiénes autorizan la presentación de saberes, cómo se documentan y el crédito a sus fuentes."
    }
};

const consejosYuqui = [
    "¡Hola! Soy Yuqui. Toca cualquiera de las tarjetas para explorar el portal educativo.",
    "Arriba en el menú puedes ver en qué página estás y usar el botón grande de Accesibilidad cuando quieras escuchar en voz alta.",
    "En Voces de la Memoria Mokaná cuidamos la participación comunitaria y el reconocimiento de fuentes y autores.",
    "Si necesitas más espacio para leer, puedes minimizar mi globo con el botón '-' y volver a tocarme cuando quieras."
];

let indiceConsejoYuqui = 0;

function actualizarUbicacionActual(nombreUbicacion) {
    if (indicadorUbicacionActual) {
        indicadorUbicacionActual.textContent = nombreUbicacion;
    }
}

function mostrarBocadilloYuqui() {
    if (yuquiBocadillo) {
        yuquiBocadillo.hidden = false;
    }
}

function decirConYuqui(texto) {
    if (mensajeYuqui && texto) {
        mensajeYuqui.textContent = texto;
        mostrarBocadilloYuqui();
    }
}

function detenerVozSiExiste() {
    if (typeof detenerLecturaVoz === "function") {
        detenerLecturaVoz();
    } else if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}

function ocultarModulos() {
    Object.values(seccionesModulos).forEach(function(seccion) {
        if (seccion) {
            seccion.hidden = true;
        }
    });
}

function irAInicio() {
    detenerVozSiExiste();
    ocultarModulos();
    if (seccionContenido) {
        seccionContenido.hidden = true;
    }
    actualizarUbicacionActual("Inicio");
    decirConYuqui(consejosYuqui[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirModulo(nombreModulo) {
    const informacion = informacionModulos[nombreModulo];
    if (!informacion) return;

    detenerVozSiExiste();
    ocultarModulos();

    actualizarUbicacionActual(informacion.ubicacion);
    tituloContenido.textContent = informacion.titulo;
    descripcionContenido.textContent = informacion.descripcion;

    if (imagenModuloActivo) {
        imagenModuloActivo.src = informacion.imagen;
        imagenModuloActivo.alt = informacion.alt;
    }

    seccionesModulos[nombreModulo].hidden = false;
    seccionContenido.hidden = false;

    decirConYuqui(informacion.yuqui);

    seccionContenido.scrollIntoView({ behavior: "smooth" });
}

tarjetasModulos.forEach(function(tarjeta) {
    tarjeta.addEventListener("click", function() {
        abrirModulo(tarjeta.dataset.modulo);
    });

    tarjeta.addEventListener("keydown", function(evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirModulo(tarjeta.dataset.modulo);
        }
    });
});

if (botonCerrar) {
    botonCerrar.addEventListener("click", function() {
        detenerVozSiExiste();
        seccionContenido.hidden = true;
        ocultarModulos();
        actualizarUbicacionActual("Inicio");
        decirConYuqui("Volviste a Inicio. ¿Qué espacio te gustaría abrir ahora?");
    });
}

if (btnMenuInicio) {
    btnMenuInicio.addEventListener("click", irAInicio);
}

if (btnMenuRegresar) {
    btnMenuRegresar.addEventListener("click", function() {
        const hayModuloAbierto = seccionContenido && !seccionContenido.hidden;

        if (hayModuloAbierto) {
            irAInicio();
        } else if (window.history.length > 1) {
            window.history.back();
        } else {
            irAInicio();
        }
    });
}

if (btnYuquiSiguiente) {
    btnYuquiSiguiente.addEventListener("click", function() {
        indiceConsejoYuqui = (indiceConsejoYuqui + 1) % consejosYuqui.length;
        decirConYuqui(consejosYuqui[indiceConsejoYuqui]);
    });
}

if (btnYuquiMinimizar && yuquiBocadillo) {
    btnYuquiMinimizar.addEventListener("click", function() {
        yuquiBocadillo.hidden = true;
    });
}

if (btnYuquiAvatar) {
    btnYuquiAvatar.addEventListener("click", function() {
        if (yuquiBocadillo && yuquiBocadillo.hidden) {
            mostrarBocadilloYuqui();
        } else {
            indiceConsejoYuqui = (indiceConsejoYuqui + 1) % consejosYuqui.length;
            decirConYuqui(consejosYuqui[indiceConsejoYuqui]);
        }
    });
}

if (formParticipar && respuestaParticipacion) {
    formParticipar.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nombre = document.getElementById("participante-nombre").value.trim();
        const rol = document.getElementById("participante-rol").value;
        const territorio = document.getElementById("participante-territorio").value.trim();
        const idea = document.getElementById("participante-idea").value.trim();

        if (!nombre || !territorio || !idea) return;

        respuestaParticipacion.textContent =
            "¡Gracias, " + nombre + "! Tu solicitud como " + rol +
            " desde " + territorio +
            " quedó registrada en este prototipo para diálogo y validación cultural.";
        respuestaParticipacion.hidden = false;

        decirConYuqui(
            "¡Qué alegría, " + nombre + "! Registramos tu interés en aportar como " +
            rol + ". La memoria crece cuando la comunidad participa."
        );

        formParticipar.reset();
    });
}