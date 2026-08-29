(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const cards = [...document.querySelectorAll(".blogs-page .blog-card")];
        const searchInput = document.querySelector(".blogs-page .blog-search input");
        const categoryLinks = [...document.querySelectorAll(".blogs-page .blog-category-nav a")];
        let activeCategory = "all";
        let searchTerm = "";

        if (categoryLinks[0]) {
            categoryLinks[0].classList.add("is-active");
            categoryLinks[0].setAttribute("aria-current", "page");
        }

        cards.forEach(function (card) {
            card.classList.add("blog-reveal");
        });

        function matchesCategory(card) {
            if (activeCategory === "all") {
                return true;
            }

            const cardText = card.textContent.toLowerCase();
            return card.id === activeCategory || cardText.includes(activeCategory.replace("-", " "));
        }

        function filterCards() {
            cards.forEach(function (card) {
                const matchesSearch = !searchTerm || card.textContent.toLowerCase().includes(searchTerm);
                const visible = matchesCategory(card) && matchesSearch;
                card.hidden = !visible;
                if (visible) {
                    card.classList.add("is-visible");
                }
            });
        }

        categoryLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                activeCategory = (link.getAttribute("href") || "#all").slice(1).toLowerCase() || "all";
                categoryLinks.forEach(function (item) {
                    item.classList.toggle("is-active", item === link);
                    item.setAttribute("aria-current", item === link ? "page" : "false");
                });
                filterCards();
            });
        });

        if (searchInput) {
            searchInput.addEventListener("input", function () {
                searchTerm = searchInput.value.trim().toLowerCase();
                filterCards();
            });
        }

        if (!("IntersectionObserver" in window)) {
            cards.forEach(function (card) {
                card.classList.add("is-visible");
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

        cards.forEach(function (card) {
            observer.observe(card);
        });
    });
}());
