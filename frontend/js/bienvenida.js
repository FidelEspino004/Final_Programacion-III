// bienvenida.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-nombre");
    const inputNombre = document.getElementById("nombre");
    const mensajeError = document.getElementById("mensaje-error");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = inputNombre.value.trim();

        if (nombre.length < 2) {
            // mostrar error
            inputNombre.classList.add("is-invalid");
            mensajeError.classList.remove("d-none");
            mensajeError.textContent = "Ingresá un nombre de al menos 3 caracteres.";
            return;
        }

        // guardar nombre y redirigir
        localStorage.setItem("nombreUsuario", nombre);
        window.location.href = "html/productos.html";
    });
});