let images = [
    "img/logo.jpg",
    "img/imgTablet.jpg",
    "img/jovenes.jpg",
    "img/dispositivo.jpg"
];

let index = 0;

setInterval(() => {
    index = (index + 1) % images.length;
    document.getElementById("slide").src = images[index];
}, 3000)