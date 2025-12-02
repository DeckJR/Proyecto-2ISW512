let porcentajes = {};
fetch("data/datoscalculadora.json")
    .then(res => res.json())
    .then(data => {
        porcentajes = data.redes;
    });

    function calcular() {
    let ventas = parseFloat(document.getElementById("ventas").value);
    let red = document.getElementById("redsocial").value;

    if (isNaN(ventas)) {
        document.getElementById("resultado").textContent =
        "Por favor ingrese un número válido.";
        return;
    }
    //Valida para ver si cargaron los porcentajes del json
    if (!porcentajes) {
    document.getElementById("resultado").textContent =
        "Cargando datos... intenta de nuevo en un momento.";
        return;
    }

    let porcentaje = porcentajes[red];
    let aumento = ventas * porcentaje;
    let total = ventas + aumento;
    document.getElementById("resultado").textContent =
    "Con " + red.toUpperCase() +
    ", la ventas estimadas serían de: " + Math.round(total);
}