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

    // Highlight Service Cards on Scroll
    const observerOptions = {
        threshold: [0.1, 0.9] // Trigger at 10% (leaving) and 90% (centered)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.9) {
                // High visibility: Activate and clear others
                document.querySelectorAll('.card').forEach(c => {
                    if (c !== entry.target) c.classList.remove('active');
                });
                entry.target.classList.add('active');
            } else if (!entry.isIntersecting) {
                // Low visibility: Remove active
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Highlight Service Cards on Click
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from other cards
            document.querySelectorAll('.card').forEach(c => {
                if (c !== this) c.classList.remove('active');
            });
            // Toggle active class on clicked card
            this.classList.toggle('active');
        });
    });

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});   