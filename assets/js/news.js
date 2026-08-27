/* =========================================================
   PMAI LAB — NEWS PAGE JAVASCRIPT
   File: assets/js/news.js
   Version: 1.0

   Features:
   • News search
   • Category filtering
   • All / Seminar / Course / Research / YouTube filters
   • Active filter state
   • News count
   • Empty-state handling
   • Smooth filtering animation
   • Accessible keyboard interaction
   • No dependency on hero-news.js
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       ELEMENTS
    --------------------------------------------------------- */

    const newsGrid =
        document.querySelector(".news-grid");

    const newsItems =
        document.querySelectorAll(".news-card");

    const filterButtons =
        document.querySelectorAll(".news-filter");

    const searchInput =
        document.querySelector("#news-search");

    const newsCount =
        document.querySelector("#news-count");

    const emptyState =
        document.querySelector(".news-empty-state");


    /* ---------------------------------------------------------
       SAFETY CHECK
    --------------------------------------------------------- */

    if (!newsGrid || !newsItems.length) {
        return;
    }


    /* =========================================================
       NEWS FILTER STATE
    ========================================================= */

    let activeCategory = "all";

    let searchTerm = "";


    /* =========================================================
       NORMALIZE TEXT
    ========================================================= */

    function normalizeText(text) {

        return text
            .toLowerCase()
            .trim();

    }


    /* =========================================================
       GET NEWS CARD DATA
    ========================================================= */

    function getCardCategory(card) {

        const category =
            card.dataset.category || "";

        return normalizeText(category);

    }


    function getCardSearchText(card) {

        return normalizeText(
            card.textContent || ""
        );

    }


    /* =========================================================
       FILTER NEWS
    ========================================================= */

    function filterNews() {

        let visibleCount = 0;


        newsItems.forEach((card) => {

            const category =
                getCardCategory(card);

            const content =
                getCardSearchText(card);


            /* -------------------------------------------------
               CATEGORY MATCH
            ------------------------------------------------- */

            const categoryMatch =
                activeCategory === "all" ||
                category === activeCategory;


            /* -------------------------------------------------
               SEARCH MATCH
            ------------------------------------------------- */

            const searchMatch =
                searchTerm === "" ||
                content.includes(searchTerm);


            /* -------------------------------------------------
               FINAL MATCH
            ------------------------------------------------- */

            const shouldShow =
                categoryMatch &&
                searchMatch;


            if (shouldShow) {

                visibleCount++;


                card.hidden = false;

                card.classList.remove(
                    "news-card-hidden"
                );


                /*
                 * Small re-trigger for CSS animation
                 */

                requestAnimationFrame(() => {

                    card.classList.add(
                        "news-card-visible"
                    );

                });

            } else {

                card.classList.remove(
                    "news-card-visible"
                );

                card.classList.add(
                    "news-card-hidden"
                );


                /*
                 * Delay hiding so CSS transition
                 * can complete.
                 */

                setTimeout(() => {

                    if (
                        card.classList.contains(
                            "news-card-hidden"
                        )
                    ) {

                        card.hidden = true;

                    }

                }, 180);

            }

        });


        updateNewsCount(visibleCount);

        updateEmptyState(visibleCount);

    }


    /* =========================================================
       UPDATE NEWS COUNT
    ========================================================= */

    function updateNewsCount(count) {

        if (!newsCount) {
            return;
        }


        newsCount.textContent =
            `${count} ${count === 1 ? "News Item" : "News Items"}`;

    }


    /* =========================================================
       EMPTY STATE
    ========================================================= */

    function updateEmptyState(count) {

        if (!emptyState) {
            return;
        }


        if (count === 0) {

            emptyState.hidden = false;

        } else {

            emptyState.hidden = true;

        }

    }


    /* =========================================================
       CATEGORY FILTER BUTTONS
    ========================================================= */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.filter || "all";


                activeCategory =
                    normalizeText(category);


                /* ---------------------------------------------
                   UPDATE ACTIVE BUTTON
                --------------------------------------------- */

                filterButtons.forEach((item) => {

                    item.classList.remove(
                        "active"
                    );

                    item.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });


                button.classList.add(
                    "active"
                );

                button.setAttribute(
                    "aria-selected",
                    "true"
                );


                /* ---------------------------------------------
                   FILTER
                --------------------------------------------- */

                filterNews();

            }
        );

    });


    /* =========================================================
       SEARCH
    ========================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                searchTerm =
                    normalizeText(
                        searchInput.value
                    );


                filterNews();

            }
        );

    }


    /* =========================================================
       CLEAR SEARCH
    ========================================================= */

    const clearSearch =
        document.querySelector(
            "#news-search-clear"
        );


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                    searchInput.focus();

                }


                searchTerm = "";

                filterNews();

            }
        );

    }


    /* =========================================================
       EMPTY STATE RESET BUTTON
    ========================================================= */

    const resetFilters =
        document.querySelector(
            "#news-reset"
        );


    if (resetFilters) {

        resetFilters.addEventListener(
            "click",
            () => {

                activeCategory = "all";

                searchTerm = "";


                if (searchInput) {

                    searchInput.value = "";

                }


                filterButtons.forEach((button) => {

                    const isAll =
                        normalizeText(
                            button.dataset.filter || ""
                        ) === "all";


                    button.classList.toggle(
                        "active",
                        isAll
                    );


                    button.setAttribute(
                        "aria-selected",
                        isAll ? "true" : "false"
                    );

                });


                filterNews();

            }
        );

    }


    /* =========================================================
       KEYBOARD ACCESSIBILITY
    ========================================================= */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    button.click();

                }

            }
        );

    });


    /* =========================================================
       NEWS CARD LINK INTERACTION
    ========================================================= */

    newsItems.forEach((card) => {

        const link =
            card.querySelector(
                ".news-card-link"
            );


        if (!link) {
            return;
        }


        card.addEventListener(
            "click",
            (event) => {

                /*
                 * Do not interfere with clicks
                 * directly on the link.
                 */

                if (
                    event.target.closest(
                        "a"
                    )
                ) {

                    return;

                }


                link.click();

            }
        );


        /* -----------------------------------------------------
           KEYBOARD SUPPORT
        ----------------------------------------------------- */

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    link.click();

                }

            }
        );

    });


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    filterButtons.forEach((button) => {

        const isAll =
            normalizeText(
                button.dataset.filter || ""
            ) === "all";


        button.setAttribute(
            "aria-selected",
            isAll ? "true" : "false"
        );

    });


    filterNews();


    /* =========================================================
       PAGE READY
    ========================================================= */

    document.body.classList.add(
        "news-page-ready"
    );

});
