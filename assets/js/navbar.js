```javascript
/* =========================================================
   PMAI LAB — NAVBAR JAVASCRIPT
   File: assets/js/navbar.js
   Version: 4.0
   ---------------------------------------------------------
   Features:
   • Mobile menu toggle
   • Accessible mobile navigation
   • Active navigation state
   • Close menu after navigation
   • Close menu when clicking outside
   • Close menu with Escape key
   • Prevent body scroll when mobile menu is open
   • Fixed navbar support
   • No scroll-based navbar movement
   • No navbar hiding/showing on scroll
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       WAIT FOR DOM
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const navbar =
            document.querySelector(".navbar");

        const menuToggle =
            document.querySelector(".menu-toggle");

        const navMenu =
            document.querySelector(".nav-menu");


        /* =================================================
           SAFETY CHECK
        ================================================= */

        if (!navbar) {

            console.warn(
                "PMAI LAB Navbar: .navbar element not found."
            );

            return;
        }


        if (!menuToggle || !navMenu) {

            console.warn(
                "PMAI LAB Navbar: Mobile menu elements not found."
            );

            return;
        }


        /* =================================================
           ACCESSIBILITY INITIAL STATE
        ================================================= */

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-controls",
            "nav-menu"
        );


        /* =================================================
           MOBILE MENU — OPEN
        ================================================= */

        function openMenu() {

            navMenu.classList.add("show");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.classList.add("active");

            document.body.classList.add(
                "mobile-menu-open"
            );
        }


        /* =================================================
           MOBILE MENU — CLOSE
        ================================================= */

        function closeMenu() {

            navMenu.classList.remove("show");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.classList.remove("active");

            document.body.classList.remove(
                "mobile-menu-open"
            );
        }


        /* =================================================
           MOBILE MENU — TOGGLE
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
           MENU BUTTON CLICK
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
           NAVIGATION LINK CLICK
        ================================================= */

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    /*
                     * Close mobile menu after
                     * selecting a navigation item.
                     */

                    if (
                        window.innerWidth <= 900
                    ) {

                        closeMenu();

                    }

                }
            );

        });


        /* =================================================
           CLOSE MENU — OUTSIDE CLICK
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    window.innerWidth > 900
                ) {

                    return;

                }


                const clickedInsideNavbar =
                    navbar.contains(event.target);


                if (!clickedInsideNavbar) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           CLOSE MENU — ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" ||
                    event.key === "Esc"
                ) {

                    closeMenu();

                    menuToggle.focus();

                }

            }
        );


        /* =================================================
           CLOSE MENU WHEN WINDOW RESIZES
        ================================================= */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 900
                ) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        function setActiveNavigation() {

            const currentPage =
                window.location.pathname
                    .split("/")
                    .pop()
                    .toLowerCase();


            const links =
                navMenu.querySelectorAll("a");


            links.forEach(function (link) {

                const href =
                    link.getAttribute("href");


                if (!href) {

                    return;

                }


                /*
                 * Ignore anchor links and external links.
                 */

                if (
                    href.startsWith("#") ||
                    href.startsWith("http") ||
                    href.startsWith("mailto:")
                ) {

                    return;

                }


                const linkPage =
                    href
                        .split("/")
                        .pop()
                        .split("?")[0]
                        .split("#")[0]
                        .toLowerCase();


                /*
                 * Remove existing active state.
                 */

                link.classList.remove(
                    "active"
                );

                link.removeAttribute(
                    "aria-current"
                );


                /*
                 * Homepage handling.
                 */

                const isHomePage =
                    currentPage === "" ||
                    currentPage === "index.html";


                const isHomeLink =
                    linkPage === "" ||
                    linkPage === "index.html";


                if (
                    isHomePage &&
                    isHomeLink
                ) {

                    link.classList.add(
                        "active"
                    );

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                    return;

                }


                /*
                 * Other pages.
                 */

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


        /* =================================================
           RUN ACTIVE NAVIGATION
        ================================================= */

        setActiveNavigation();


        /* =================================================
           FIXED NAVBAR HEIGHT
           -----------------------------------------------
           Dynamically exposes navbar height as a CSS
           variable so other page components can use it.
        ================================================= */

        function updateNavbarHeight() {

            const navbarHeight =
                navbar.offsetHeight;


            document.documentElement.style
                .setProperty(
                    "--pmai-navbar-height",
                    navbarHeight + "px"
                );

        }


        /* =================================================
           INITIAL NAVBAR HEIGHT
        ================================================= */

        updateNavbarHeight();


        /* =================================================
           UPDATE NAVBAR HEIGHT ON RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            updateNavbarHeight
        );


        /* =================================================
           UPDATE NAVBAR HEIGHT AFTER PAGE LOAD
        ================================================= */

        window.addEventListener(
            "load",
            updateNavbarHeight
        );


        /* =================================================
           NO SCROLL NAVBAR MOVEMENT
           -----------------------------------------------
           IMPORTANT:
           This script intentionally does NOT:
           
           • hide navbar on scroll
           • add scroll classes
           • remove navbar
           • change position
           • translate navbar
           • change top value
           
           The navbar remains fixed through CSS.
        ================================================= */

        window.addEventListener(
            "scroll",
            function () {

                /*
                 * Intentionally empty.
                 *
                 * The PMAI Lab navbar must remain
                 * permanently fixed at the top.
                 */

            },
            {
                passive: true
            }
        );


        /* =================================================
           MOBILE MENU — BODY SCROLL CONTROL
        ================================================= */

        const mobileMenuStyle =
            document.createElement("style");


        mobileMenuStyle.textContent = `
            
            body.mobile-menu-open {
                overflow: hidden;
            }

        `;


        document.head.appendChild(
            mobileMenuStyle
        );


        /* =================================================
           INITIALIZATION COMPLETE
        ================================================= */

        console.log(
            "PMAI LAB Navbar initialized successfully."
        );


    });

})();
```
