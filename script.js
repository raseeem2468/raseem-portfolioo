/**
 * portfolio interactions and scroll animations
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once it faded in
            }
        });
    }, observerOptions);

    // Initial setup to hide elements and observe them
    
    // 1. Observe Section Titles & About Content
    document.querySelectorAll('.section-title, .about-content p').forEach((el, index) => {
        el.classList.add('hidden-element');
        if (el.tagName.toLowerCase() === 'p') {
            el.style.setProperty('--delay', `${index * 0.1}s`);
        }
        observer.observe(el);
    });

    // 2. Observe Grid Cards (Skills, Projects, Contact)
    document.querySelectorAll('.skill-category, .project-card, .contact-card').forEach((el, index) => {
        el.classList.add('hidden-element');
        // Calculate delay per row for staggered effect (assuming 3 per row approx)
        el.style.setProperty('--delay', `${(index % 3) * 0.15}s`);
        observer.observe(el);
    });

    // 3. Trigger initial hero animations after short timeout
    setTimeout(() => {
        document.querySelectorAll('.hero .hidden-element').forEach(el => {
            el.classList.add('fade-in');
        });
    }, 100);

    // Active state in Navbar on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = 'var(--text-muted)';
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.style.color = 'var(--text-main)';
            }
        });
        
        // Reset if at top
        if (pageYOffset < 300) {
            navLinks.forEach(link => {
                link.style.color = 'var(--text-muted)';
            });
        }
    });
});
