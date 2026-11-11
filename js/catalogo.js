/* ============================================
   CATALOGO.JS
   Renderiza las tarjetas de producto en productos.html

   NOTA PARA EL DESARROLLADOR:
   Los productos de este arreglo son CONTENIDO DE EJEMPLO.
   El cliente no proporcionó nombres, descripciones ni fotos
   reales de productos específicos (ver Fase 1 del análisis).
   Reemplazar por el catálogo real en cuanto el cliente lo entregue.
   Las categorías sí son reales (confirmadas en el formulario).
   ============================================ */

const PRODUCTOS = [
  {
    id: "p1",
    categoria: "Pasteles",
    nombre: "Pastel personalizado clásico",
    descripcion: "Pastel a la medida, ideal para cumpleaños y celebraciones familiares.",
    ingredientesEjemplo: "Bizcocho, relleno a elección, cobertura a elección",
    tamanos: "Chico, mediano, grande, extra grande",
  },
  {
    id: "p2",
    categoria: "Pasteles",
    nombre: "Pastel temático de personaje",
    descripcion: "Diseño inspirado en el personaje o tema que elijas para tu evento.",
    ingredientesEjemplo: "Bizcocho, relleno a elección, decoración modelada",
    tamanos: "Mediano, grande, extra grande",
  },
  {
    id: "p3",
    categoria: "Postres individuales",
    nombre: "Postre individual surtido",
    descripcion: "Porciones personales ideales para mesas de postres o detalles de evento.",
    ingredientesEjemplo: "Bizcocho o base de galleta, relleno a elección",
    tamanos: "Porción individual",
  },
  {
    id: "p4",
    categoria: "Pays y tartas",
    nombre: "Pay de temporada",
    descripcion: "Pay artesanal, perfecto para compartir en familia.",
    ingredientesEjemplo: "Base horneada, relleno a elección",
    tamanos: "Chico, mediano, grande",
  },
  {
    id: "p5",
    categoria: "Pays y tartas",
    nombre: "Tarta decorada",
    descripcion: "Tarta con decoración personalizada para ocasiones especiales.",
    ingredientesEjemplo: "Base horneada, relleno a elección, decoración",
    tamanos: "Mediano, grande",
  },
  {
    id: "p6",
    categoria: "Postres individuales",
    nombre: "Mini postre para eventos",
    descripcion: "Presentación pequeña pensada para mesas de dulces en eventos.",
    ingredientesEjemplo: "Bizcocho, relleno a elección",
    tamanos: "Porción individual",
  },
];

const ICONO_CAMARA = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 7h3l2-2h6l2 2h3v12H4z"/>
    <circle cx="12" cy="13" r="3.5"/>
  </svg>`;

function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-producto";
  tarjeta.dataset.categoria = producto.categoria;

  tarjeta.innerHTML = `
    <div class="placeholder-foto" role="img" aria-label="Foto de ${producto.nombre} pendiente de recibir">
      ${ICONO_CAMARA}
      <span>Foto pendiente</span>
    </div>
    <div class="tarjeta-producto__cuerpo">
      <span class="tarjeta-producto__categoria">${producto.categoria}</span>
      <h3>${producto.nombre} <span class="etiqueta-ejemplo">Ejemplo</span></h3>
      <p>${producto.descripcion}</p>
      <p style="font-size:0.82rem; color:var(--color-texto-suave);">
        <strong>Tamaños:</strong> ${producto.tamanos}
      </p>
      <p class="tarjeta-producto__cotizacion">Precio sobre cotización personalizada</p>
      <div class="tarjeta-producto__acciones">
        <a class="boton boton-primario" href="personalizacion.html?categoria=${encodeURIComponent(producto.categoria)}">Personalizar</a>
      </div>
    </div>
  `;

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
