/* =========================================================
   PMAI LAB — MOBILE NAVIGATION
   File: assets/js/navbar.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    /* -----------------------------------------------------
       Check required elements
    ----------------------------------------------------- */

    if (!menuToggle || !navMenu) {

        console.error(
            "PMAI Lab: Mobile navigation elements not found."
        );

        return;
    }


    /* -----------------------------------------------------
       OPEN / CLOSE MOBILE MENU
    ----------------------------------------------------- */

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navMenu.classList.toggle("show");


        /* Accessibility */

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
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


    /* -----------------------------------------------------
       CLOSE MENU AFTER CLICKING A LINK
    ----------------------------------------------------- */

    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

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

        });

    });


    /* -----------------------------------------------------
       CLOSE MENU WHEN WINDOW BECOMES DESKTOP SIZE
    ----------------------------------------------------- */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

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

    });

});
