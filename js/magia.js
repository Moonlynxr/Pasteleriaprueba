/* ======================================
   magia.js — "funcionalidades" de más
====================================== */

const EMOJIS_CHISPA = ["✨","🤖","💫","🪄","⭐","🌟"];

document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.85) {
    const chispa = document.createElement("div");
    chispa.className = "chispa";
    chispa.style.left = e.clientX + "px";
    chispa.style.top = e.clientY + "px";
    chispa.textContent = EMOJIS_CHISPA[Math.floor(Math.random() * EMOJIS_CHISPA.length)];
    document.body.appendChild(chispa);
    setTimeout(() => chispa.remove(), 1000);
  }
});

function inicializarAvisoIA() {
  const aviso = document.createElement("div");
  aviso.className = "aviso-ia";
  aviso.innerHTML = `🍪🤖 Este sitio usa IA, cookies, magia y buena vibra para mejorar tu experiencia de repostería digital. <button id="btn-aceptar-ia">Aceptar todo</button>`;
  document.body.appendChild(aviso);
  document.getElementById("btn-aceptar-ia").addEventListener("click", () => {
    alert("¡Gracias por aceptar todo! (igual seguimos usando tus datos 😎)");
  });
}

function inicializarWhatsappFlotante() {
  const boton = document.createElement("div");
  boton.className = "flotante-whatsapp";
  boton.textContent = "💬";
  boton.title = "Escríbenos (no funciona, es de mentiras)";
  boton.addEventListener("click", () => alert("¡Hola! 🤖 Un asistente de IA te contestará en 3 a 5 días hábiles."));
  document.body.appendChild(boton);
}

function saludoBienvenida() {
  setTimeout(() => {
    alert("👋 ¡Bienvenid@ a nuestro sitio potenciado con Inteligencia Artificial de última generación! 🚀🤖✨");
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarAvisoIA();
  inicializarWhatsappFlotante();
  saludoBienvenida();
});
