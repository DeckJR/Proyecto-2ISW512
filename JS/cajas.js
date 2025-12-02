const headers = document.querySelectorAll('.cajita-header');
headers.forEach(h => {
    h.addEventListener('click', () => {
        const targetId = h.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
    // Cerrar las cajas (unicamente una abierta)
        document.querySelectorAll('.cajita-panel').forEach(panel => {
            if (panel !== targetPanel) panel.classList.add('hidden');
        });
        document.querySelectorAll('.cajita-icon').forEach(icon => {
            if (icon !== h.querySelector('.cajita-icon')) {
                icon.style.transform = "rotate(0deg)";
            }
        });
    // Toggle del panel actual
        const isHidden = targetPanel.classList.contains('hidden');
        targetPanel.classList.toggle('hidden');
    // Rotar flecha
        const icon = h.querySelector('.cajita-icon');
        icon.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
    });
});