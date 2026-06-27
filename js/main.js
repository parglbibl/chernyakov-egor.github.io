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

    // ===== 3. ЛАЙТБОКС ДЛЯ ГАЛЕРЕИ =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
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

        function getCaption(item) {
            return item.getAttribute('data-caption') || 'Мозаика из кубиков Рубика';
        }

        function openLightbox(src, captionText) {
            lightboxImg.src = src;
            caption.textContent = captionText;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        function handleGalleryClick(e) {
            const item = e.currentTarget;
            const img = item.querySelector('img');
            const placeholder = item.querySelector('.placeholder');
            const captionText = getCaption(item);

            if (img && img.src && !img.src.includes('undefined')) {
                openLightbox(img.src, captionText);
            } else if (placeholder) {
                alert('🖼 Фото пока не загружено. Замените заглушку на своё фото!');
            }
        }

        galleryItems.forEach(item => {
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
    }

    // ===== 4. КНОПКА «НАВЕРХ» =====
    const backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.innerHTML = '';
    backBtn.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(backBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });

    backBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});