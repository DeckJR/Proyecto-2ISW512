fetch("data/datosgrafico.json")
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById("grafico");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.redes_sociales,
                datasets: [{
                    label: "Cantidad de Usuarios",
                    data: data.usuarios_2025,
                    backgroundColor: "#C8D9E6",
                    borderColor: "#2F4156",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    });