document.addEventListener("DOMContentLoaded", function() {

    // ===== 1. ГОД В ПОДВАЛЕ =====
    var year = document.getElementById("current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ===== 2. ЗВЁЗДЫ =====
    function initStars() {
        var container = document.getElementById('starsContainer');
        if (!container) return;
        if (container.children.length > 0) return;
        var starCount = 400;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < starCount; i++) {
            var star = document.createElement('div');
            star.className = 'star-dot';
            var x = Math.random() * 100;
            var y = Math.random() * 100;
            var size = Math.random() * 2.5 + 0.5;
            var opacity = Math.random() * 0.6 + 0.2;
            star.style.cssText = 'left:' + x + '%;top:' + y + '%;width:' + size + 'px;height:' + size + 'px;opacity:' + opacity + ';';
            fragment.appendChild(star);
        }
        container.appendChild(fragment);
    }
    initStars();

    // ===== 3. КНОПКА «НАВЕРХ» (КРАСИВАЯ, ИЗЯЩНАЯ) =====
    var backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.innerHTML = '↑'; // Изящная тонкая стрелка вместо жирной

    // Элегантные стили с золотым ободком и свечением
    backBtn.style.cssText = `
        position: fixed !important;
        bottom: 25px !important;
        right: 25px !important;
        left: auto !important;
        width: 50px;
        height: 50px;
        background: transparent;
        color: #d8b45a;
        border: 2px solid #d8b45a;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        font-weight: 300;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9999 !important;
        box-shadow: 0 0 15px rgba(216, 180, 90, 0.1);
        cursor: pointer;
        backdrop-filter: blur(4px);
    `;
    document.body.appendChild(backBtn);

    // Обработка скролла
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backBtn.style.opacity = '1';
            backBtn.style.visibility = 'visible';
        } else {
            backBtn.style.opacity = '0';
            backBtn.style.visibility = 'hidden';
        }
    });

    // Обработка клика
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});