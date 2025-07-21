// Kernastra Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(14, 14, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(14, 14, 15, 0.95)';
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple form validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual backend integration)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#8f2f1c' : type === 'error' ? '#d32f2f' : '#cda57d'};
            color: ${type === 'success' || type === 'error' ? '#e5c197' : '#1a2633'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            font-family: 'Montserrat', sans-serif;
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add notification animations
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(notificationStyles);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    sections.forEach(section => observer.observe(section));
    projectCards.forEach(card => observer.observe(card));
    skillCategories.forEach(category => observer.observe(category));

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.3;
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Random glitch effect trigger
    function randomGlitch() {
        const glitchElement = document.querySelector('.glitch');
        if (glitchElement) {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = 'glitch 0.3s';
            }, 10);
            
            setTimeout(() => {
                glitchElement.style.animation = 'glitch 3s infinite';
            }, 300);
        }
    }

    // Trigger random glitch every 15-25 seconds
    setInterval(randomGlitch, Math.random() * 10000 + 15000);

    // Project card hover effects
    const projectCards2 = document.querySelectorAll('.project-card');
    projectCards2.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add scanning line effect
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #e5c197, transparent);
                animation: cardScan 0.8s ease-out;
                z-index: 10;
            `;
            this.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.parentNode.removeChild(scanLine);
                }
            }, 800);
        });
    });

    // Add scanning animation
    const scanAnimation = document.createElement('style');
    scanAnimation.textContent = `
        @keyframes cardScan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(scanAnimation);

    // Typing effect for hero description
    function typeWriter(element, text, speed = 50) {
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

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            const originalText = heroDescription.textContent;
            typeWriter(heroDescription, originalText, 30);
        }
    }, 2000);

    // Skills hover animation
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(205, 165, 125, 0.3)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Initialize dynamic stars
    createDynamicStars();

    // Console easter egg
    console.log(`
    ╔═══════════════════════════════════════════════════════════════════╗
    ║                          KERNASTRA.DEV                           ║
    ║                     Full Stack Developer                         ║
    ╠═══════════════════════════════════════════════════════════════════╣
    ║  Welcome to my portfolio's developer console!                    ║
    ║  Status: ONLINE                                                   ║
    ║  Mode: PORTFOLIO                                                  ║
    ║  Stack: Full                                                      ║
    ║                                                                   ║
    ║  > Interested in collaborating?                                   ║
    ║  > Check out my projects above or reach out via the contact form ║
    ║  > Let's build something amazing together! 🚀                    ║
    ╚═══════════════════════════════════════════════════════════════════╝
    `);
});

// Add some dynamic background stars
function createDynamicStars() {
    const starsContainer = document.createElement('div');
    starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #e5c197;
            border-radius: 50%;
            animation: twinkle ${2 + Math.random() * 3}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${Math.random() * 8 + 4}px #e5c197;
        `;
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
    
    // Add twinkle animation
    const twinkleStyle = document.createElement('style');
    twinkleStyle.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(twinkleStyle);
}

// Smooth page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
