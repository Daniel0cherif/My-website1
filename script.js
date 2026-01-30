document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Custom Cursor Logic
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay (animation in CSS or via GSAP)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects for cursor
    const hoverables = document.querySelectorAll('a, button, .service-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // 3. GSAP Animations

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Reveal
    const tl = gsap.timeline();
    
    tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
    })
    .from(".hero-footer", {
        opacity: 0,
        y: 20,
        duration: 0.8
    }, "-=0.5");

    // Service Items Reveal on Scroll
    gsap.utils.toArray('.service-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1
        });
    });

    // Portfolio Image Parallax
    gsap.utils.toArray('.project-card img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -50, // Parallax movement
            ease: "none"
        });
    });

    // 4. Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        
        // Toggle Hamburger animation
        const lines = document.querySelectorAll('.line');
        if (menuOverlay.classList.contains('active')) {
            lines[0].style.transform = "rotate(45deg) translate(5px, 6px)";
            lines[1].style.transform = "rotate(-45deg) translate(5px, -6px)";
        } else {
            lines[0].style.transform = "none";
            lines[1].style.transform = "none";
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            const lines = document.querySelectorAll('.line');
            lines[0].style.transform = "none";
            lines[1].style.transform = "none";
        });
    });
});