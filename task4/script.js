// ==============================
// SCROLL REVEAL ANIMATION
// Using Intersection Observer API
// ==============================

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

            // Small delay for staggered animation
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 150);

            // Animate only once
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.2
});

hiddenElements.forEach(element => {
    observer.observe(element);
});



// ==============================
// BUTTON CLICK EFFECT
// ==============================

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform = "scale(0.96)";

    });

    button.addEventListener("mouseup", () => {

        button.style.transform = "";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});



// ==============================
// NAVBAR SHADOW ON SCROLL
// ==============================

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.background = "rgba(255,255,255,0.85)";
        navbar.style.backdropFilter = "blur(12px)";
        navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
        navbar.style.transition = "0.3s";

    }
    else {

        navbar.style.background = "transparent";
        navbar.style.boxShadow = "none";

    }

});