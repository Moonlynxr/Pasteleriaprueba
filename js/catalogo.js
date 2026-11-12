/* ============================================
   CATALOGO.JS
   Renderiza las tarjetas de producto en productos.html.
   Solo los pasteles (personajes, esculpidos, individuales) son
   personalizables y pasan por el configurador. Pays y chocoflán
   no se personalizan: se agregan directo al carrito.
   ============================================ */

const CATEGORIAS_PERSONALIZABLES = [
  "Pasteles de personajes",
  "Pasteles esculpidos",
  "Pasteles individuales",
];

const PRODUCTOS = [
  {
    id: "p1",
    categoria: "Pasteles de personajes",
    nombre: "Pastel de personaje",
    descripcion: "Pastel decorado con el personaje o tema que elijas para tu fiesta.",
    foto: "img/productos/pastel_personajes.png",
  },
  {
    id: "p2",
    categoria: "Pasteles esculpidos",
    nombre: "Pastel esculpido",
    descripcion: "Diseño trabajado a mano, con formas y acabados fuera de lo común.",
    foto: "img/productos/pastel_esculpido.png",
  },
  {
    id: "p3",
    categoria: "Pasteles individuales",
    nombre: "Pastel individual",
    descripcion: "Porción personal, ideal para mesas de postre o un antojo para uno.",
    foto: "img/productos/pastel_individual.png",
  },
  {
    id: "p4",
    categoria: "Pays",
    nombre: "Pay",
    descripcion: "Pay clásico, perfecto para compartir en familia.",
    foto: "img/productos/pay.png",
  },
  {
    id: "p5",
    categoria: "Chocoflán",
    nombre: "Chocoflán",
    descripcion: "El combo de chocolate y flan en una sola pieza, para toda la mesa.",
    foto: "img/productos/chocoflan.png",
  },
];

const ICONO_PERSONALIZAR = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3v3M12 3c-2 0-3 1.3-3 3 0 1.5 1 2 1 3.5S9 12 9 13.5a3 3 0 006 0c0-1.5-1-2-1-3.5s1-2 1-3.5c0-1.7-1-3-3-3z"/>
    <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
  </svg>`;

const ICONO_AGREGAR = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
    <path d="M12 9v4M10 11h4"/>
  </svg>`;

function crearAccionProducto(producto) {
  const esPersonalizable = CATEGORIAS_PERSONALIZABLES.includes(producto.categoria);

  if (esPersonalizable) {
    const enlace = document.createElement("a");
    enlace.className = "boton boton-primario boton-accion-producto";
    enlace.href = `personalizacion.html?categoria=${encodeURIComponent(producto.categoria)}`;
    enlace.innerHTML = `${ICONO_PERSONALIZAR}<span>Personalizar este pastel</span>`;
    return enlace;
  }

  const boton = document.createElement("button");
  boton.className = "boton boton-primario boton-accion-producto";
  boton.type = "button";
  boton.innerHTML = `${ICONO_AGREGAR}<span>Agregar al pedido</span>`;
  boton.addEventListener("click", () => {
    agregarAlCarrito({
      titulo: producto.nombre,
      detalle: "Producto solicitado tal como se muestra, sin personalización.",
    });
    const textoOriginal = boton.innerHTML;
    boton.innerHTML = `${ICONO_AGREGAR}<span>Agregado al carrito</span>`;
    boton.disabled = true;
    setTimeout(() => {
      boton.innerHTML = textoOriginal;
      boton.disabled = false;
    }, 1800);
  });
  return boton;
}

function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-producto";
  tarjeta.dataset.categoria = producto.categoria;

  tarjeta.innerHTML = `
    <img class="tarjeta-producto__foto" src="${producto.foto}" alt="${producto.nombre}" loading="lazy">
    <div class="tarjeta-producto__cuerpo">
      <span class="tarjeta-producto__categoria">${producto.categoria}</span>
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="tarjeta-producto__cotizacion">Precio sobre cotización personalizada</p>
      <div class="tarjeta-producto__acciones"></div>
    </div>
  `;

  tarjeta.querySelector(".tarjeta-producto__acciones").appendChild(crearAccionProducto(producto));

  return tarjeta;
}

function renderizarProductos(filtro = "Todos") {
  const contenedor = document.getElementById("rejilla-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  const lista = filtro === "Todos"
    ? PRODUCTOS
    : PRODUCTOS.filter((p) => p.categoria === filtro);

  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="carrito-vacio">No hay productos en esta categoría todavía.</p>`;
    return;
  }

  lista.forEach((producto) => {
    contenedor.appendChild(crearTarjetaProducto(producto));
  });
}

function inicializarFiltros() {
  const chips = document.querySelectorAll(".filtro-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      renderizarProductos(chip.dataset.filtro);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("rejilla-productos")) {
    renderizarProductos();
    inicializarFiltros();
  }
});
