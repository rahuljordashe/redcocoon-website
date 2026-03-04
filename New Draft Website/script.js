/* ==========================================================================
   REDCOCOON POTTERY — JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Preloader ----------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1400);
    });
    // Fallback: hide preloader after 3s regardless
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ---------- Unified Scroll Handler (RAF-throttled) ----------
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const heroVisual = document.querySelector('.hero-visual');
    let ticking = false;

    function onScroll() {
        const scrollY = window.scrollY;

        // Header scroll effect
        if (scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Parallax-lite on hero (desktop only)
        if (heroVisual && window.innerWidth > 768 && scrollY < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Mobile Navigation ----------
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    function openMobileMenu() {
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('active');
        mobileMenu.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
    }

    navToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Focus trap for mobile menu
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusable = mobileMenu.querySelectorAll('a, button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    // ---------- Scroll Animations ----------
    const animatedElements = document.querySelectorAll(
        '.section-header, .collection-card, .about-images, .about-content,' +
        '.process-step, .featured-images, .featured-content, .gallery-item,' +
        '.testimonials-slider'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        observer.observe(el);
    });

    // ---------- Testimonials Slider ----------
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach((d, i) => {
            d.classList.remove('active');
            d.setAttribute('aria-selected', 'false');
        });
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        dots[index].setAttribute('aria-selected', 'true');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prev);
    }

    function startAutoplay() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoplay() {
        clearInterval(testimonialInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Fix: use indexOf instead of broken dataset.index
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetAutoplay();
        });
    });

    // Pause autoplay on hover/focus
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mouseenter', stopAutoplay);
        testimonialsSlider.addEventListener('mouseleave', startAutoplay);
        testimonialsSlider.addEventListener('focusin', stopAutoplay);
        testimonialsSlider.addEventListener('focusout', startAutoplay);
    }

    // Touch/swipe support for testimonials
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialsSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
                resetAutoplay();
            }
        }, { passive: true });
    }

    startAutoplay();

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return; // skip placeholder links
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = header.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---------- Collection Card Hover Tilt (subtle) ----------
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-5px) perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
