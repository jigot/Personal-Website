// Gallery logic for teaching page

document.addEventListener("DOMContentLoaded", () => {
    const figure = document.querySelector(".california-figure");
    const pin = document.querySelector(".california-pin");
    const gallery = document.querySelector(".map-gallery");
    const images = Array.from(document.querySelectorAll(".gallery-image"));
    const dots = Array.from(document.querySelectorAll(".gallery-dot"));
    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");

    if (!figure || !pin || !gallery || images.length === 0) return;

    let current = 0;

    function render(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function openGallery() {
        figure.classList.add("gallery-open");
        pin.setAttribute("aria-expanded", "true");
        gallery.setAttribute("aria-hidden", "false");
    }

    function closeGallery() {
        figure.classList.remove("gallery-open");
        pin.setAttribute("aria-expanded", "false");
        gallery.setAttribute("aria-hidden", "true");
    }

    function goTo(index) {
        current = (index + images.length) % images.length;
        render(current);
    }

    pin.addEventListener("click", () => {
        const isOpen = figure.classList.contains("gallery-open");
        if (isOpen) {
            closeGallery();
        } else {
            openGallery();
        }
    });

    next.addEventListener("click", () => {
        openGallery();
        goTo(current + 1);
    });

    prev.addEventListener("click", () => {
        openGallery();
        goTo(current - 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            openGallery();
            goTo(index);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (!figure.classList.contains("gallery-open")) return;

        if (event.key === "ArrowRight") goTo(current + 1);
        if (event.key === "ArrowLeft") goTo(current - 1);
        if (event.key === "Escape") closeGallery();
    });

    document.addEventListener("click", (event) => {
        if (!figure.contains(event.target)) {
            closeGallery();
        }
    });

    render(current);
});

// Scroll snapping logic for teaching page

const topSection = document.getElementById("teaching-top");
const experienceSection = document.getElementById("teaching-experience");

let isSnapping = false;
let lastScrollY = window.scrollY;

function smoothSnapTo(position) {
    isSnapping = true;

    window.scrollTo({
        top: position,
        behavior: "smooth"
    });

    setTimeout(() => {
        isSnapping = false;
    }, 500);
}

window.addEventListener("scroll", () => {
    if (isSnapping) return;

    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollingUp = currentScrollY < lastScrollY;

    const topRect = topSection.getBoundingClientRect();
    const experienceRect = experienceSection.getBoundingClientRect();

    const boundary = topSection.offsetTop + topSection.offsetHeight;

    // Scrolling down: snap to top of teaching-experience
    const SNAP_BUFFER = 60; // adjust this (40–100 is a good range)

    // Scrolling down: snap to top of teaching-experience
    if (
        scrollingDown &&
        currentScrollY + window.innerHeight >= boundary - SNAP_BUFFER &&
        currentScrollY < experienceSection.offsetTop
    ) {
        smoothSnapTo(experienceSection.offsetTop);
    }

    // Scrolling up: snap to bottom of teaching-top
    if (
        scrollingUp &&
        currentScrollY <= boundary - SNAP_BUFFER &&
        currentScrollY > topSection.offsetTop
    ) {
        smoothSnapTo(boundary - window.innerHeight);
    }

    lastScrollY = currentScrollY;
});