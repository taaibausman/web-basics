/* ======================================================
   PORTFOLIO WEBSITE
   main.js
====================================================== */


/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* ==========================================
   CLOSE MENU AFTER CLICKING A LINK
========================================== */

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ==========================================
   ACTIVE NAVIGATION LINK
========================================== */

const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});


/* ==========================================
   HEADER SHADOW ON SCROLL
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "0 2px 12px rgba(0,0,0,.05)";

    }

});


/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
    ".hero, .skills, .featured-projects, .about-preview, .cta"
);

const revealOnScroll = () => {

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < triggerBottom) {

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ==========================================
   SMOOTH BUTTON EFFECT
========================================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform = "scale(.97)";

    });

    button.addEventListener("mouseup", () => {

        button.style.transform = "";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/* ==========================================
   IMAGE HOVER EFFECT
========================================== */

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    heroImage.addEventListener("mouseenter", () => {

        heroImage.style.transform = "scale(1.05)";

    });

    heroImage.addEventListener("mouseleave", () => {

        heroImage.style.transform = "scale(1)";

    });

}


/* ==========================================
   CURRENT YEAR IN FOOTER (OPTIONAL)
========================================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML = `© ${year} Taaiba Usman. All Rights Reserved.`;

}


/* ==========================================
   END OF FILE
========================================== */