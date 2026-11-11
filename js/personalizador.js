/* ============================================
   PERSONALIZADOR.JS
   Configurador de pastel — función central del sitio
   (el cliente la pidió explícitamente como la idea principal).

   NOTA PARA EL DESARROLLADOR:
   - Sabores y rellenos: datos REALES proporcionados por el cliente.
   - Tamaño, cobertura y decoración: el cliente confirmó que se
     personalizan, pero no dio las opciones concretas. Las de abajo
     son contenido PROVISIONAL para poder visualizar el configurador;
     reemplazar por las opciones reales que confirme el cliente.
   ============================================ */

const OPCIONES_CONFIGURADOR = {
  tamanos: [
    { valor: "Chico", detalle: "Hasta 8 porciones" },
    { valor: "Mediano", detalle: "De 9 a 20 porciones" },
    { valor: "Grande", detalle: "De 21 a 40 porciones" },
    { valor: "Extra grande", detalle: "Más de 40 porciones" },
  ],
  sabores: [
    { valor: "Tres leches", color: "#E8DCC8" },
    { valor: "Vainilla", color: "#F3E7CE" },
    { valor: "Chocolate", color: "#5A3A2E" },
    { valor: "Combinado", color: "linear-gradient(90deg, #5A3A2E 50%, #F3E7CE 50%)" },
  ],
  rellenos: [
    { valor: "Fresa", color: "#D23C5E" },
    { valor: "Fresas con crema", color: "#F2A8BE" },
    { valor: "Durazno", color: "#F2A65A" },
    { valor: "Nuez con fresa", color: "#B5651D" },
    { valor: "Nuez con flan", color: "#D9A441" },
    { valor: "Pay de queso", color: "#F5EEDC" },
    { valor: "Pay de limón", color: "#F0E24B" },
  ],
  coberturas: [
    { valor: "Betún de vainilla" },
    { valor: "Betún de chocolate" },
    { valor: "Fondant" },
    { valor: "Crema chantilly" },
  ],
  decoraciones: [
    { valor: "Flores de repostería" },
    { valor: "Figuras personalizadas / personaje" },
    { valor: "Minimalista con frutas" },
    { valor: "Letras y mensaje decorado" },
  ],
};

const estadoPastel = {
  tamano: null,
  sabor: null,
  relleno: null,
  cobertura: null,
  decoracion: null,
  mensaje: "",
};

function crearGrupoSwatch(nombreGrupo, opciones, conColor = false) {
  const contenedor = document.createElement("div");
  contenedor.className = "opciones-lista";

  opciones.forEach((opcion, indice) => {
    const envoltorio = document.createElement("div");
    envoltorio.className = "opcion-swatch";

    const id = `${nombreGrupo}-${indice}`;
    envoltorio.innerHTML = `
      <input type="radio" name="${nombreGrupo}" id="${id}" value="${opcion.valor}">
      <label for="${id}">
        ${conColor ? `<span class="punto-color" style="background:${opcion.color}"></span>` : ""}
        ${opcion.valor}
      </label>
    `;
    contenedor.appendChild(envoltorio);
  });

  return contenedor;
}

function actualizarResumen() {
  const campos = ["tamano", "sabor", "relleno", "cobertura", "decoracion"];
  campos.forEach((campo) => {
    const elemento = document.getElementById(`resumen-${campo}`);
    if (!elemento) return;
    elemento.textContent = estadoPastel[campo] || "Sin seleccionar";
    elemento.classList.toggle("vacio", !estadoPastel[campo]);
  });

  const mensajeEl = document.getElementById("resumen-mensaje");
  if (mensajeEl) {
    mensajeEl.textContent = estadoPastel.mensaje || "Sin mensaje";
    mensajeEl.classList.toggle("vacio", !estadoPastel.mensaje);
  }

  const boton = document.getElementById("btn-agregar-carrito");
  if (boton) {
    const completo = estadoPastel.tamano && estadoPastel.sabor && estadoPastel.relleno;
    boton.disabled = !completo;
  }
}

function construirDetalleTexto() {
  return [
    `Tamaño: ${estadoPastel.tamano || "—"}`,
    `Sabor: ${estadoPastel.sabor || "—"}`,
    `Relleno: ${estadoPastel.relleno || "—"}`,
    `Cobertura: ${estadoPastel.cobertura || "—"}`,
    `Decoración: ${estadoPastel.decoracion || "—"}`,
    estadoPastel.mensaje ? `Mensaje: "${estadoPastel.mensaje}"` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

function inicializarConfigurador() {
  const contenedorTamano = document.getElementById("grupo-tamano");
  const contenedorSabor = document.getElementById("grupo-sabor");
  const contenedorRelleno = document.getElementById("grupo-relleno");
  const contenedorCobertura = document.getElementById("grupo-cobertura");
  const contenedorDecoracion = document.getElementById("grupo-decoracion");

  if (!contenedorTamano) return; // no estamos en la página de personalización

  contenedorTamano.appendChild(crearGrupoSwatch("tamano", OPCIONES_CONFIGURADOR.tamanos));
  contenedorSabor.appendChild(crearGrupoSwatch("sabor", OPCIONES_CONFIGURADOR.sabores, true));
  contenedorRelleno.appendChild(crearGrupoSwatch("relleno", OPCIONES_CONFIGURADOR.rellenos, true));
  contenedorCobertura.appendChild(crearGrupoSwatch("cobertura", OPCIONES_CONFIGURADOR.coberturas));
  contenedorDecoracion.appendChild(crearGrupoSwatch("decoracion", OPCIONES_CONFIGURADOR.decoraciones));

  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", (evento) => {
      estadoPastel[evento.target.name] = evento.target.value;
      actualizarResumen();
    });
  });

  const campoMensaje = document.getElementById("mensaje-personalizado");
  campoMensaje?.addEventListener("input", (evento) => {
    estadoPastel.mensaje = evento.target.value.trim();
    actualizarResumen();
  });

  document.getElementById("btn-agregar-carrito")?.addEventListener("click", () => {
    agregarAlCarrito({
      titulo: `Pastel personalizado — ${estadoPastel.sabor}`,
      detalle: construirDetalleTexto(),
    });

    const confirmacion = document.getElementById("confirmacion-configurador");
    if (confirmacion) {
      confirmacion.classList.add("visible");
      setTimeout(() => confirmacion.classList.remove("visible"), 3500);
    }
  });

  actualizarResumen();
}

document.addEventListener("DOMContentLoaded", inicializarConfigurador);
