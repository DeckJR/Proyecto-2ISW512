const cajas = document.querySelectorAll(".encabezado");
cajas.forEach(caja => {
    caja.addEventListener("click", () => {
        const respuesta = caja.nextElementSibling;
        document.querySelectorAll(".respuesta").forEach(r => {
            if (r !== respuesta) r.classList.remove("activo");
        });
        respuesta.classList.toggle("activo");
    });
});
// Cargar datos del autor desde JSON
fetch("data/autor.json")
    .then(resp => resp.json())
    .then(data => {
        document.getElementById("autorNombre").textContent = data.nombre;
        document.getElementById("autorCarrera").textContent = data.carrera;
        document.getElementById("autorCorreo").textContent = data.correo;
        document.getElementById("autorDescripcion").textContent = data.descripcion;
    })
    .catch(err => console.error("Error cargando autor.json:", err));