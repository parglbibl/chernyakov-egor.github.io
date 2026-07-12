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

    // ===== 3. УНИВЕРСАЛЬНЫЙ ЛАЙТБОКС (ДЛЯ ВСЕХ СТРАНИЦ) =====
    var overlay = document.getElementById('lightboxOverlay');
    var img = document.getElementById('lightboxImage');
    var caption = document.getElementById('lightboxCaption');
    var counter = document.getElementById('lightboxCounter');
    var closeBtn = document.getElementById('lightboxClose');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');

    if (overlay && img) {
        var items = document.querySelectorAll('.gallery-item');
        var data = [];

        // Собираем данные со всех картинок с классом gallery-item
        items.forEach(function(el) {
            var src = el.getAttribute('data-src') || el.querySelector('img')?.getAttribute('src');
            var cap = el.getAttribute('data-caption') || el.querySelector('img')?.getAttribute('alt') || 'Фото';
            if (src) {
                data.push({ src: src, cap: cap });
            }
        });

        var currentIndex = 0;

        // Если картинки генерируются динамически (например, в gallery.html), ждём их
        if (data.length === 0) {
            var observer = new MutationObserver(function() {
                var newItems = document.querySelectorAll('.gallery-item');
                if (newItems.length > 0) {
                    newItems.forEach(function(el) {
                        var src = el.getAttribute('data-src') || el.querySelector('img')?.getAttribute('src');
                        var cap = el.getAttribute('data-caption') || el.querySelector('img')?.getAttribute('alt') || 'Фото';
                        if (src && !data.some(function(d) { return d.src === src; })) {
                            data.push({ src: src, cap: cap });
                        }
                    });
                    attachClickHandlers();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            attachClickHandlers();
        }

        function attachClickHandlers() {
            document.querySelectorAll('.gallery-item').forEach(function(el, index) {
                // Удаляем старый обработчик, если есть
                el.removeEventListener('click', clickHandler);
                el.addEventListener('click', clickHandler);
                
                function clickHandler(e) {
                    e.preventDefault();
                    // Находим индекс в глобальном массиве data
                    var src = el.getAttribute('data-src') || el.querySelector('img')?.getAttribute('src');
                    var foundIndex = data.findIndex(function(d) { return d.src === src; });
                    if (foundIndex === -1) {
                        // Если не найден, используем индекс из data-index
                        var idx = parseInt(el.getAttribute('data-index'));
                        if (!isNaN(idx)) {
                            foundIndex = idx;
                        }
                    }
                    if (foundIndex !== -1) {
                        openLightbox(foundIndex);
                    }
                }
            });
        }

        function openLightbox(index) {
            if (data.length === 0) return;
            currentIndex = index;
            var item = data[currentIndex];
            img.src = item.src;
            caption.textContent = item.cap || 'Фото';
            counter.textContent = (currentIndex + 1) + ' / ' + data.length;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Сброс зума при открытии
            img.style.transform = 'scale(1)';
            img.style.cursor = 'zoom-in';
        }

        function closeLightbox() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            img.style.transform = 'scale(1)';
        }

        // Закрытие по крестику и по фону
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeLightbox();
            }
        });

        // Навигация (предыдущая / следующая)
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (data.length === 0) return;
                currentIndex = (currentIndex - 1 + data.length) % data.length;
                openLightbox(currentIndex);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (data.length === 0) return;
                currentIndex = (currentIndex + 1) % data.length;
                openLightbox(currentIndex);
            });
        }

        // Клавиатура (ESC, стрелки влево/вправо)
        document.addEventListener('keydown', function(e) {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            }
            if (e.key === 'ArrowLeft' && prevBtn) {
                prevBtn.click();
            }
            if (e.key === 'ArrowRight' && nextBtn) {
                nextBtn.click();
            }
        });

        // Зум колесиком мыши
        img.addEventListener('wheel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var currentScale = parseFloat(this.style.transform.replace('scale(', '').replace(')', '')) || 1;
            var delta = e.deltaY > 0 ? -0.1 : 0.1;
            currentScale = Math.min(5, Math.max(1, currentScale + delta));
            this.style.transform = 'scale(' + currentScale + ')';
            this.style.cursor = currentScale > 1 ? 'zoom-out' : 'zoom-in';
        }, { passive: false });

        // Двойной клик для сброса зума
        img.addEventListener('dblclick', function() {
            this.style.transform = 'scale(1)';
            this.style.cursor = 'zoom-in';
        });

        // Свайпы для телефона
        var touchStartX = 0;
        overlay.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        overlay.addEventListener('touchend', function(e) {
            var touchEndX = e.changedTouches[0].clientX;
            var diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && nextBtn) {
                    nextBtn.click();
                } else if (prevBtn) {
                    prevBtn.click();
                }
            }
            touchStartX = 0;
        }, { passive: true });
    }
});
