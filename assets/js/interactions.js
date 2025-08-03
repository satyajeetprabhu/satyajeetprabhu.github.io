/**
 * Interactions JavaScript for Satyajeet Prabhu Website
 * Handles all user interactions, animations, and dynamic behaviors
 */

(function() {
    'use strict';

    // DOM elements
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMenu = document.getElementById('close-menu');
    const mobileNavLinks = mobileNav?.querySelectorAll('a');
    const body = document.body;

    // Mobile Navigation Functions
    function openMobileNav() {
        mobileNav?.classList.add('active');
        mobileNavOverlay?.classList.add('active');
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        closeMenu?.focus();
    }

    function closeMobileNav() {
        mobileNav?.classList.remove('active');
        mobileNavOverlay?.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
        
        // Return focus to hamburger button
        hamburger?.focus();
    }

    // Event Listeners
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            openMobileNav();
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileNav();
        });
    }

    // Close mobile nav when clicking outside
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', () => {
            closeMobileNav();
        });
    }

    // Close mobile nav when clicking on menu items
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav?.classList.contains('active')) {
            closeMobileNav();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.content-section, .about-grid, .quote-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Navbar background on scroll
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.nav');

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (nav) {
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
                nav.style.backdropFilter = 'blur(10px)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.1)';
                nav.style.backdropFilter = 'blur(10px)';
            }
        }
        
        lastScrollY = currentScrollY;
    }

    // Throttled scroll listener
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        // Set initial navbar state
        updateNavbar();
        
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
    });

    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav?.classList.contains('active')) {
            closeMobileNav();
        }
    });

    // Performance optimization: Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-animations');
    }

})();
