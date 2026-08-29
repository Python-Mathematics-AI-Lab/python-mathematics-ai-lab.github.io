(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const revealItems = document.querySelectorAll(".home-page .reveal");
        const carousel = document.querySelector("[data-news-carousel]");

        if (carousel) {
            const track = carousel.querySelector(".updates-track");
            const slides = carousel.querySelectorAll(".update-slide");
            const dots = carousel.querySelectorAll(".updates-dot");
            const previousButton = carousel.querySelector("[data-news-prev]");
            const nextButton = carousel.querySelector("[data-news-next]");
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
            let currentIndex = 0;
            let rotationTimer = null;
            let isPaused = false;
            let touchStartX = 0;

            function renderSlide(index) {
                currentIndex = (index + slides.length) % slides.length;
                track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
                slides.forEach(function (slide, slideIndex) {
                    const isActive = slideIndex === currentIndex;
                    slide.classList.toggle("is-active", isActive);
                    slide.setAttribute("aria-hidden", String(!isActive));
                });
                dots.forEach(function (dot, dotIndex) {
                    const isActive = dotIndex === currentIndex;
                    dot.classList.toggle("is-active", isActive);
                    dot.setAttribute("aria-selected", String(isActive));
                });
            }

            function stopRotation() {
                if (rotationTimer !== null) {
                    window.clearInterval(rotationTimer);
                    rotationTimer = null;
                }
            }

            function startRotation() {
                stopRotation();
                if (!reduceMotion.matches && !isPaused) {
                    rotationTimer = window.setInterval(function () {
                        renderSlide(currentIndex + 1);
                    }, 7000);
                }
            }

            function interact(nextIndex) {
                renderSlide(nextIndex);
                startRotation();
            }

            previousButton.addEventListener("click", function () { interact(currentIndex - 1); });
            nextButton.addEventListener("click", function () { interact(currentIndex + 1); });
            dots.forEach(function (dot, dotIndex) {
                dot.addEventListener("click", function () { interact(dotIndex); });
                dot.addEventListener("keydown", function (event) {
                    if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); interact(currentIndex - 1); dots[currentIndex].focus(); }
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); interact(currentIndex + 1); dots[currentIndex].focus(); }
                });
            });
            carousel.addEventListener("mouseenter", function () { isPaused = true; stopRotation(); });
            carousel.addEventListener("mouseleave", function () { isPaused = false; startRotation(); });
            carousel.addEventListener("focusin", function () { isPaused = true; stopRotation(); });
            carousel.addEventListener("focusout", function (event) {
                if (!carousel.contains(event.relatedTarget)) { isPaused = false; startRotation(); }
            });
            carousel.addEventListener("touchstart", function (event) { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
            carousel.addEventListener("touchend", function (event) {
                const distance = event.changedTouches[0].clientX - touchStartX;
                if (Math.abs(distance) > 45) { interact(currentIndex + (distance < 0 ? 1 : -1)); }
            }, { passive: true });
            renderSlide(0);
            startRotation();
        }

        if (!revealItems.length) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            revealItems.forEach(function (item) {
                item.classList.add("is-visible");
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    });
}());