/* =========================================================
   PMAI LAB — HERO NEWS SYSTEM
   File: assets/js/hero-news.js
   Version: 2.0

   Features:
   • Automatic news rotation
   • Clickable navigation dots
   • Pause on hover
   • Resume on mouse leave
   • Keyboard accessible dots
   • Correct active state
   • Direct links to relevant PMAI pages
   • Safe initialization
   • Reduced-motion support
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       WAIT FOR DOM
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {


        /* =================================================
           SELECT HERO NEWS ELEMENTS
        ================================================= */

        const newsCard =
            document.querySelector(".hero-news-card");

        const newsItems =
            document.querySelectorAll(".hero-news-item");

        const newsDots =
            document.querySelectorAll(".hero-news-dot");


        /* =================================================
           SAFETY CHECK
        ================================================= */

        if (
            !newsCard ||
            !newsItems.length ||
            !newsDots.length
        ) {

            console.warn(
                "PMAI Hero News: Required elements were not found."
            );

            return;

        }


        /* =================================================
           SETTINGS
        ================================================= */

        const ROTATION_INTERVAL = 5000;

        let currentIndex = 0;

        let rotationTimer = null;

        let isPaused = false;


        /* =================================================
           REDUCED MOTION
        ================================================= */

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           SHOW NEWS ITEM
        ================================================= */

        function showNews(index) {


            /* ---------------------------------------------
               NORMALIZE INDEX
            --------------------------------------------- */

            if (index < 0) {

                index =
                    newsItems.length - 1;

            }


            if (index >= newsItems.length) {

                index = 0;

            }


            currentIndex = index;


            /* ---------------------------------------------
               UPDATE NEWS ITEMS
            --------------------------------------------- */

            newsItems.forEach(
                function (item, itemIndex) {

                    const isActive =
                        itemIndex === currentIndex;


                    item.classList.toggle(
                        "active",
                        isActive
                    );


                    /* Accessibility */

                    if (isActive) {

                        item.removeAttribute(
                            "aria-hidden"
                        );

                    } else {

                        item.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                    }

                }
            );


            /* ---------------------------------------------
               UPDATE DOTS
            --------------------------------------------- */

            newsDots.forEach(
                function (dot, dotIndex) {

                    const isActive =
                        dotIndex === currentIndex;


                    dot.classList.toggle(
                        "active",
                        isActive
                    );


                    /* Accessibility */

                    dot.setAttribute(
                        "aria-current",
                        isActive
                            ? "true"
                            : "false"
                    );

                }
            );

        }


        /* =================================================
           NEXT NEWS
        ================================================= */

        function showNextNews() {

            if (isPaused) {

                return;

            }


            showNews(
                currentIndex + 1
            );

        }


        /* =================================================
           START ROTATION
        ================================================= */

        function startRotation() {


            /* ---------------------------------------------
               Do not rotate for reduced motion
            --------------------------------------------- */

            if (prefersReducedMotion) {

                return;

            }


            /* ---------------------------------------------
               Clear existing timer
            --------------------------------------------- */

            stopRotation();


            rotationTimer =
                window.setInterval(
                    showNextNews,
                    ROTATION_INTERVAL
                );

        }


        /* =================================================
           STOP ROTATION
        ================================================= */

        function stopRotation() {

            if (rotationTimer !== null) {

                window.clearInterval(
                    rotationTimer
                );

                rotationTimer = null;

            }

        }


        /* =================================================
           PAUSE ROTATION
        ================================================= */

        function pauseRotation() {

            isPaused = true;

            stopRotation();

        }


        /* =================================================
           RESUME ROTATION
        ================================================= */

        function resumeRotation() {

            isPaused = false;

            startRotation();

        }


        /* =================================================
           DOT CLICK EVENTS
        ================================================= */

        newsDots.forEach(
            function (dot, index) {


                dot.addEventListener(
                    "click",
                    function () {


                        /* -----------------------------
                           Show selected news
                        ----------------------------- */

                        showNews(index);


                        /* -----------------------------
                           Restart timer
                           after manual selection
                        ----------------------------- */

                        if (!prefersReducedMotion) {

                            startRotation();

                        }

                    }
                );


            }
        );


        /* =================================================
           PAUSE WHEN MOUSE ENTERS CARD
        ================================================= */

        newsCard.addEventListener(
            "mouseenter",
            function () {

                pauseRotation();

            }
        );


        /* =================================================
           RESUME WHEN MOUSE LEAVES CARD
        ================================================= */

        newsCard.addEventListener(
            "mouseleave",
            function () {

                resumeRotation();

            }
        );


        /* =================================================
           KEYBOARD ACCESSIBILITY
        ================================================= */

        newsDots.forEach(
            function (dot, index) {


                dot.addEventListener(
                    "keydown",
                    function (event) {


                        /* ---------------------------------
                           Arrow Right / Down
                        --------------------------------- */

                        if (
                            event.key === "ArrowRight" ||
                            event.key === "ArrowDown"
                        ) {

                            event.preventDefault();


                            const nextIndex =
                                (
                                    index + 1
                                ) %
                                newsDots.length;


                            newsDots[nextIndex].focus();

                            showNews(nextIndex);

                        }


                        /* ---------------------------------
                           Arrow Left / Up
                        --------------------------------- */

                        if (
                            event.key === "ArrowLeft" ||
                            event.key === "ArrowUp"
                        ) {

                            event.preventDefault();


                            const previousIndex =
                                (
                                    index -
                                    1 +
                                    newsDots.length
                                ) %
                                newsDots.length;


                            newsDots[
                                previousIndex
                            ].focus();

                            showNews(
                                previousIndex
                            );

                        }


                        /* ---------------------------------
                           Home key
                        --------------------------------- */

                        if (
                            event.key === "Home"
                        ) {

                            event.preventDefault();


                            newsDots[0].focus();

                            showNews(0);

                        }


                        /* ---------------------------------
                           End key
                        --------------------------------- */

                        if (
                            event.key === "End"
                        ) {

                            event.preventDefault();


                            const lastIndex =
                                newsDots.length - 1;


                            newsDots[
                                lastIndex
                            ].focus();

                            showNews(
                                lastIndex
                            );

                        }

                    }
                );


            }
        );


        /* =================================================
           PAUSE WHEN TAB IS NOT ACTIVE
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            function () {


                if (
                    document.hidden
                ) {

                    stopRotation();

                } else if (
                    !isPaused
                ) {

                    startRotation();

                }

            }
        );


        /* =================================================
           INITIALIZE
        ================================================= */

        showNews(0);


        /* =================================================
           START AUTOMATIC ROTATION
        ================================================= */

        if (!prefersReducedMotion) {

            startRotation();

        }


        /* =================================================
           DEBUG MESSAGE
        ================================================= */

        console.log(
            "PMAI Hero News initialized successfully."
        );


    });

})();
