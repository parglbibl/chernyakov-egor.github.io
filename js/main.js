// =====================================
// Егор Черняков — main.js
// =====================================

// ===== 1. ТЕКУЩИЙ ГОД В ПОДВАЛЕ =====
document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});

// ===== 2. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРЕЙ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// =====================================
// 3. ГАЛЕРЕЯ И ЛАЙТБОКС
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    // Создаём структуру лайтбокса один раз
    let overlay = document.querySelector('.lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <span class="close-btn">&times;</span>
                <img src="" alt="Увеличенное фото">
                <div class="caption"></div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const lightboxImg = overlay.querySelector('img');
    const caption = overlay.querySelector('.caption');
    const closeBtn = overlay.querySelector('.close-btn');

    // Функция получения подписи
    function getCaption(item) {
        return item.getAttribute('data-caption') || 'Мозаика из кубиков Рубика';
    }

    // Открыть лайтбокс
    function openLightbox(src, captionText) {
        lightboxImg.src = src;
        caption.textContent = captionText;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Закрыть лайтбокс
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Клик по элементам галереи
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const captionText = getCaption(this);

            if (img && img.src && !img.src.includes('undefined')) {
                openLightbox(img.src, captionText);
            } else {
                alert('🖼 Фото пока не загружено. Замените заглушку на своё фото!');
            }
        });
    });

    // Закрытие по крестику
    closeBtn.addEventListener('click', closeLightbox);

    // Закрытие по клику на фон
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

});