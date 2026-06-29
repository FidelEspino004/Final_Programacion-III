document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const temaGuardado = localStorage.getItem('theme'); 

    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true; 
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark'); 
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});