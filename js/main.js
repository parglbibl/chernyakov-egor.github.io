// =====================================
// Егор Черняков — main.js
// =====================================

// Автоматический текущий год в футере

document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});

// =====================================
// Плавная прокрутка для якорей
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});

// =====================================
// Lightbox для галереи
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".gallery img");

    if (!images.length) return;

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    overlay.innerHTML = `
        <div class="lightbox-content">
            <span class="close-btn">&times;</span>
            <img src="" alt="">
        </div>
    `;

    document.body.appendChild(overlay);

    const overlayImg =
        overlay.querySelector("img");

    const closeBtn =
        overlay.querySelector(".close-btn");

    images.forEach(img => {

        img.addEventListener("click", () => {

            overlayImg.src = img.src;

            overlay.classList.add("active");

        });

    });

    closeBtn.addEventListener("click", () => {

        overlay.classList.remove("active");

    });

    overlay.addEventListener("click", e => {

        if (e.target === overlay) {

            overlay.classList.remove("active");

        }

    });

});