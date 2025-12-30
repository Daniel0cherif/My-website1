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

    if (track) {
        let currentIndex = 0;
        const items = document.querySelectorAll('.portfolio-item');
        const totalItems = items.length;
        
        const updateSlider = () => {
            const item = document.querySelector('.portfolio-item');
            const itemWidth = item.offsetWidth;
            const moveAmount = itemWidth * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateSlider();
        };

        // Auto Play (Rotate every 3 seconds)
        let autoPlay = setInterval(nextSlide, 3000);

        // Swipe Support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoPlay); // Pause on touch
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) nextSlide(); // Swipe Left
            if (touchEndX > touchStartX + 50) prevSlide(); // Swipe Right
            autoPlay = setInterval(nextSlide, 3000); // Restart auto play
        });

        window.addEventListener('resize', updateSlider);
    }

    // Highlight Service Cards on Scroll
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.card').forEach(c => {
                    c.classList.remove('active');
                });
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});   