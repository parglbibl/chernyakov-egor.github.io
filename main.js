// ============================================
// main.js — Егор Черняков
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ----- 1. АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ -----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ----- 2. ТЕКУЩИЙ ГОД В ПОДВАЛЕ -----
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ----- 3. ПЛАВНАЯ АНИМАЦИЯ КАРТОЧЕК (появление) -----
    const cards = document.querySelectorAll('.project-card, .achievement-list li');
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
});