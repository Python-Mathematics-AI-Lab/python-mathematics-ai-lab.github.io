/* =========================================================
   PMAI LAB — MAIN JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");


    if (menuToggle && navMenu) {


        menuToggle.addEventListener("click", function () {


            navMenu.classList.toggle("show");


            const isOpen =
                navMenu.classList.contains("show");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


        });


        /* ================================================
           CLOSE MENU AFTER CLICKING A LINK
        ================================================= */

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

            });


        });

    }


});
