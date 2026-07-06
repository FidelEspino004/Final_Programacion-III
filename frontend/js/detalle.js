// ===== Productos (mismo array que productos.js) =====
const productos = [
    { id: 1,  nombre: "PlayStation 5",        precio: 850000, imagen: null, tipo: "consola",      activo: true },
    { id: 2,  nombre: "Xbox Series X",         precio: 780000, imagen: null, tipo: "consola",      activo: true },
    { id: 3,  nombre: "Nintendo Switch",       precio: 420000, imagen: null, tipo: "consola",      activo: true },
    { id: 4,  nombre: "Steam Deck",            precio: 650000, imagen: null, tipo: "consola",      activo: true },
    { id: 5,  nombre: "PlayStation 4",         precio: 350000, imagen: null, tipo: "consola",      activo: true },
    { id: 6,  nombre: "Xbox Series S",         precio: 480000, imagen: null, tipo: "consola",      activo: true },
    { id: 7,  nombre: "Sony Walkman NW-A306",  precio: 320000, imagen: null, tipo: "reproductor",  activo: true },
    { id: 8,  nombre: "iPod Touch 7G",         precio: 280000, imagen: null, tipo: "reproductor",  activo: true },
    { id: 9,  nombre: "Fiio M11S",             precio: 490000, imagen: null, tipo: "reproductor",  activo: true },
    { id: 10, nombre: "Shanling M3 Ultra",     precio: 360000, imagen: null, tipo: "reproductor",  activo: true },
    { id: 11, nombre: "Astell&Kern SR25",      precio: 580000, imagen: null, tipo: "reproductor",  activo: true },
    { id: 12, nombre: "HiBy R3 Pro",           precio: 210000, imagen: null, tipo: "reproductor",  activo: true },
];

let productoActual = null;

document.addEventListener("DOMContentLoaded", () => {
    const id = parseInt(localStorage.getItem("productoDetalle"));

    // Buscar el producto por id
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            productoActual = productos[i];
            break;
        }
    }

    if (!productoActual) {
        window.location.href = "productos.html";
        return;
    }

    renderizarDetalle(productoActual);
});

// ===== Renderizar detalle =====
function renderizarDetalle(producto) {
    const imagen     = document.getElementById("detalle-imagen");
    const placeholder = document.getElementById("detalle-imagen-placeholder");
    const nombre     = document.getElementById("detalle-nombre");
    const precio     = document.getElementById("detalle-precio");
    const tipo       = document.getElementById("detalle-tipo");

    // Tipo badge
    const tipoTexto = producto.tipo === "consola" ? "Consola" : "Reproductor";
    const tipoIcono = producto.tipo === "consola" ? "bi-controller" : "bi-music-player";
    tipo.innerHTML = `<i class="bi ${tipoIcono} me-1"></i>${tipoTexto}`;

    // Nombre
    nombre.textContent = producto.nombre;

    // Precio
    const precioFormateado = producto.precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0
    });
    precio.textContent = precioFormateado;

    // Imagen
    if (producto.imagen) {
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
    } else {
        imagen.classList.add("d-none");
        placeholder.classList.remove("d-none");
    }
}

// ===== Agregar al carrito desde detalle =====
function agregarDesdeDetalle() {
    if (!productoActual) return;
    agregarAlCarrito(productoActual);

    // Feedback visual en el botón
    const btn = document.querySelector(".detalle-btn-carrito");
    btn.innerHTML = `<i class="bi bi-check-lg me-2"></i>¡Agregado!`;
    btn.classList.add("agregado");

    setTimeout(() => {
        btn.innerHTML = `<i class="bi bi-cart-plus me-2"></i>Agregar al carrito`;
        btn.classList.remove("agregado");
    }, 1500);
}