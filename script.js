document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER SCROLL
    ========================= */

    const header = document.getElementById("header");

    function handleHeader() {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();


    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    menuButton.addEventListener("click", () => {

        menuButton.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        document.body.classList.toggle("menu-open");

    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuButton.classList.remove("active");
            mobileMenu.classList.remove("open");
            document.body.classList.remove("menu-open");

        });

    });


    /* =========================
       CUSTOM CURSOR
    ========================= */

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (cursor && follower && window.innerWidth > 700) {

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;

        document.addEventListener("mousemove", e => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";

        });


        function animateFollower() {

            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            follower.style.left = followerX + "px";
            follower.style.top = followerY + "px";

            requestAnimationFrame(animateFollower);

        }

        animateFollower();


        const hoverElements = document.querySelectorAll(
            "a, button, .service-card, .gallery-item"
        );

        hoverElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".intro-left, .intro-right, .service-card, .philosophy-point, .philosophy-image, .review, .contact-info, .contact-map"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* =========================
       STAGGER SERVICES
    ========================= */

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.08}s`;

    });


    /* =========================
       PARALLAX HERO
    ========================= */

    const heroImage = document.querySelector(".hero-image img");

    if (heroImage) {

        window.addEventListener("scroll", () => {

            const scroll = window.scrollY;

            if (scroll < window.innerHeight) {

                heroImage.style.transform =
                    `scale(1) translateY(${scroll * 0.08}px)`;

            }

        });

    }


    /* =========================
       PHONE CTA
    ========================= */

    const phoneButtons = document.querySelectorAll(
        'a[href^="tel:"]'
    );

    phoneButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (typeof gtag === "function") {
                gtag("event", "phone_click", {
                    event_category: "contact"
                });
            }

        });

    });


    /* =========================
       SMOOTH INTERNAL LINKS
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                const headerOffset = 70;

                const elementPosition =
                    target.getBoundingClientRect().top;

                const offsetPosition =
                    elementPosition +
                    window.scrollY -
                    headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

            }

        });

    });

});