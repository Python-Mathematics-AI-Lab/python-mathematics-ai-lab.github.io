(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("resourceSearch");
        const searchButton = document.getElementById("searchButton");
        const cards = [...document.querySelectorAll(".resources-card")];
        const filters = [...document.querySelectorAll(".resource-filter")];
        const count = document.querySelector(".resource-count");
        const emptyState = document.querySelector(".resources-empty");
        let activeFilter = "all";

        cards.forEach(function (card) {
            card.classList.add("resource-reveal");
        });

        function updateResources() {
            const term = (searchInput ? searchInput.value : "").trim().toLowerCase();
            let visibleCount = 0;

            cards.forEach(function (card) {
                const categories = (card.getAttribute("data-category") || "").toLowerCase();
                const text = (card.textContent + " " + categories).toLowerCase();
                const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
                const matchesSearch = !term || text.includes(term);
                const visible = matchesFilter && matchesSearch;
                card.hidden = !visible;
                if (visible) {
                    visibleCount += 1;
                    card.classList.add("is-visible");
                }
            });

            if (count) {
                count.textContent = visibleCount + " resource areas";
            }
            if (emptyState) {
                emptyState.hidden = visibleCount !== 0;
            }
        }

        filters.forEach(function (filter) {
            filter.addEventListener("click", function () {
                activeFilter = filter.getAttribute("data-filter") || "all";
                filters.forEach(function (item) {
                    const active = item === filter;
                    item.classList.toggle("is-active", active);
                    item.setAttribute("aria-pressed", String(active));
                });
                updateResources();
            });
            filter.setAttribute("aria-pressed", String(filter.classList.contains("is-active")));
        });

        if (searchInput) {
            searchInput.addEventListener("input", updateResources);
        }
        if (searchButton) {
            searchButton.addEventListener("click", updateResources);
        }

        if (!("IntersectionObserver" in window)) {
            cards.forEach(function (card) {
                card.classList.add("is-visible");
            });
        } else {
            const observer = new IntersectionObserver(function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                });
            }, { threshold: 0.1 });
            cards.forEach(function (card) {
                observer.observe(card);
            });
        }

        updateResources();
    });
}());
