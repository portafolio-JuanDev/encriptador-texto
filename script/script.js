//--Selección de Elementos//
const btnEncriptar = document.querySelector(".btn-encriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto-aviso");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta-contenedor");
const btnCopiar = document.querySelector(".btn-copiar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");

//--Funciones Utilitarias//
function mostrarAviso(mensaje) {
    aviso.style.background = "#0A3871";
    aviso.style.color = "#FFFF";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    
    setTimeout(() => {
        aviso.removeAttribute("style");
    }, 1500);
}

function encriptarTexto(texto) {
    return texto
        .replace(/e/mg, "enter")
        .replace(/i/mg, "imes")
        .replace(/a/mg, "ai")
        .replace(/o/mg, "ober")
        .replace(/u/mg, "ufat");
}

function desencriptarTexto(texto) {
    return texto
        .replace(/enter/mg, "e")
        .replace(/imes/mg, "i")
        .replace(/ai/mg, "a")
        .replace(/ober/mg, "o")
        .replace(/ufat/mg, "u");
}

function validarTexto(texto) {
    const textoNormalizado = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
    
    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacío");
        return false;
    }
    if (/\d/.test(texto)) { // Verifica si el texto contiene números
        mostrarAviso("El texto no debe contener números");
        return false;
    }
    if (texto !== textoNormalizado) {
        mostrarAviso("No debe tener acentos y caracteres especiales");
        return false;
    }
    if (texto !== texto.toLowerCase()) {
        mostrarAviso("El texto debe ser todo en minúscula");
        return false;
    }
    return true;
}

//-Boton de Encriptar//
btnEncriptar.addEventListener("click", e => {
    e.preventDefault();
    const texto = txtEncriptar.value;
    if (validarTexto(texto)) {
        const textoEncriptado = encriptarTexto(texto);
        respuesta.innerHTML = textoEncriptado;
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }
});

//-Boton de Desencriptar//
btnDesencriptar.addEventListener("click", e => {
    e.preventDefault();
    const texto = txtEncriptar.value;
    if (validarTexto(texto)) {
        const textoDesencriptado = desencriptarTexto(texto);
        respuesta.innerHTML = textoDesencriptado;
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }
});

//-Boton de Copiar//
btnCopiar.addEventListener("click", e => {
    e.preventDefault();
    const copiar = document.createElement("textarea");
    copiar.value = respuesta.textContent;
    document.body.appendChild(copiar);
    copiar.select();
    document.execCommand("copy");
    document.body.removeChild(copiar);
});
