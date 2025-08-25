// ===================== Scroll Spy & Dark Mode =====================
const navLinks = document.querySelectorAll('.nav-menu li a');
const mobileLinks = document.querySelectorAll('.menu ul li a');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector(".navbar");
const homeSection = document.querySelector(".section-home");

function setActiveLink() {
    let scrollPos = window.scrollY + 120;
    let inHome = false;

    sections.forEach(section => {
        const id = section.getAttribute('id');
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            mobileLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            if (id === "home") inHome = true;
        }
    });

    // Dark mode toggle
    document.body.classList.toggle("dark-mode", !inHome);

    // Navbar glass effect
    if (window.scrollY > homeSection.offsetHeight - 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    requestAnimationFrame(setActiveLink);
}
setActiveLink();

// ===================== Mobile Menu Toggle =====================
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobile__menu");

menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("cross");
    mobileMenu.classList.toggle("menu-active");
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuButton.classList.remove("cross");
        mobileMenu.classList.remove("menu-active");
    });
});

// ===================== Responsive Resize =====================
function handleResize() {
    if (window.innerWidth > 990) {
        menuButton.classList.remove("cross");
        mobileMenu.classList.remove("menu-active");
    }
}
window.addEventListener('resize', handleResize);
handleResize();

// ===================== Back To Top =====================
const backTopBtn = document.querySelector("[data-back-to-top]");
const header = document.querySelector("header");
const triggerSection = document.querySelector(".section-explore");

window.addEventListener("scroll", function () {
    if (window.scrollY >= triggerSection.offsetTop) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});

backTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===================== Section Explore (Manual Slider) =====================
"use strict";
const sliders = document.querySelectorAll("[data-slider]");

function initSlider(slider) {
    const container = slider.querySelector("[data-slider-container]");
    const wrapper = slider.closest(".content-explore") || slider.parentElement;
    const prevBtn = wrapper.querySelector("[data-slider-prev]");
    const nextBtn = wrapper.querySelector("[data-slider-next]");

    if (!container || !prevBtn || !nextBtn) return;

    let pos = 0;
    const move = () => {
        const target = container.children[pos];
        if (!target) return;
        container.style.transform = `translateX(-${target.offsetLeft}px)`;
    };

    const visibleItems = () => {
        const first = container.children[0];
        if (!first) return 1;
        const itemW = first.getBoundingClientRect().width;
        const sliderW = slider.getBoundingClientRect().width;
        return Math.min(
            Math.max(1, Math.round(sliderW / itemW)),
            container.children.length
        );
    };

    const maxStart = () => Math.max(0, container.children.length - visibleItems());
    const next = () => {
        pos = (pos >= maxStart()) ? 0 : pos + 1;
        move();
    };
    const prev = () => {
        pos = (pos <= 0) ? maxStart() : pos - 1;
        move();
    };

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // Touch
    let touchStartX = 0,
        touchEndX = 0,
        touching = false;
    slider.addEventListener("touchstart", e => {
        touching = true;
        touchStartX = e.touches[0].clientX;
    }, {
        passive: true
    });
    slider.addEventListener("touchmove", e => {
        if (touching) touchEndX = e.touches[0].clientX;
    }, {
        passive: true
    });
    slider.addEventListener("touchend", () => {
        if (!touching) return;
        const dx = touchEndX - touchStartX;
        const threshold = 40;
        if (dx <= -threshold) next();
        if (dx >= threshold) prev();
        touching = false;
    });

    // Wheel
    slider.addEventListener("wheel", e => {
        if (!e.shiftKey) return;
        if (e.deltaY > 0) next();
        if (e.deltaY < 0) prev();
    }, {
        passive: true
    });

    window.addEventListener("resize", move);
    move();
}
sliders.forEach(initSlider);

// ===================== Section FAQ =====================
const faqCards = document.querySelectorAll('.faq-card');
faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question');
    btn.addEventListener('click', () => {
        card.classList.toggle('active');
        faqCards.forEach(other => {
            if (other !== card) other.classList.remove('active');
        });
    });
});

// ===================== Swiper.js (Modern Slider) =====================
document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true, // aktifkan looping
        centeredSlides: true,
        speed: 800, // transisi halus
        loopAdditionalSlides: 2, // clone ekstra untuk smooth looping
        watchSlidesProgress: true, // update transform slide saat looping
        watchSlidesVisibility: true, // prev/next slide tetap stabil
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            },
        },
    });
});

