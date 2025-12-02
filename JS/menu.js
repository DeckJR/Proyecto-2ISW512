const btn = document.getElementById("menu-btn");
const menuMobile = document.getElementById("menu-mobile");
btn.addEventListener("click", () => {
    menuMobile.classList.toggle("hidden");
});