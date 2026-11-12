/* ============================================
   CARRITO.JS
   Carrito de compras SIMULADO (sin pagos ni envío real).
   Se usa localStorage para compartir el estado entre páginas
   del prototipo. Ningún dato sale de este navegador.
   ============================================ */

const CLAVE_CARRITO = "delisabor_carrito";

function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(items) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  actualizarContadorCarrito();
}

function agregarAlCarrito(item) {
  const items = obtenerCarrito();
  items.push({ ...item, id: Date.now().toString() });
  guardarCarrito(items);
}

function quitarDelCarrito(id) {
  const items = obtenerCarrito().filter((item) => item.id !== id);
  guardarCarrito(items);
  renderizarPanelCarrito();
}

function vaciarCarrito() {
  guardarCarrito([]);
  renderizarPanelCarrito();
}

function actualizarContadorCarrito() {
  const contador = document.querySelector(".contador-carrito");
  if (!contador) return;
  const cantidad = obtenerCarrito().length;
  contador.textContent = cantidad;
  contador.dataset.vacio = cantidad === 0 ? "true" : "false";
}

function renderizarPanelCarrito() {
  const lista = document.getElementById("lista-carrito");
  if (!lista) return;

  const items = obtenerCarrito();

  if (items.length === 0) {
    lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío. Arma tu pastel en la sección de Personalización.</p>`;
    return;
  }

  lista.innerHTML = "";
  items.forEach((item) => {
    const el = document.createElement("div");
    el.className = "item-carrito";
    el.innerHTML = `
      <div class="item-carrito__titulo">
        <span>${item.titulo}</span>
        <button class="item-carrito__quitar" data-id="${item.id}">Quitar</button>
      </div>
      <p class="item-carrito__detalle">${item.detalle}</p>
    `;
    lista.appendChild(el);
  });

  lista.querySelectorAll(".item-carrito__quitar").forEach((boton) => {
    boton.addEventListener("click", () => quitarDelCarrito(boton.dataset.id));
  });
}

function construirResumenParaPedido() {
  const items = obtenerCarrito();
  if (items.length === 0) return "";
  return items
    .map((item, i) => `${i + 1}. ${item.titulo} — ${item.detalle}`)
    .join("\n");
}

function inicializarPanelCarrito() {
  const boton = document.querySelector(".boton-carrito");
  const panel = document.getElementById("panel-carrito");
  const fondo = document.getElementById("fondo-oscuro");
  const cerrar = document.getElementById("cerrar-carrito");

  if (!boton || !panel) return;

  const abrir = () => {
    panel.classList.add("abierto");
    fondo.classList.add("visible");
    renderizarPanelCarrito();
  };

  const cerrarPanel = () => {
    panel.classList.remove("abierto");
    fondo.classList.remove("visible");
  };

  boton.addEventListener("click", abrir);
  cerrar?.addEventListener("click", cerrarPanel);
  fondo?.addEventListener("click", cerrarPanel);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  inicializarPanelCarrito();
});
