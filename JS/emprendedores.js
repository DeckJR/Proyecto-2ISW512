// Helper: muestra un pequeño toast (retroalimentación visual)
function showToast(msg) {
    let t = document.createElement('div');
    t.textContent = msg;
    t.className = 'fixed bottom-6 right-6 bg-[#2F4156] text-white py-2 px-4 rounded shadow z-50';
    document.body.appendChild(t);
    setTimeout(()=> t.remove(), 2600);
}
let emprendedores = [];
const grid = document.getElementById('gridEmprendedores');

function crearCard(e) {
    const div = document.createElement('article');
    div.className = 'card bg-[#F5EFEB] border-2 border-[#E8DCC5] rounded-lg shadow p-4 transition-all';
    div.tabIndex = 0;
    div.setAttribute('role','article');
    div.innerHTML = `
        <img src="${e.imagen}" alt="${e.nombre}" class="w-full h-36 object-contain bg-[#F5EFEB] rounded">
        <h4 class="mt-2 font-bold text-[#2F4156]">${e.nombre}</h4>
        <p class="text-sm text-gray-600">${e.descripcion}</p>
        <div class="mt-3 flex items-center justify-between">
        <span class="px-2 py-1 text-xs rounded bg-[#E6F4F0] text-[#2F4156]">${e.categoria}</span>
        <div class="flex gap-2">
            <button class="btn-contactar bg-[#C8D9E6] px-3 py-1 rounded hover:bg-[#567C8D] hover:text-white">Contactar</button>
            <button class="btn-fav text-xl" aria-pressed="false" title="Marcar favorito">♡</button>
        </div>
        </div>
    `;

    // Hover / focus: resaltar card
    div.addEventListener('mouseenter', ()=> div.classList.add('card-highlight'));
    div.addEventListener('mouseleave', ()=> div.classList.remove('card-highlight'));
    div.addEventListener('focus', ()=> div.classList.add('card-highlight'));
    div.addEventListener('blur', ()=> div.classList.remove('card-highlight'));

    // Favorito toggle (cambia icono y color)
    const favBtn = div.querySelector('.btn-fav');
    favBtn.addEventListener('click', () => {
        const pressed = favBtn.getAttribute('aria-pressed') === 'true';
        favBtn.setAttribute('aria-pressed', String(!pressed));
        favBtn.textContent = pressed ? '♡' : '❤';
        if (!pressed) favBtn.classList.add('text-pink-600'); else favBtn.classList.remove('text-pink-600');
        showToast(!pressed ? 'Marcado como favorito' : 'Eliminado de favoritos');
    });

    // Contactar: si tiene contactoEspecial ir al enlace sino muestra un mensaje
    const contactBtn = div.querySelector('.btn-contactar');
    contactBtn.addEventListener('click', ()=> {
        if (e.contactoEspecial) {
            window.location.href = e.contactoEspecial;
        } else {
            showToast(`Abrir contacto de ${e.nombre} (simulado)`);
        }
    });

    return div;
    }

    function renderLista(lista) {
    grid.innerHTML = '';
    if (lista.length === 0) {
        grid.innerHTML = `<p class="text-gray-600">No se encontraron emprendedores.</p>`;
        return;
    }
    lista.forEach(item => grid.appendChild(crearCard(item)));
    }

    /* cargar data y activar buscador/filtro */
    fetch('data/emprendedores.json')
    .then(r => r.json())
    .then(data => {
        emprendedores = data;
        renderLista(emprendedores);
    });

    // filtros
    document.getElementById('filtroCategoria').addEventListener('change', aplicarFiltros);
    document.getElementById('buscador').addEventListener('input', aplicarFiltros);
    document.getElementById('orden').addEventListener('change', aplicarFiltros);

    function aplicarFiltros() {
    const q = document.getElementById('buscador').value.trim().toLowerCase();
    const cat = document.getElementById('filtroCategoria').value;
    const orden = document.getElementById('orden').value;

    let lista = emprendedores.filter(e => {
        const matchQ = e.nombre.toLowerCase().includes(q) || e.descripcion.toLowerCase().includes(q);
        const matchCat = (cat === 'all') ? true : e.categoria === cat;
        return matchQ && matchCat;
    });

    if (orden === 'alfabetico') lista.sort((a,b) => a.nombre.localeCompare(b.nombre));

    renderLista(lista);
}