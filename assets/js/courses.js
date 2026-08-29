(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const items = document.querySelectorAll(
            ".courses-page .courses-hero-content, .courses-page .section-heading, .courses-page .filter-card, .courses-page .course-area-heading, .courses-page .course-card, .courses-page .materials-section, .courses-page .faculty-upload-section, .courses-page .courses-final-cta"
        );

        items.forEach(function (item) {
            item.classList.add("course-reveal");
        });

        if (!("IntersectionObserver" in window)) {
            items.forEach(function (item) {
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
        }, { threshold: 0.1 });

        items.forEach(function (item) {
            observer.observe(item);
        });
    });
}());
