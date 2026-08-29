(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const items = document.querySelectorAll(
            ".about-page .section-heading, .about-page .about-text, .about-page .about-highlight, .about-page .mission-card, .about-page .vision-card, .about-page .objective-card, .about-page .about-area-card, .about-page .philosophy-content, .about-page .learning-path, .about-page .collaboration-grid article, .about-page .about-cta .section-heading"
        );

        items.forEach(function (item) {
            item.classList.add("about-reveal");
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
        }, { threshold: 0.12 });

        items.forEach(function (item) {
            observer.observe(item);
        });
    });
}());
