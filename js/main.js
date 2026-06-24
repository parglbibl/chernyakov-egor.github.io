document.addEventListener('DOMContentLoaded', function() {

    // ----- 1. АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ -----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ----- 2. ТЕКУЩИЙ ГОД В ПОДВАЛЕ -----
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});