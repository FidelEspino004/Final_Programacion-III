let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cargarCarrito();
});

// ===== Guardar carrito =====
function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

// ===== Agregar producto =====
function agregarAlCarrito(producto) {
    let encontrado = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === producto.id) {
            carrito[i].cantidad++;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });

    }

    guardarCarrito();
}

// ===== Mostrar carrito =====
function cargarCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("contenedorCarrito");

    if (!contenedor) return;
    let html = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        html += crearCardCarrito(carrito[i]);
        total += carrito[i].precio * carrito[i].cantidad;
    }

    contenedor.innerHTML = html;
    actualizarTotal(total);
}

// ===== Crear Card =====
function crearCardCarrito(producto) {

    return `

    <div class="card shadow-sm mb-3">
        <div class="row g-0">

            <div class="col-4">
                <img src="${producto.imagen}" class="img-fluid rounded-start h-100 object-fit-cover">
            </div>

            <div class="col-8">
                <div class="card-body d-flex flex-column h-100">

                    <h5>${producto.nombre}</h5>
                    <p class="fw-bold mb-2">$${producto.precio}</p>

                    <div class="mt-auto d-flex align-items-center gap-2">
                        <button class="btn btn-success" onclick="sumarCantidad(${producto.id})">
                            <i class="bi bi-plus"></i>
                        </button>

                        <span class="fw-bold"> ${producto.cantidad} </span>

                        <button class="btn btn-danger" onclick="restarCantidad(${producto.id})">
                            <i class="bi bi-dash"></i>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </div>

    `;

}


// ===== Aumentar cantidad =====
function sumarCantidad(id) {

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].id === id) {

            carrito[i].cantidad++;

            break;

        }

    }

    guardarCarrito();

    cargarCarrito();

}

// ===== Disminuir cantidad =====
function restarCantidad(id) {

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {

            carrito[i].cantidad--;

            if (carrito[i].cantidad <= 0) {

                carrito.splice(i, 1);

            }

            break;
        }
    }

    guardarCarrito();
    cargarCarrito();
}

// ===== Actualizar total =====
function actualizarTotal(total) {
    const totalHTML = document.getElementById("precioTotal");

    if (totalHTML) {
        totalHTML.textContent = "$" + total.toFixed(2);
    }

}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    cargarCarrito();
}