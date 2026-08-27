/* =========================================================
   PMAI LAB — NAVBAR JAVASCRIPT
   File: assets/js/navbar.js
========================================================= */

(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const navbar =
            document.querySelector(".navbar");

        const menuToggle =
            document.getElementById("menu-toggle");

        const navMenu =
            document.getElementById("nav-menu");


        /* =================================================
           SAFETY CHECK
        ================================================= */

        if (!navbar) {
            console.warn("PMAI LAB: .navbar not found.");
            return;
        }

        if (!menuToggle) {
            console.warn("PMAI LAB: #menu-toggle not found.");
            return;
        }

        if (!navMenu) {
            console.warn("PMAI LAB: #nav-menu not found.");
            return;
        }


        /* =================================================
           INITIAL STATE
        ================================================= */

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        /* =================================================
           OPEN MENU
        ================================================= */

        function openMenu() {

            navMenu.classList.add("show");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }


        /* =================================================
           CLOSE MENU
        ================================================= */

        function closeMenu() {

            navMenu.classList.remove("show");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }


        /* =================================================
           TOGGLE MENU
        ================================================= */

        function toggleMenu() {

            const isOpen =
                navMenu.classList.contains("show");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }


        /* =================================================
           MENU BUTTON
        ================================================= */

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleMenu();

            }
        );


        /* =================================================
           NAVIGATION LINKS
        ================================================= */

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        });


        /* =================================================
           CLOSE WHEN CLICKING OUTSIDE
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navbar.contains(event.target)
                ) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeMenu();

                    menuToggle.focus();

                }

            }
        );


        /* =================================================
           WINDOW RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 900) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           ACTIVE PAGE
        ================================================= */

        function updateActivePage() {

            let currentPage =
                window.location.pathname
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (
                currentPage === ""
            ) {

                currentPage = "index.html";

            }


            navLinks.forEach(function (link) {

                const href =
                    link.getAttribute("href");


                if (!href) {
                    return;
                }


                const linkPage =
                    href
                        .split("/")
                        .pop()
                        .split("?")[0]
                        .split("#")[0]
                        .toLowerCase();


                link.classList.remove(
                    "active"
                );

                link.removeAttribute(
                    "aria-current"
                );


                if (
                    linkPage === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                }

            });

        }


        updateActivePage();


        /* =================================================
           NAVBAR HEIGHT
        ================================================= */

        function updateNavbarHeight() {

            const height =
                navbar.offsetHeight;

            document.documentElement.style
                .setProperty(
                    "--pmai-navbar-height",
                    height + "px"
                );

        }


        updateNavbarHeight();


        window.addEventListener(
            "resize",
            updateNavbarHeight
        );


        window.addEventListener(
            "load",
            updateNavbarHeight
        );


        /* =================================================
           IMPORTANT
           -----------------------------------------------
           DO NOT CHANGE NAVBAR POSITION ON SCROLL.
        ================================================= */

        console.log(
            "PMAI LAB Navbar: Mobile navigation ready."
        );

    });

})();
