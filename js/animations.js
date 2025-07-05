// Enhanced Scroll animations and performance optimizations
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navbar = document.querySelector('.navbar');
        this.isScrolling = false;
        this.lastScrollTop = 0;
        this.ticking = false;

        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupNavbarScroll();
        this.setupPerformanceOptimizations();
        this.setupBlogAnimations();
        this.setupProjectsAnimations();
        this.setupGeneralAnimations();
        this.setupScrollEffects();
        this.initTypingAnimation();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.triggerSectionAnimations(entry.target);
                } else {
                    entry.target.classList.remove('active');
                    this.handleSectionExit(entry.target);
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    triggerSectionAnimations(section) {
        // Trigger specific animations based on section
        const sectionId = section.id;

        switch (sectionId) {
            case 'about':
                this.animateAboutCards();
                this.startTypingAnimation();
                break;
            case 'projects':
                this.animateProjectCards();
                break;
            case 'blog':
                this.animateBlogCards();
                break;
            case 'certifications':
                this.animateCertCards();
                break;
        }
    }

    handleSectionExit(section) {
        // Handle section exit animations
        const sectionId = section.id;

        switch (sectionId) {
            case 'about':
                this.resetTypingAnimation();
                break;
            // Add other sections if needed
        }
    }

    setupNavbarScroll() {
        const updateNavbar = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                // Scrolling down
                if (this.navbar) {
                    this.navbar.style.transform = 'translateY(-100%)';
                }
            } else {
                // Scrolling up
                if (this.navbar) {
                    this.navbar.style.transform = 'translateY(0)';
                }
            }

            // Add/remove backdrop blur based on scroll position
            if (this.navbar) {
                if (scrollTop > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            }

            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            this.ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(updateNavbar);
                this.ticking = true;
            }
        });
    }

    setupPerformanceOptimizations() {
        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                document.body.classList.add('is-scrolling');
                this.isScrolling = true;
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
                this.isScrolling = false;
            }, 150);
        });

        // Optimize animations during scroll
        const style = document.createElement('style');
        style.textContent = `
            .is-scrolling * {
                animation-duration: 0.01ms !important;
                animation-delay: 0.01ms !important;
                transition-duration: 0.01ms !important;
                transition-delay: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    initTypingAnimation() {
        // Initialize typing animation but don't start it yet
        this.typingElement = document.querySelector('.typing-text');
        if (!this.typingElement) return;

        this.fullText = this.typingElement.textContent;
        this.typingElement.textContent = '';
        this.typingElement.style.borderRight = '2px solid var(--primary-green)';
        this.typingInProgress = false;
        this.cursorInterval = null;
    }

    startTypingAnimation() {
        if (!this.typingElement || this.typingInProgress) return;

        this.typingInProgress = true;
        this.typingElement.textContent = '';
        this.typingElement.style.borderRight = '2px solid var(--primary-green)';

        // Clear any existing cursor blink
        if (this.cursorInterval) {
            clearInterval(this.cursorInterval);
            this.cursorInterval = null;
        }

        let charIndex = 0;
        const typingSpeed = 50; // milliseconds per character

        const typeCharacter = () => {
            if (charIndex < this.fullText.length) {
                this.typingElement.textContent += this.fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    this.typingElement.style.borderRight = 'none';
                    this.typingInProgress = false;
                }, 1000); // Keep cursor for 1 second after completion
            }
        };

        // Start typing after a short delay
        setTimeout(typeCharacter, 500);
    }

    resetTypingAnimation() {
        if (!this.typingElement) return;

        this.typingInProgress = false;
        this.typingElement.textContent = '';
        this.typingElement.style.borderRight = 'none';

        // Clear any existing cursor blink
        if (this.cursorInterval) {
            clearInterval(this.cursorInterval);
            this.cursorInterval = null;
        }
    }

    // Blog Section Animations
    setupBlogAnimations() {
        // Only keep typing effect for first blog post
        const firstTitle = document.querySelector('.blog-post:first-child .blog-post-title');
        if (firstTitle) {
            const text = firstTitle.textContent;
            firstTitle.textContent = '';
            firstTitle.style.borderRight = '2px solid #59e3a0';
            let i = 0;

            function typeWriter() {
                if (i < text.length) {
                    firstTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 60);
                } else {
                    setTimeout(() => {
                        firstTitle.style.borderRight = 'none';
                    }, 1000);
                }
            }

            setTimeout(typeWriter, 1200);
        }

        // Dynamic content scaling based on viewport
        this.updateBlogContentScale();
        window.addEventListener('resize', this.updateBlogContentScale.bind(this));
    }

    updateBlogContentScale() {
        const container = document.querySelector('.blog .container');
        if (!container) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let scale = 1;

        if (vw >= 2560) {
            scale = 1.2;
        } else if (vw >= 1920) {
            scale = 1.1;
        } else if (vw >= 1440) {
            scale = 1;
        } else if (vw >= 1200) {
            scale = 0.95;
        } else if (vw >= 1024) {
            scale = 0.9;
        }

        if (vh < 600) {
            scale *= 0.85;
        } else if (vh < 700) {
            scale *= 0.9;
        } else if (vh > 1200) {
            scale *= 1.05;
        }

        container.style.setProperty('--content-scale', scale);
    }

    // Enhanced Projects Section Animations
    setupProjectsAnimations() {
        // Dynamic content scaling based on viewport like Apple
        const updateProjectsScale = () => {
            const container = document.querySelector('#projects .section-container');
            if (!container) return;

            const vw = window.innerWidth;
            const vh = window.innerHeight;

            let scale = 1;

            // Scale based on viewport width for desktop/laptop screens
            if (vw >= 2560) {
                scale = 1.05;
            } else if (vw >= 1920) {
                scale = 0.95;
            } else if (vw >= 1440) {
                scale = 0.95;
            } else if (vw >= 1280) {
                scale = 1.0;
            } else if (vw >= 1200) {
                scale = 0.95;
            } else if (vw >= 1024) {
                scale = 0.9;
            }

            // Adjust for very tall or very short screens
            if (vh < 700) {
                scale *= 0.8;
            } else if (vh > 1200) {
                scale *= 1.05;
            }

            container.style.setProperty('--content-scale', scale);
        };

        // Update scale on resize and load
        updateProjectsScale();
        window.addEventListener('resize', updateProjectsScale);

        // Add click ripple effect to project cards
        this.setupProjectRippleEffect();

        // Add mouse movement parallax effect
        this.setupProjectParallax();

        // Add intersection observer for project cards
        this.setupProjectCardObserver();
    }

    setupProjectRippleEffect() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', function (e) {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(89, 227, 160, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1000;
                `;

                this.style.position = 'relative';
                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple animation
        this.addRippleStyles();
    }

    setupProjectParallax() {
        // Parallax effects removed for cleaner card behavior
        // Cards now maintain static positioning for better user experience
    }

    setupProjectCardObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all project cards
        const cards = document.querySelectorAll('#projects .project-card');
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    addRippleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .animate-in {
                animation: slideInUp 0.8s ease-out;
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .slide-in-left {
                animation: slideInLeft 0.8s ease-out forwards;
            }

            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .slide-in-right {
                animation: slideInRight 0.8s ease-out forwards;
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .scale-in {
                animation: scaleIn 0.6s ease-out forwards;
            }

            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .stagger-animation .animate-in {
                opacity: 0;
            }

            .stagger-animation .animate-in:nth-child(1) {
                animation-delay: 0.1s;
            }

            .stagger-animation .animate-in:nth-child(2) {
                animation-delay: 0.2s;
            }

            .stagger-animation .animate-in:nth-child(3) {
                animation-delay: 0.3s;
            }

            .stagger-animation .animate-in:nth-child(4) {
                animation-delay: 0.4s;
            }

            .stagger-animation .animate-in:nth-child(5) {
                animation-delay: 0.5s;
            }

            .stagger-animation .animate-in:nth-child(6) {
                animation-delay: 0.6s;
            }
        `;
        document.head.appendChild(style);
    }

    // General animations for different sections
    setupGeneralAnimations() {
        // Add stagger animations to card grids
        const cardGrids = document.querySelectorAll('.cards-row-grid, .projects-grid, .certs-grid');
        cardGrids.forEach(grid => {
            grid.classList.add('stagger-animation');
        });

        // Add hover effects to all buttons
        this.setupButtonAnimations();

        // Add smooth transitions to all interactive elements
        this.setupInteractiveAnimations();
    }

    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .view-all-btn, .nav-cta-button');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });

            button.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });

            button.addEventListener('mousedown', function () {
                this.style.transform = 'translateY(0) scale(0.98)';
            });

            button.addEventListener('mouseup', function () {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
        });
    }

    setupInteractiveAnimations() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.card, .compact-card, .cert-card, .blog-post');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-4px) scale(1.01)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click animations to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .nav-link-anchor');

        interactiveElements.forEach(element => {
            element.addEventListener('click', function (e) {
                // Create a pulse effect
                const pulse = document.createElement('div');
                const rect = this.getBoundingClientRect();

                pulse.style.cssText = `
                    position: fixed;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(89, 227, 160, 0.3);
                    pointer-events: none;
                    z-index: 9999;
                    animation: pulse 0.4s ease-out;
                `;

                document.body.appendChild(pulse);

                setTimeout(() => {
                    pulse.remove();
                }, 400);
            });
        });

        // Add pulse animation CSS
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                to {
                    width: 40px;
                    height: 40px;
                    margin-left: -20px;
                    margin-top: -20px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(pulseStyle);
    }

    setupScrollEffects() {
        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-bg');

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Reveal animations on scroll
        const revealElements = document.querySelectorAll('.reveal-on-scroll');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Individual section animations
    animateAboutCards() {
        const cards = document.querySelectorAll('#about .compact-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 150);
        });
    }

    animateProjectCards() {
        const cards = document.querySelectorAll('#projects .project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('scale-in');
            }, index * 200);
        });
    }

    animateBlogCards() {
        const cards = document.querySelectorAll('#blog .blog-post');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-in-left');
            }, index * 150);
        });
    }

    animateCertCards() {
        const cards = document.querySelectorAll('#certifications .cert-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-in-right');
            }, index * 100);
        });
    }

    // Utility methods
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Add smooth scroll behavior to all internal links
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = this.navbar ? this.navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Performance monitoring
    monitorPerformance() {
        // Monitor frame rate
        let lastTime = performance.now();
        let frameCount = 0;

        const checkFrameRate = (currentTime) => {
            frameCount++;

            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;

                // If FPS is too low, disable some animations
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                } else {
                    document.body.classList.remove('low-performance');
                }
            }

            requestAnimationFrame(checkFrameRate);
        };

        requestAnimationFrame(checkFrameRate);

        // Add CSS for low performance mode
        const perfStyle = document.createElement('style');
        perfStyle.textContent = `
            .low-performance * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            
            .low-performance .project-card:hover {
                transform: none !important;
            }
            
            .low-performance .parallax-bg {
                transform: none !important;
            }
        `;
        document.head.appendChild(perfStyle);
    }

    // Initialize everything
    start() {
        this.setupSmoothScroll();
        this.monitorPerformance();

        // Add loading animation
        this.setupLoadingAnimation();
    }

    setupLoadingAnimation() {
        // Add loading overlay that fades out when page is ready
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000000;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        `;

        const loadingSpinner = document.createElement('div');
        loadingSpinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 3px solid rgba(89, 227, 160, 0.3);
            border-top: 3px solid #59e3a0;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;

        loadingOverlay.appendChild(loadingSpinner);
        document.body.appendChild(loadingOverlay);

        // Add spinner animation
        const spinnerStyle = document.createElement('style');
        spinnerStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyle);

        // Remove loading overlay when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }, 500);
        });
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new ScrollAnimations();
    animations.start();
});