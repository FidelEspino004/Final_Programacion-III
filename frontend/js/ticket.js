document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const nombreUsuario = localStorage.getItem("nombreUsuario") || "Invitado";

    // ===== Usuario =====
    document.getElementById("ticket-usuario").textContent = nombreUsuario;

    // ===== Fecha de hoy =====
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    document.getElementById("ticket-fecha").textContent = fechaFormateada;

    // ===== Productos =====
    const contenedor = document.getElementById("ticket-productos");
    let total = 0;
    let html = "";

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        html += `
            <div class="ticket-item d-flex justify-content-between align-items-center">
                <div>
                    <span class="ticket-item-nombre">${item.nombre}</span>
                    <span class="ticket-item-cantidad"> x${item.cantidad}</span>
                </div>
                <span class="ticket-item-precio">
                    $${subtotal.toLocaleString("es-AR")}
                </span>
            </div>
        `;
    }

    contenedor.innerHTML = html || "<p class='text-muted small'>Sin productos.</p>";

    // ===== Total =====
    document.getElementById("ticket-total").textContent =
        "$" + total.toLocaleString("es-AR");
});

// ===== Descargar PDF =====
function descargarPDF() {
    const elemento = document.getElementById("ticket-pdf");

    const opciones = {
        margin: 10,
        filename: "ticket-y2k-market.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a5", orientation: "portrait" }
    };

    html2pdf().set(opciones).from(elemento).save();
}

// ===== Salir =====
function salir() {
    localStorage.removeItem("carrito");
    localStorage.removeItem("nombreUsuario");
    window.location.href = "../index.html";
}