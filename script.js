document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Slider
    const track = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (track) {
        let currentIndex = 0;
        
        const updateSlider = () => {
            const item = document.querySelector('.portfolio-item');
            const itemWidth = item.offsetWidth;
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            const moveAmount = (itemWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const items = document.querySelectorAll('.portfolio-item');
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
    }
});   