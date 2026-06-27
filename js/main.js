// =====================================
// main.js — Егор Черняков
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // ===== 1. ТЕКУЩИЙ ГОД В ПОДВАЛЕ =====
    const year = document.getElementById("current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ===== 2. ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // ===== 3. ЗВЁЗДНОЕ НЕБО (CSS-ЗВЁЗДЫ) =====
    function initStars() {
        const container = document.getElementById('starsContainer');
        if (!container) return;
        
        const starCount = 400;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star-dot';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2.5 + 0.5;
            const opacity = Math.random() * 0.6 + 0.2;
            
            star.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                opacity: ${opacity};
            `;
            
            container.appendChild(star);
        }
    }
    
    initStars();

});