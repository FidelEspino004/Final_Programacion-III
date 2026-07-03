document.addEventListener("DOMContentLoaded",()=>{

    const toggle=document.getElementById("darkmode-toggle");

    const tema=localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-bs-theme",tema);

    toggle.checked=tema==="dark";

    toggle.addEventListener("change",()=>{

        const nuevoTema=toggle.checked ? "dark":"light";

        document.documentElement.setAttribute("data-bs-theme",nuevoTema);

        localStorage.setItem("theme",nuevoTema);

    });

});