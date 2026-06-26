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
// 3. ГАЛЕРЕЯ И ЛАЙТБОКС — РАБОТАЕТ НА ВСЕХ УСТРОЙСТВАХ
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    console.log("main.js загружен!"); // Проверка, что файл вообще запускается

    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log("Найдено элементов с классом gallery-item:", galleryItems.length);

    if (galleryItems.length === 0) return;

    // Создаём лайтбокс
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
        console.log("Лайтбокс создан!");
    }

    const lightboxImg = overlay.querySelector('img');
    const caption = overlay.querySelector('.caption');
    const closeBtn = overlay.querySelector('.close-btn');

    function getCaption(item) {
        return item.getAttribute('data-caption') || 'Мозаика из кубиков Рубика';
    }

    function openLightbox(src, captionText) {
        console.log("Открываем лайтбокс с фото:", src);
        lightboxImg.src = src;
        caption.textContent = captionText;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обработчик клика
    function handleGalleryClick(e) {
        const item = e.currentTarget;
        const img = item.querySelector('img');
        const captionText = getCaption(item);
        console.log("Клик по элементу галереи, caption:", captionText);

        if (img && img.src && !img.src.includes('undefined')) {
            openLightbox(img.src, captionText);
        } else {
            alert('🖼 Фото пока не загружено. Замените заглушку на своё фото!');
        }
    }

    // Вешаем обработчики
    galleryItems.forEach(function(item) {
        item.addEventListener('click', handleGalleryClick);
        item.addEventListener('touchstart', handleGalleryClick, { passive: true });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('touchstart', closeLightbox, { passive: true });
    }

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    });
    overlay.addEventListener('touchstart', function(e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    }, { passive: true });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

});