// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Determine theme:
    // 1) Use saved preference if present
    // 2) Else use system preference
    // 3) Fallback to light
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    body.setAttribute('data-theme', initialTheme);
    
    // Update theme toggle icon based on current theme
    updateThemeIcon(initialTheme);

    // If user has not explicitly chosen a theme, react to system changes
    if (!savedTheme && window.matchMedia) {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            body.setAttribute('data-theme', newTheme);
            
            // Save to localStorage
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeIcon(newTheme);
            
            // Smooth theme transition without layout shift
            const root = document.documentElement;
            root.classList.add('theme-transition');
            setTimeout(() => {
                root.classList.remove('theme-transition');
            }, 300);
        });
    }
}

// Update theme toggle icon
function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.theme-icon-sun');
    const moonIcon = document.querySelector('.theme-icon-moon');
    
    if (theme === 'dark') {
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(-180deg) scale(0.8)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg) scale(1)';
    } else {
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg) scale(1)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(180deg) scale(0.8)';
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initSmoothScrolling();
    initPortfolioFilter();
    initMobileNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initSectionReveal();
    initAdvancedParallax();
    initNavbarScrollBackground();
});
// Navbar background on scroll
function initNavbarScrollBackground() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const threshold = 70;
    const onScroll = () => {
        // Always sticky; only toggle background style
        if (window.scrollY > threshold) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Portfolio filtering functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // First, hide all items with animation
            portfolioItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';
                item.style.transition = 'all 0.3s ease';
            });
            
            // After hiding animation, show filtered items from first position
            setTimeout(() => {
                portfolioItems.forEach((item, index) => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.classList.remove('hidden');
                        // Reset position to first order
                        item.style.order = '0';
                        // Staggered animation from first position
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, index * 100); // Staggered delay
                    } else {
                        item.classList.add('hidden');
                        item.style.order = '999'; // Move to end
                    }
                });
            }, 300);
        });
    });
}

// Mobile navigation toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .portfolio-item, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (heroVisual && floatingCards.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingCards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Advanced Parallax Effects
function initAdvancedParallax() {
    const parallaxElements = document.querySelectorAll('.floating-shape, .gradient-orb, .tech-item, .pattern-circle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed * 0.3);
            const rotate = scrolled * 0.1;
            
            element.style.transform = `translateY(${yPos}px) rotate(${rotate}deg)`;
        });
    });
}

// Section Reveal Animations
function initSectionReveal() {
    const sections = document.querySelectorAll('.parallax-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.skill-category, .timeline-item, .portfolio-item, .stat');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('section-reveal');
        observer.observe(section);
    });
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .skill-category,
    .timeline-item,
    .portfolio-item,
    .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .skill-category.animate-in,
    .timeline-item.animate-in,
    .portfolio-item.animate-in,
    .stat.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem;
        box-shadow: var(--shadow-lg);
        border-top: 1px solid var(--color-gray-200);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Add smooth reveal animation for hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add typing effect for hero role
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        const originalText = heroRole.textContent;
        setTimeout(() => {
            typeWriter(heroRole, originalText, 80);
        }, 1000);
    }
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    const nav = document.querySelector('.nav');
    const threshold = 70;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        if (window.scrollY > threshold) {
            progressBar.classList.add('visible');
        } else {
            progressBar.classList.remove('visible');
        }
    });
}

// Initialize scroll progress
initScrollProgress();

// Dynamic Cursor Trail Effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursor.style.left = trailX + 'px';
        cursor.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize cursor trail
initCursorTrail();

// Smooth hover effects for better UX
function initSmoothHoverEffects() {
    const hoverElements = document.querySelectorAll('.skill-category, .portfolio-item, .btn');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
}

// Advanced Particle System
function initAdvancedParticles() {
    // Particles disabled per design request
}

// Sound-Reactive Animations (Visual Only)
// Removed pulsating/sound-reactive effects


// Initialize all advanced effects
document.addEventListener('DOMContentLoaded', function() {
    initSmoothHoverEffects();
    initAdvancedParticles();
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
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
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--color-primary), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.3;
        mix-blend-mode: difference;
        transition: opacity 0.3s ease;
    }
    
    .cursor-trail:hover {
        opacity: 0.6;
        transform: scale(1.5);
    }
    `;
    document.head.appendChild(rippleStyle);
});
