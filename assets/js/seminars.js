(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const items = document.querySelectorAll(
            ".seminars-page .seminars-hero-container, .seminars-page .seminars-section-heading, .seminars-page .event-card, .seminars-page .archive-card, .seminars-page .invite-content, .seminars-page .invite-highlight, .seminars-page .request-information, .seminars-page .invite-form-wrapper, .seminars-page .seminars-cta"
        );

        items.forEach(function (item) {
            item.classList.add("seminar-reveal");
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
