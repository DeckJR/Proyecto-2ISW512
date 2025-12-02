// Validación del reCAPTCHA
function validarCaptcha() {
    let response = grecaptcha.getResponse();
    if (response.length === 0) {
        alert("Por favor completa el reCAPTCHA.");
        return false;
    }
    return true;
}

// Mostrar modal con los datos llenados por el usuario
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar captcha antes de mostrar el modal
    if (!validarCaptcha()) return;

    const datos = {
        Fecha: document.querySelector("input[name='date']").value,
        Nombre: document.querySelector("input[name='name']").value,
        Sexo: document.querySelector("input[name='sexo']:checked")?.value || "No indicado",
        Teléfono: document.querySelector("input[name='phone']").value,
        Correo: document.querySelector("input[name='email']").value,
        Mensaje: document.querySelector("textarea[name='message']").value
    };

    let html = "";
    for (let campo in datos) {
        html += `<p><strong>${campo}:</strong> ${datos[campo]}</p>`;
    }

    document.getElementById("contenidoModal").innerHTML = html;

    const modal = document.getElementById("modalDatos");
    modal.classList.remove("hidden");
    modal.style.opacity = "1"; // animación suave
});

// Cerrar modal sin enviar
function cerrarModal() {
    const modal = document.getElementById("modalDatos");
    modal.style.opacity = "0";
    setTimeout(() => modal.classList.add("hidden"), 200);
}

// Enviar el formulario después de confirmar
function enviarFormulario() {
    document.getElementById("modalDatos").classList.add("hidden");
    document.querySelector("form").submit();
}

// Mapa interactivo
var map = L.map('mapa').setView([10.006492, -84.217177], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

L.marker([10.006492, -84.217177]).addTo(map)
    .bindPopup("Universidad Técnica Nacional (Sede Central)").openPopup();