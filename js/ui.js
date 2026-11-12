/* ============================================
   UI.JS
   Comportamientos generales de interfaz:
   menú móvil y acordeón de preguntas frecuentes.
   ============================================ */

function inicializarMenuMovil() {
  const boton = document.querySelector(".boton-menu-movil");
  const nav = document.querySelector(".nav-principal");
  if (!boton || !nav) return;

  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
  });
}

function inicializarAcordeonFAQ() {
  const items = document.querySelectorAll(".item-faq");
  items.forEach((item) => {
    const pregunta = item.querySelector(".item-faq__pregunta");
    const respuesta = item.querySelector(".item-faq__respuesta");

    pregunta.addEventListener("click", () => {
      const estaAbierto = item.dataset.abierto === "true";

      items.forEach((otro) => {
        otro.dataset.abierto = "false";
        otro.querySelector(".item-faq__respuesta").style.maxHeight = null;
      });

      if (!estaAbierto) {
        item.dataset.abierto = "true";
        respuesta.style.maxHeight = respuesta.scrollHeight + "px";
      }
    });
  });
}

function inicializarLogo() {
  document.querySelectorAll(".logo-img").forEach((img) => {
    img.addEventListener("load", () => {
      img.classList.add("cargado");
      img.nextElementSibling?.classList.add("oculto");
    });
    img.addEventListener("error", () => {
      img.remove();
    });
  });
}

function inicializarFallbackImagenes() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("oculto");
      img.nextElementSibling?.classList.add("visible");
    });
  });
}

function marcarEnlaceActivo() {
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-principal a").forEach((enlace) => {
    const href = enlace.getAttribute("href");
    if (href === paginaActual) {
      enlace.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenuMovil();
  inicializarAcordeonFAQ();
  inicializarLogo();
  inicializarFallbackImagenes();
  marcarEnlaceActivo();
});
