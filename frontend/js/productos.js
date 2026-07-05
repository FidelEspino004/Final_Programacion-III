// ===== DATOS HARDCODEADOS (hasta tener el backend) =====
const productos = [
    // Consolas
    { id: 1, nombre: "PlayStation 5", precio: 850000, imagen: null, tipo: "consola", activo: true },
    { id: 2, nombre: "Xbox Series X", precio: 780000, imagen: null, tipo: "consola", activo: true },
    { id: 3, nombre: "Nintendo Switch", precio: 420000, imagen: null, tipo: "consola", activo: true },
    { id: 4, nombre: "Steam Deck", precio: 650000, imagen: null, tipo: "consola", activo: true },
    { id: 5, nombre: "PlayStation 4", precio: 350000, imagen: null, tipo: "consola", activo: true },
    { id: 6, nombre: "Xbox Series S", precio: 480000, imagen: null, tipo: "consola", activo: true },

    // Reproductores
    { id: 7,  nombre: "Sony Walkman NW-A306", precio: 320000, imagen: null, tipo: "reproductor", activo: true },
    { id: 8,  nombre: "iPod Touch 7G",        precio: 280000, imagen: null, tipo: "reproductor", activo: true },
    { id: 9,  nombre: "Fiio M11S",            precio: 490000, imagen: null, tipo: "reproductor", activo: true },
    { id: 10, nombre: "Shanling M3 Ultra",    precio: 360000, imagen: null, tipo: "reproductor", activo: true },
    { id: 11, nombre: "Astell&Kern SR25",     precio: 580000, imagen: null, tipo: "reproductor", activo: true },
    { id: 12, nombre: "HiBy R3 Pro",          precio: 210000, imagen: null, tipo: "reproductor", activo: true },
];

let tipoSeleccionado = null;

document.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombreUsuario");
    const saludo = document.getElementById("saludo-usuario");
    if (saludo && nombre) {
        saludo.textContent = `Hola, ${nombre} `;
    }

    // Eventos de categoría
    const btnConsolas = document.getElementById("btn-consolas");
    const btnReproductores = document.getElementById("btn-reproductores");

    btnConsolas.addEventListener("click", () => seleccionarCategoria("consola", btnConsolas, btnReproductores));
    btnReproductores.addEventListener("click", () => seleccionarCategoria("reproductor", btnReproductores, btnConsolas));
});

function seleccionarCategoria(tipo, btnActivo, btnInactivo) {
    tipoSeleccionado = tipo;

    // Resaltar botón activo
    btnActivo.classList.add("activo");
    btnInactivo.classList.remove("activo");

    // Filtrar productos activos del tipo seleccionado
    const filtrados = productos.filter(p => p.tipo === tipo && p.activo);

    mostrarProductos(filtrados);
}

function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    const textoInicial = document.getElementById("texto-inicial");

    // Ocultar texto inicial
    textoInicial.classList.add("d-none");
    contenedor.classList.remove("d-none");

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="text-muted">No hay productos disponibles.</p>`;
        return;
    }

    lista.forEach(producto => {
        contenedor.innerHTML += crearCard(producto);
    });
}

function crearCard(producto) {
    const imagenHTML = producto.imagen
        ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top producto-img">`
        : `<div class="card-img-top producto-img-placeholder d-flex align-items-center justify-content-center">
               <i class="bi bi-image text-secondary" style="font-size: 3rem;"></i>
           </div>`;

    const precioFormateado = producto.precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0
    });

    return `
        <div class="col">
            <div class="card h-100 producto-card border-0 shadow-sm">
                <div class="position-relative">
                    ${imagenHTML}
                    <button
                        class="btn-ojo position-absolute top-0 end-0 m-2"
                        onclick="verDetalle(${producto.id})"
                        title="Ver detalle">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                </div>
                <div class="card-body text-center">
                    <h6 class="card-title fw-bold mb-1">${producto.nombre}</h6>
                    <p class="precio fw-bold mb-0">${precioFormateado}</p>
                <div class="mt-auto d-flex justify-content-end">
                    <button class="btn btn-primary" onclick="agregarAlCarrito(productoPorId(${producto.id}))">
                        <i class="bi bi-cart-plus"></i>
                    </button>
                </div>
                </div>
            </div>
        </div>
    `;
}

function productoPorId(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            return productos[i];
        }
    }
    return null;
}

function verDetalle(id) {
    localStorage.setItem("productoDetalle", id);
    window.location.href = "detalle.html";
}