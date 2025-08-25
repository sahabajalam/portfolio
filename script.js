// ===== NAVIGATION MANAGER =====
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupActiveLinks();
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.navbar-mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (hamburger && mobileMenu) {
            // Function to toggle mobile menu
            const toggleMobileMenu = () => {
                const isActive = mobileMenu.classList.contains('active');
                if (isActive) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                } else {
                    mobileMenu.classList.add('active');
                    hamburger.classList.add('active');
                    hamburger.setAttribute('aria-expanded', 'true');
                    document.body.style.overflow = 'hidden';
                }
            };

            // Add both click and touch events for better mobile support
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });

            // Touch handling for mobile devices
            hamburger.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });

            hamburger.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            }, { passive: false });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when touching outside
            document.addEventListener('touchstart', (e) => {
                if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });

                link.addEventListener('touchend', () => {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"], a[data-section]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle hash links, let regular links work normally
                if (!href || !href.startsWith('#')) {
                    return; // Allow normal navigation for external pages
                }

                e.preventDefault();

                let targetId;
                if (link.hasAttribute('href') && link.getAttribute('href').startsWith('#')) {
                    targetId = link.getAttribute('href').substring(1);
                } else if (link.hasAttribute('data-section')) {
                    targetId = link.getAttribute('data-section');
                }

                if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('.navbar')?.offsetHeight || 0;
                        const elementPosition = targetElement.offsetTop;
                        const offsetPosition = elementPosition - headerOffset - 20;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupScrollEffects() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let ticking = false;
        let scrolled = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollTop > 20 && !scrolled) {
                        navbar.classList.add('scrolled');
                        scrolled = true;
                    } else if (scrollTop <= 20 && scrolled) {
                        navbar.classList.remove('scrolled');
                        scrolled = false;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');

        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.id;

                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.parentElement.classList.remove('active');
                    });

                    // Add active class to the corresponding nav link (only for hash links)
                    const activeNavLink = document.querySelector(`[data-section="${currentSection}"]`) ||
                        document.querySelector(`[href="#${currentSection}"]`);
                    if (activeNavLink) {
                        activeNavLink.parentElement.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
}

// ===== CHAT INTERFACE MANAGER =====
class ChatInterface {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.quickActions = document.getElementById('quickActions');
        this.responses = {
            experience: {
                user: "Tell me about your experience",
                bot: "I'm a junior data scientist with about 1 year of hands-on experience working on predictive modeling, data cleaning, and exploratory analysis. I've completed several projects and internships where I built prototypes, ran experiments, and produced model evaluation reports."
            },
            skills: {
                user: "What are your key skills?",
                bot: "Core skills: Python, pandas, scikit-learn, basic TensorFlow/PyTorch, SQL, and Git. Familiar with feature engineering, model evaluation, and containerization using Docker. Currently learning MLOps and cloud deployment practices."
            },
            projects: {
                user: "Show me some of your projects",
                bot: "Selected projects: � Customer Churn Prediction (capstone), � Transfer-learning Image Classifier, 📊 Time-series Forecasting demo, and several exploratory notebooks. See the Projects page for notebooks and code samples."
            },
            contact: {
                user: "How can I contact you?",
                bot: "You can reach out at 📧 sahabajalam@yahoo.com or via LinkedIn: https://www.linkedin.com/in/sahabajalam/. I'm open to mentorship, internships, and entry-level roles."
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        // Setup quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            // If an inline onclick is present, assume it's intentional and skip adding
            // an additional listener to avoid duplicate calls.
            if (btn.hasAttribute('onclick')) return;

            // Prefer an explicit data-action attribute when available.
            const actionFromData = btn.getAttribute('data-action');
            btn.addEventListener('click', () => {
                const action = actionFromData || btn.onclick?.toString().match(/'([^']+)'/)?.[1];
                if (action) {
                    this.askQuestion(action);
                }
            });
        });
    }

    addMessage(content, isUser = false, showTyping = false) {
        if (!this.chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message flex items-start gap-3';

        if (isUser) {
            messageDiv.innerHTML = `
                <div class="flex-1"></div>
                <div class="user-message p-3 rounded-lg rounded-tr-none max-w-xs">
                    <p class="text-gray-800 text-sm">${content}</p>
                </div>
                <div class="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <i class="fas fa-user text-gray-600 text-sm"></i>
                </div>
            `;
        } else {
            if (showTyping) {
                messageDiv.innerHTML = `
                    <div class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-robot text-green-400 text-sm"></i>
                    </div>
                    <div class="bot-message p-3 rounded-lg rounded-tl-none max-w-xs">
                        <div class="typing-indicator text-white text-sm">
                            <i class="fas fa-ellipsis-h"></i> Typing...
                        </div>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-robot text-green-400 text-sm"></i>
                    </div>
                    <div class="bot-message p-3 rounded-lg rounded-tl-none max-w-xs">
                        <p class="text-white text-sm">${content}</p>
                    </div>
                `;
            }
        }

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        return messageDiv;
    }

    askQuestion(type) {
        const response = this.responses[type];
        if (response) {
            // Add user message
            this.addMessage(response.user, true);

            // Hide quick actions temporarily
            if (this.quickActions) this.quickActions.style.opacity = '0.5';

            // Show typing indicator
            const typingMsg = this.addMessage('', false, true);

            // Simulate thinking time
            setTimeout(() => {
                // Remove typing indicator
                if (typingMsg) typingMsg.remove();

                // Add bot response
                this.addMessage(response.bot, false);

                // Show quick actions again
                if (this.quickActions) this.quickActions.style.opacity = '1';
            }, 1500);
        }
    }

    sendMessage() {
        if (!this.chatInput) return;

        const input = this.chatInput.value.trim();
        if (input) {
            // Add user message
            this.addMessage(input, true);
            this.chatInput.value = '';

            // Show typing indicator
            const typingMsg = this.addMessage('', false, true);

            // Simulate response
            setTimeout(() => {
                if (typingMsg) typingMsg.remove();
                this.addMessage("Thanks for your question! I'm a junior data scientist — I can answer basic questions about my projects and skills. Try the quick action buttons above or ask for notebooks and code examples. 😊", false);
            }, 2000);
        }
    }

    addWelcomeMessage() {
        setTimeout(() => {
            if (this.chatMessages) {
                this.addMessage("💡 I'm a junior data scientist – try the quick action buttons to see sample projects, skills, or contact info.", false);
            }
        }, 800);
    }
}

// ===== RIPPLE EFFECT MANAGER =====
class RippleEffect {
    static addRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    static init() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                RippleEffect.addRipple(button, e);
            });
        });
    }
}

// ===== ANIMATION UTILITIES =====
class AnimationUtils {
    static observeElements() {
        const elements = document.querySelectorAll('.feature-item, .availability-badge, .animate-on-load');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        elements.forEach(element => {
            if (!element.classList.contains('visible')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.6s ease-out';
                observer.observe(element);
            }
        });
    }

    static init() {
        // Initialize animations when DOM is loaded
        setTimeout(() => {
            this.observeElements();
        }, 100);
    }
}

// ===== INTERACTIVE SECTION MANAGER =====
class InteractiveSection {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupParallax();
    }

    setupEventListeners() {
        // Debounced scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                this.handleParallax();
                scrollTimeout = null;
            }, 16); // ~60fps
        }, { passive: true });

        // Social link interactions
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', this.handleSocialClick.bind(this));
        });

        // Card click effects
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', this.handleCardClick.bind(this));
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        document.querySelectorAll('.animate-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    setupParallax() {
        this.parallaxElements = document.querySelectorAll('.bg-quote');
    }

    handleParallax() {
        if (!this.parallaxElements.length) return;

        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.15;

        this.parallaxElements.forEach((el, index) => {
            const modifier = index === 0 ? 1 : 0.6;
            const rotation = rate * (index === 0 ? 0.08 : -0.08);
            el.style.transform = `translateY(${rate * modifier}px) rotate(${rotation}deg)`;
        });
    }

    handleSocialClick(e) {
        // Allow default link behavior - no preventDefault
        const platform = e.currentTarget.querySelector('span')?.textContent;
        this.addRippleEffect(e.currentTarget, e);
        // Removed notification - let the link open normally
    }

    handleCardClick(e) {
        if (e.target.closest('a, button')) return;
        this.addRippleEffect(e.currentTarget, e);
    }

    addRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        Object.assign(ripple.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`,
            background: 'radial-gradient(circle, rgba(0, 185, 107, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s ease-out',
            pointerEvents: 'none',
            zIndex: '1000'
        });

        element.style.position = 'relative';
        element.appendChild(ripple);

        ripple.addEventListener('animationend', () => ripple.remove());
    }
}

// ===== ABOUT SECTION MANAGER =====
class AboutSectionManager {
    constructor() {
        this.init();
    }

    init() {
        this.initializeAnimations();
        this.initializeSkillsScroll();
        this.initializeCertificationScroll();
        this.setupNotifications();
        this.setupHoverEffects();
    }

    initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px -50px 0px'
        });

        document.querySelectorAll('.animate-on-load').forEach(element => {
            observer.observe(element);
        });

        // Staggered skill animations
        setTimeout(() => {
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease-out';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 80);
            });
        }, 600);
    }

    initializeSkillsScroll() {
        const scrollContainer = document.getElementById('skills-container');
        const scrollFadeTop = document.getElementById('skills-fade-top');
        const scrollFadeBottom = document.getElementById('skills-fade-bottom');

        if (!scrollContainer) return;

        function handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
            const isScrolledFromTop = scrollTop > 10;

            if (scrollFadeTop) {
                scrollFadeTop.style.opacity = isScrolledFromTop ? '1' : '0';
            }

            if (scrollFadeBottom) {
                scrollFadeBottom.style.opacity = isScrolledToBottom ? '0' : '1';
            }
        }

        scrollContainer.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);
    }

    initializeCertificationScroll() {
        const scrollContainer = document.getElementById('certifications-container');
        const scrollFadeTop = document.getElementById('cert-fade-top');
        const scrollFadeBottom = document.getElementById('cert-fade-bottom');

        if (!scrollContainer) return;

        function handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
            const isScrolledFromTop = scrollTop > 10;

            if (scrollFadeTop) {
                scrollFadeTop.style.opacity = isScrolledFromTop ? '1' : '0';
            }

            if (scrollFadeBottom) {
                scrollFadeBottom.style.opacity = isScrolledToBottom ? '0' : '1';
            }
        }

        scrollContainer.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);
    }

    setupNotifications() {
        document.addEventListener('click', function (e) {
            if (e.target.closest('button') && e.target.closest('.certification-card')) {
                e.preventDefault();

                const notification = document.createElement('div');
                notification.className = 'fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 transform translate-x-full transition-transform duration-300';

                notification.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="flex-shrink-0">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <span class="flex-1">Certificate viewer would open here!</span>
                        <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200 transition-colors ml-2">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;

                document.body.appendChild(notification);

                setTimeout(() => notification.classList.remove('translate-x-full'), 100);

                setTimeout(() => {
                    notification.classList.add('translate-x-full');
                    setTimeout(() => notification.remove(), 300);
                }, 3000);
            }
        });
    }

    setupHoverEffects() {
        const educationItems = document.querySelectorAll('.group');

        educationItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateX(6px)';
                this.style.boxShadow = '0 8px 25px rgba(22, 163, 74, 0.15)';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
}

// ===== GLOBAL FUNCTIONS (for onclick handlers) =====
function askQuestion(type) {
    if (window.chatInterface) {
        window.chatInterface.askQuestion(type);
    }
}

function sendMessage() {
    if (window.chatInterface) {
        window.chatInterface.sendMessage();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new NavigationManager();
    window.chatInterface = new ChatInterface();
    new InteractiveSection();
    new AboutSectionManager();
    RippleEffect.init();
    AnimationUtils.init();
    initLazyLoading();

    // Keyboard accessibility
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.tagName === 'BUTTON') {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // reveal small hero intro text if present
    const heroIntro = document.querySelector('.hero-intro');
    if (heroIntro) {
        setTimeout(() => heroIntro.classList.add('intro-visible'), 300);
    }

    console.log('Portfolio website initialized successfully!');
});

// Add ripple animation styles if not already present
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}