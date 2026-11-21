const botonesActividad = document.querySelectorAll(".btn-actividad-juego[data-actividad]");
const contenedorActividad = document.getElementById("contenedor-actividad-juego");

function mostrarRetroalimentacion(mensaje, esPositiva) {
    if (!contenedorActividad) return;
    let caja = contenedorActividad.querySelector(".retroalimentacion-juego");
    if (!caja) {
        caja = document.createElement("div");
        caja.className = "retroalimentacion-juego";
        contenedorActividad.appendChild(caja);
    }
    caja.style.borderLeftColor = esPositiva ? "var(--verde)" : "var(--rojo)";
    caja.innerHTML = mensaje + " <small style='display:block;margin-top:4px;opacity:0.85;'>(Actividad de prueba del prototipo)</small>";
}

function renderizarActividad(tipo) {
    if (!contenedorActividad) return;

    botonesActividad.forEach(function(btn) {
        btn.classList.toggle("activa", btn.dataset.actividad === tipo);
    });

    if (tipo === "trivia") {
        contenedorActividad.innerHTML =
            "<h4>Actividad 1 (prueba): Trivia rápida</h4>" +
            "<p>¿En qué departamento de Colombia habita ancestral y actualmente el pueblo indígena Mokaná?</p>" +
            '<button type="button" class="opcion-juego" data-correcta="false">Amazonas</button>' +
            '<button type="button" class="opcion-juego" data-correcta="true">Atlántico</button>' +
            '<button type="button" class="opcion-juego" data-correcta="false">Cauca</button>';

        contenedorActividad.querySelectorAll(".opcion-juego").forEach(function(opcion) {
            opcion.addEventListener("click", function() {
                const esCorrecta = opcion.dataset.correcta === "true";
                if (esCorrecta) {
                    mostrarRetroalimentacion("¡¡Correcto! Los Mokaná habitan en municipios del departamento del Atlántico como Tubará, Malambo, Baranoa y Galapa.", true);
                } else {
                    mostrarRetroalimentacion("Casi. Intenta con otra opción.", false);
                }
            });
        });
        return;
    }

    if (tipo === "verdadero-falso") {
        contenedorActividad.innerHTML =
            "<h4>Actividad 2 (prueba): Verdadero o falso</h4>" +
            "<p>Afirmación: \"En este proyecto, los saberes deben compartirse con respeto, participación comunitaria y validación cultural.\"</p>" +
            '<button type="button" class="btn-vf" data-valor="verdadero">Verdadero</button>' +
            '<button type="button" class="btn-vf" data-valor="falso">Falso</button>';

        contenedorActividad.querySelectorAll(".btn-vf").forEach(function(btn) {
            btn.addEventListener("click", function() {
                if (btn.dataset.valor === "verdadero") {
                    mostrarRetroalimentacion("¡Correcto! La participación y validación cultural evitan la extracción sin consentimiento de la comunidad.", true);
                } else {
                    mostrarRetroalimentacion("Revisa bien la afirmación: el respeto y la validación comunitaria son esenciales.", false);
                }
            });
        });
        return;
    }

    if (tipo === "completar") {
        contenedorActividad.innerHTML =
            "<h4>Actividad 3 (prueba): Completa la frase</h4>" +
            "<p>Completa la palabra que falta: \"Cuidar la ________ comunitaria ayuda a mantener vivas las historias y saberes.\"</p>" +
            '<input type="text" id="input-completar-frase" class="input-completar" placeholder="Escribe: memoria">' +
            '<button type="button" id="btn-verificar-frase">Comprobar palabra</button>';

        const btnVerificar = document.getElementById("btn-verificar-frase");
        const inputFrase = document.getElementById("input-completar-frase");

        function comprobar() {
            if (!inputFrase) return;
            const respuesta = inputFrase.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();

            if (respuesta === "memoria") {
                mostrarRetroalimentacion("¡Excelente! La palabra es 'memoria'.", true);
            } else if (respuesta === "") {
                mostrarRetroalimentacion("Escribe una palabra antes de comprobar.", false);
            } else {
                mostrarRetroalimentacion("Buen intento. Pista: empieza con 'm' y es el nombre del proyecto (memoria).", false);
            }
        }

        if (btnVerificar) {
            btnVerificar.addEventListener("click", comprobar);
        }
        if (inputFrase) {
            inputFrase.addEventListener("keydown", function(e) {
                if (e.key === "Enter") comprobar();
            });
        }
    }
}

botonesActividad.forEach(function(boton) {
    boton.addEventListener("click", function() {
        renderizarActividad(boton.dataset.actividad);
    });
});

renderizarActividad("trivia");