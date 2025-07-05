// Navigation functionality
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link-anchor');
        this.sections = document.querySelectorAll('.section');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinksContainer = document.querySelector('.nav-links');

        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollToTop();
        this.observeSections();
    }

    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.scrollToSection(targetSection);
                this.setActiveNavLink(link);
            });
        });

        // Handle CTA button and hero buttons
        const ctaButton = document.querySelector('.nav-cta-button');
        const heroButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('contact');
            });
        }

        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = button.getAttribute('data-section');
                if (targetSection) {
                    this.scrollToSection(targetSection);
                }
            });
        });
    }

    setupMobileMenu() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.navLinksContainer.classList.toggle('mobile-open');
                this.mobileMenuToggle.classList.toggle('active');
            });
        }
    }

    setupScrollToTop() {
        const backToTopBtn = document.querySelector('.footer-back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('home');
            });
        }
    }

    scrollToSection(sectionId) {
        // Try both .section and #blog for blog section
        let targetSection = document.getElementById(sectionId);
        if (!targetSection && sectionId === 'blog') {
            // Try to find the blog section by class if not found by id
            targetSection = document.querySelector('.blog-section-wrapper, .blog');
        }
        if (targetSection) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    setActiveNavLink(activeLink) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link's parent
        activeLink.closest('.nav-link').classList.add('active');
    }

    observeSections() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -20% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const correspondingNavLink = document.querySelector(`[data-section="${sectionId}"]`);
                    if (correspondingNavLink) {
                        this.setActiveNavLink(correspondingNavLink);
                    }
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
