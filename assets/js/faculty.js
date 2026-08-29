(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const items = document.querySelectorAll(
            ".faculty-page .faculty-hero-content, .faculty-page .faculty-card, .faculty-page .section-heading, .faculty-page .expertise-list, .faculty-page .faculty-cta .section-heading"
        );

        items.forEach(function (item) {
            item.classList.add("faculty-reveal");
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
