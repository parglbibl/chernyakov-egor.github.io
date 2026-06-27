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

    // ===== 3. ЗВЁЗДНОЕ НЕБО НА CANVAS =====
    function initStars() {
        const canvas = document.getElementById('starsCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        const starCount = 400;
        
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        
        function createStars() {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.6 + 0.2
                });
            }
        }
        
        function drawStars() {
            ctx.clearRect(0, 0, width, height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
            });
        }
        
        window.addEventListener('resize', () => {
            resize();
            createStars();
            drawStars();
        });
        
        resize();
        createStars();
        drawStars();
    }
    
    initStars();

});