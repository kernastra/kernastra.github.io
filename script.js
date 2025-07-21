// Kernastra Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Terminal typing effect
    function typewriterEffect() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        const cursor = document.querySelector('.cursor');
        
        terminalLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        line.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                        if (index === terminalLines.length - 1) {
                            // Show cursor on last line
                            cursor.style.display = 'inline';
                        }
                    }
                }, 50);
            }, index * 800);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger terminal typing effect when contact section is visible
                if (entry.target.id === 'contact') {
                    setTimeout(typewriterEffect, 500);
                }
                
                // Animate status bars when features section is visible
                if (entry.target.id === 'features') {
                    animateStatusBars();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Status bar animation
    function animateStatusBars() {
        const statusFills = document.querySelectorAll('.status-fill');
        statusFills.forEach((fill, index) => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            
            setTimeout(() => {
                fill.style.transition = 'width 2s ease-out';
                fill.style.width = targetWidth;
            }, index * 200);
        });
    }

    // Add CSS for animation classes
    const style = document.createElement('style');
    style.textContent = `
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in .feature-card {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-in .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .animate-in .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .animate-in .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .animate-in .feature-card:nth-child(4) { transition-delay: 0.4s; }
        
        .content-card {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in .content-card {
            opacity: 1;
            transform: translateX(0);
        }
        
        .animate-in .content-card:nth-child(2) { transition-delay: 0.2s; }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Random glitch effect trigger
    function randomGlitch() {
        const logo = document.querySelector('.glitch');
        if (logo) {
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'glitch 0.3s';
            }, 10);
            
            setTimeout(() => {
                logo.style.animation = 'glitch 3s infinite';
            }, 300);
        }
    }

    // Trigger random glitch every 10-20 seconds
    setInterval(randomGlitch, Math.random() * 10000 + 10000);

    // Add hover sound effect simulation (visual feedback)
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px #00ff00, 0 0 30px #00ff00';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add scanning line effect
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ffff, transparent);
                animation: cardScan 0.5s ease-out;
                z-index: 10;
            `;
            this.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.parentNode.removeChild(scanLine);
                }
            }, 500);
        });
    });

    // Initialize the hero section as visible
    document.querySelector('.hero').classList.add('animate-in');
    
    // Console easter egg
    console.log(`
    ██╗  ██╗███████╗██████╗ ███╗   ██╗ █████╗ ███████╗████████╗██████╗  █████╗ 
    ██║ ██╔╝██╔════╝██╔══██╗████╗  ██║██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
    █████╔╝ █████╗  ██████╔╝██╔██╗ ██║███████║███████╗   ██║   ██████╔╝███████║
    ██╔═██╗ ██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║╚════██║   ██║   ██╔══██╗██╔══██║
    ██║  ██╗███████╗██║  ██║██║ ╚████║██║  ██║███████║   ██║   ██║  ██║██║  ██║
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
    
    Welcome to Kernastra Mission Control
    Systems Status: OPERATIONAL
    Retro Mode: ENABLED
    
    > Mission specialist detected in developer console
    > Access level: ENGINEER
    > Keep exploring, space cadet! 🚀
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
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ffffff;
            border-radius: 50%;
            animation: twinkle ${2 + Math.random() * 3}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px #ffffff;
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

// Initialize dynamic stars
createDynamicStars();
