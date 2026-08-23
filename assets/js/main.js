/* =========================================================
   PMAI LAB — PREMIUM MAIN JAVASCRIPT
   Version 2.0
   File: assets/js/main.js
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENT REFERENCES
    ====================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const siteHeader =
        document.getElementById("site-header");


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && navMenu) {


        /* -------------------------------------------------
           OPEN / CLOSE MENU
        ------------------------------------------------- */

        menuToggle.addEventListener("click", function () {

            const isOpen =
                navMenu.classList.toggle("show");


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


            /* Change menu icon */

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        });


        /* -------------------------------------------------
           CLOSE MENU AFTER CLICKING LINK
        ------------------------------------------------- */

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("show");


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );


                    menuToggle.textContent = "☰";

                }
            );

        });


        /* -------------------------------------------------
           CLOSE MENU WHEN CLICKING OUTSIDE
        ------------------------------------------------- */

        document.addEventListener(
            "click",
            function (event) {

                const clickedInsideMenu =
                    navMenu.contains(event.target);

                const clickedToggle =
                    menuToggle.contains(event.target);


                if (
                    !clickedInsideMenu &&
                    !clickedToggle &&
                    navMenu.classList.contains("show")
                ) {

                    navMenu.classList.remove("show");


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );


                    menuToggle.textContent = "☰";

                }

            }
        );


        /* -------------------------------------------------
           ESCAPE KEY
        ------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    navMenu.classList.contains("show")
                ) {

                    navMenu.classList.remove("show");


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );


                    menuToggle.textContent = "☰";


                    menuToggle.focus();

                }

            }
        );

    }


    /* =====================================================
       PREMIUM HEADER SCROLL EFFECT
    ====================================================== */

    if (siteHeader) {


        function updateHeaderOnScroll() {

            if (window.scrollY > 20) {

                siteHeader.classList.add(
                    "scrolled"
                );

            } else {

                siteHeader.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateHeaderOnScroll,
            { passive: true }
        );


        /* Run once on page load */

        updateHeaderOnScroll();

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ====================================================== */

    if (navMenu) {


        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {


            const linkPage =
                link.getAttribute("href");


            if (!linkPage) {
                return;
            }


            const cleanLinkPage =
                linkPage
                    .split("#")[0]
                    .split("?")[0]
                    .toLowerCase();


            /* ------------------------------------------------
               HOME PAGE
            ------------------------------------------------ */

            if (
                (
                    currentPage === "" ||
                    currentPage === "index.html"
                ) &&
                (
                    cleanLinkPage === "" ||
                    cleanLinkPage === "index.html"
                )
            ) {

                link.classList.add("active");

            }


            /* ------------------------------------------------
               OTHER PAGES
            ------------------------------------------------ */

            else if (
                currentPage !== "" &&
                cleanLinkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(function (link) {


        link.addEventListener(
            "click",
            function (event) {


                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const reducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;


                target.scrollIntoView({

                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start"

                });


            }
        );

    });


    /* =====================================================
       RESPONSIVE MENU RESET
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {


            if (
                window.innerWidth > 850 &&
                navMenu &&
                menuToggle
            ) {


                navMenu.classList.remove(
                    "show"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                menuToggle.textContent = "☰";

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
       Automatically updates footer year
    ====================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       Prevent broken images from looking awkward
    ====================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(function (image) {


        image.addEventListener(
            "error",
            function () {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       PAGE LOADED
    ====================================================== */

    document.body.classList.add(
        "page-loaded"
    );


});
