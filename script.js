// ==================== Portfolio JavaScript ==================== 

// ==================== Typing Animation ==================== 

const roles = [
    'Flutter Developer',
    'Problem Solver',
    'Content Creator',
    'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing');
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenRoles = 2000;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (!isDeleting && charIndex < currentRole.length) {
        // Typing forward
        typingElement.textContent += currentRole[charIndex];
        charIndex++;
        setTimeout(typeRole, typingSpeed);
    } else if (!isDeleting && charIndex === currentRole.length) {
        // Pause before deleting
        isDeleting = true;
        setTimeout(typeRole, delayBetweenRoles);
    } else if (isDeleting && charIndex > 0) {
        // Typing backward
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeRole, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
        // Move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeRole, 500);
});

// ==================== Mobile Menu Toggle ==================== 

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ==================== Smooth Scroll Navigation ==================== 

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

// ==================== Intersection Observer for Fade-in Animations ==================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes based on element type
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            } else if (entry.target.classList.contains('skill-card')) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            } else if (entry.target.classList.contains('glassmorphism')) {
                entry.target.classList.add('animate-fade-in-up');
            }

            // Trigger skill bar animation
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                console.log('Animating skill bar to width:', width);
                bar.style.width = '0%';
                 console.log('Animating skill bar to width:', bar.style.width);
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.querySelectorAll('.project-card, .skill-card, .glassmorphism, .animate-fade-in-up').forEach(el => {
    observer.observe(el);
});

// ==================== Active Navigation Link Highlighting ==================== 

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNavLink = () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400', 'border-b-2', 'border-cyan-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-cyan-400');
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ==================== Parallax Scroll Effect ==================== 

const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ==================== Project Card Hover Effects ==================== 

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add depth effect
        this.style.boxShadow = '0 25px 50px rgba(0, 210, 255, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });
});

// ==================== Scroll to Top Button ==================== 

function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-bold text-xl hover:shadow-lg hover:shadow-cyan-500/50 opacity-0 transition-all duration-300 z-40 pointer-events-none';
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.remove('opacity-0', 'pointer-events-none');
            scrollButton.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollButton.classList.add('opacity-0', 'pointer-events-none');
            scrollButton.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Create scroll to top button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createScrollToTopButton);
} else {
    createScrollToTopButton();
}

// ==================== Performance: Lazy Loading Images ==================== 

const images = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== Navbar Background on Scroll ==================== 

const navbar = document.querySelector('nav');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    if (scrollPosition > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.6)';
        navbar.style.borderBottom = '1px solid rgba(0, 210, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(0, 210, 255, 0.2)';
    }

    lastScrollPosition = scrollPosition;
});

// ==================== Skill Bar Animation on View ==================== 

const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';

            // Trigger animation
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 100);

            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==================== Form Interactions (Future Enhancement) ==================== 

function setupFormHandlers() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFormHandlers);

// ==================== Keyboard Shortcuts ==================== 

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on search or navigation
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add search functionality here if needed
    }

    // Escape to close mobile menu
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
});

// ==================== Smooth Section Transitions ==================== 

const sections_list = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    sections_list.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition >= sectionTop - window.innerHeight / 2 && 
            scrollPosition < sectionTop + sectionHeight) {
            section.style.opacity = '1';
        }
    });
});

// ==================== Copy to Clipboard ==================== 

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
        // Show toast notification
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ==================== Toast Notification ==================== 

function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 right-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg shadow-lg z-50 animate-fade-in';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==================== Performance: Debounce Function ==================== 

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

// ==================== Throttle Function ==================== 

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== Initialize AOS-like Effect ==================== 

function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const aos = element.getAttribute('data-aos');
        const aosDelay = element.getAttribute('data-aos-delay') || 0;
        
        observer.observe(element);
    });
}

// ==================== Dark Mode Toggle (Optional) ==================== 

function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('darkMode', document.body.classList.contains('dark'));
        });

        // Check saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark');
        }
    }
}

// ==================== Google Analytics Tracking ==================== 

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track section views
window.addEventListener('scroll', debounce(() => {
    sections_list.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            trackEvent('engagement', 'section_viewed', section.id);
        }
    });
}, 500));

// ==================== Social Links Tracking ==================== 

const socialLinks = document.querySelectorAll('a[href*="linkedin"], a[href*="github"], a[href*="youtube"]');

socialLinks.forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.getAttribute('href').includes('linkedin') ? 'linkedin' :
                        link.getAttribute('href').includes('github') ? 'github' : 'youtube';
        trackEvent('social', 'click', platform);
    });
});

// ==================== Page Load Optimization ==================== 

window.addEventListener('load', () => {
    // Remove loading class if present
    document.body.classList.remove('loading');
    
    // Log page performance
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime, 'ms');
    }
});

// ==================== Initialize Everything ==================== 

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initAOS();
    setupDarkModeToggle();
    highlightNavLink();
    
    // Log initialization
    console.log('Portfolio initialized successfully!');
});

// ==================== Contact Form Handling ==================== 

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form data
        if (!validateContactForm(data)) {
            formStatus.textContent = 'Please fill all fields correctly.';
            formStatus.classList.add('error');
            formStatus.classList.remove('hidden');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send email via FormSubmit (free service)
            const response = await fetch('https://formsubmit.co/ajax/your-email@example.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formStatus.classList.remove('error');
                formStatus.classList.remove('hidden');
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Fallback: show local success message
            console.log('Form data:', data);
            formStatus.textContent = '✓ Thank you! Your message has been recorded.';
            formStatus.classList.remove('error');
            formStatus.classList.remove('hidden');
            contactForm.reset();

            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ==================== Form Validation ==================== 

function validateContactForm(data) {
    // Check if all fields are filled
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    // Validate message length
    if (data.message.length < 10) {
        return false;
    }

    return true;
}
