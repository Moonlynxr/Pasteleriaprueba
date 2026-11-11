/* ============================================
   FORMULARIOS.JS
   Validación de los formularios de contacto / solicitud de pedido.
   Es un prototipo: la confirmación es visual y SIMULADA,
   no se envía ningún dato a un servidor real.
   ============================================ */

function mostrarError(campo, mensaje) {
  const contenedor = campo.closest(".campo-formulario");
  const elementoError = contenedor.querySelector(".mensaje-error");
  contenedor.classList.toggle("con-error", Boolean(mensaje));
  if (elementoError) elementoError.textContent = mensaje || "";
}

function validarFormularioPedido(formulario) {
  let esValido = true;

  const nombre = formulario.querySelector("#nombre");
  if (!nombre.value.trim()) {
    mostrarError(nombre, "Por favor ingresa tu nombre.");
    esValido = false;
  } else {
    mostrarError(nombre, "");
  }

  const telefono = formulario.querySelector("#telefono");
  const telefonoLimpio = telefono.value.replace(/\D/g, "");
  if (telefonoLimpio.length < 10) {
    mostrarError(telefono, "Ingresa un teléfono a 10 dígitos.");
    esValido = false;
  } else {
    mostrarError(telefono, "");
  }

  const fecha = formulario.querySelector("#fecha-entrega");
  if (!fecha.value) {
    mostrarError(fecha, "Selecciona una fecha de entrega.");
    esValido = false;
  } else {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(fecha.value + "T00:00:00");
    if (fechaSeleccionada < hoy) {
      mostrarError(fecha, "La fecha no puede ser anterior a hoy.");
      esValido = false;
    } else {
      mostrarError(fecha, "");
    }
  }

  const direccion = formulario.querySelector("#direccion");
  if (!direccion.value.trim()) {
    mostrarError(direccion, "Ingresa la dirección de entrega.");
    esValido = false;
  } else {
    mostrarError(direccion, "");
  }

  const descripcion = formulario.querySelector("#descripcion-pedido");
  if (!descripcion.value.trim()) {
    mostrarError(descripcion, "Cuéntanos qué pastel o producto deseas.");
    esValido = false;
  } else {
    mostrarError(descripcion, "");
  }

  return esValido;
}

function inicializarFormularioPedido() {
  const formulario = document.getElementById("form-pedido");
  if (!formulario) return;

  const descripcion = formulario.querySelector("#descripcion-pedido");
  const resumenCarrito = construirResumenParaPedido();
  if (resumenCarrito && descripcion && !descripcion.value) {
    descripcion.value = `Pedido armado desde el carrito:\n${resumenCarrito}`;
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!validarFormularioPedido(formulario)) return;

    const confirmacion = document.getElementById("confirmacion-pedido");
    confirmacion.classList.add("visible");
    formulario.reset();
    vaciarCarrito();
    confirmacion.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

document.addEventListener("DOMContentLoaded", inicializarFormularioPedido);
