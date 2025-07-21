// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contact-form');
const statNumbers = document.querySelectorAll('.stat-number');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // Height of the fixed navbar
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Feather Icons
feather.replace();

// Animated Counter for Statistics
function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const count = parseInt(stat.innerText);
        const increment = target / 100;
        
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            stat.innerText = target + '+';
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.closest('.about-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.hero-text, .about-text, .about-stats, .project-card, .contact-info, .contact-form').forEach(el => {
    observer.observe(el);
});

// GitHub API Integration
async function fetchGitHubRepos() {
    try {
        // Replace 'yourusername' with actual GitHub username
        const username = 'yourusername'; // Update this!
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        displayProjects(repos);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        displayProjectsError();
    }
}

function displayProjects(repos) {
    projectsGrid.innerHTML = '';
    
    repos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Get the primary language or default
    const language = repo.language || 'Code';
    
    // Format dates
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${repo.name}</h3>
            <div class="project-stats">
                <div class="project-stat">
                    <i data-feather="star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="project-stat">
                    <i data-feather="git-branch"></i>
                    <span>${repo.forks_count}</span>
                </div>
            </div>
        </div>
        <p class="project-description">
            ${repo.description || 'A creative project exploring new technologies and possibilities.'}
        </p>
        <div class="project-tech">
            <span class="tech-tag">${language}</span>
            ${repo.topics ? repo.topics.slice(0, 3).map(topic => `<span class="tech-tag">${topic}</span>`).join('') : ''}
        </div>
        <div class="project-links">
            <a href="${repo.html_url}" class="project-link" target="_blank">
                <i data-feather="github"></i>
                <span>View Code</span>
            </a>
            ${repo.homepage ? `
                <a href="${repo.homepage}" class="project-link" target="_blank">
                    <i data-feather="external-link"></i>
                    <span>Live Demo</span>
                </a>
            ` : ''}
        </div>
        <div class="project-meta">
            <small>Updated: ${updatedDate}</small>
        </div>
    `;
    
    // Re-initialize feather icons for the new content
    setTimeout(() => feather.replace(), 100);
    
    return card;
}

function displayProjectsError() {
    projectsGrid.innerHTML = `
        <div class="project-loading">
            <p>Unable to load projects at the moment. Please visit my <a href="https://github.com/yourusername" target="_blank">GitHub profile</a> directly.</p>
        </div>
    `;
}

// Mock projects fallback (remove when you add your GitHub username)
function displayMockProjects() {
    const mockProjects = [
        {
            name: 'cosmic-portfolio',
            description: 'A beautiful, responsive portfolio website with a retro space theme built with vanilla JavaScript and CSS animations.',
            language: 'JavaScript',
            html_url: 'https://github.com/yourusername/cosmic-portfolio',
            stargazers_count: 25,
            forks_count: 8,
            topics: ['portfolio', 'css', 'responsive'],
            updated_at: '2025-01-15T10:30:00Z',
            homepage: 'https://yourportfolio.com'
        },
        {
            name: 'api-explorer',
            description: 'RESTful API testing tool with a clean interface for developers to test and document APIs efficiently.',
            language: 'React',
            html_url: 'https://github.com/yourusername/api-explorer',
            stargazers_count: 42,
            forks_count: 15,
            topics: ['react', 'api', 'testing'],
            updated_at: '2025-01-10T14:20:00Z'
        },
        {
            name: 'code-snippet-manager',
            description: 'Organize and manage your code snippets with syntax highlighting and smart search functionality.',
            language: 'TypeScript',
            html_url: 'https://github.com/yourusername/code-snippet-manager',
            stargazers_count: 33,
            forks_count: 12,
            topics: ['typescript', 'productivity', 'snippets'],
            updated_at: '2025-01-05T09:15:00Z'
        },
        {
            name: 'ml-predictor',
            description: 'Machine learning model for price prediction using Python scikit-learn and data visualization.',
            language: 'Python',
            html_url: 'https://github.com/yourusername/ml-predictor',
            stargazers_count: 67,
            forks_count: 23,
            topics: ['python', 'machine-learning', 'data-science'],
            updated_at: '2024-12-28T16:45:00Z'
        },
        {
            name: 'task-automation',
            description: 'Collection of automation scripts to streamline development workflow and boost productivity.',
            language: 'Shell',
            html_url: 'https://github.com/yourusername/task-automation',
            stargazers_count: 19,
            forks_count: 6,
            topics: ['automation', 'productivity', 'scripts'],
            updated_at: '2024-12-20T11:30:00Z'
        },
        {
            name: 'design-system',
            description: 'Comprehensive design system with reusable components and design tokens for consistent UI development.',
            language: 'CSS',
            html_url: 'https://github.com/yourusername/design-system',
            stargazers_count: 55,
            forks_count: 18,
            topics: ['design-system', 'css', 'components'],
            updated_at: '2024-12-15T13:20:00Z'
        }
    ];
    
    displayProjects(mockProjects);
}

// Contact Form Handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Update button to show loading state
    submitButton.innerHTML = '<span>Sending...</span><div class="loading-spinner" style="width: 16px; height: 16px; margin-left: 8px;"></div>';
    submitButton.disabled = true;
    
    try {
        // Here you would typically send the form data to your backend
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        submitButton.innerHTML = '<span>Message Sent!</span><i data-feather="check"></i>';
        submitButton.style.background = '#10b981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            feather.replace();
        }, 3000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        submitButton.innerHTML = '<span>Error - Try Again</span><i data-feather="x"></i>';
        submitButton.style.background = '#ef4444';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            feather.replace();
        }, 3000);
    }
    
    feather.replace();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.9)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    const planets = document.querySelectorAll('.planet');
    
    if (heroVisual) {
        planets.forEach((planet, index) => {
            const speed = (index + 1) * 0.5;
            planet.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load projects (try GitHub API first, fallback to mock data)
    displayMockProjects(); // Remove this line when you add your GitHub username
    // fetchGitHubRepos(); // Uncomment this when you add your GitHub username
    
    // Add fade-in animation class
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Add some Easter eggs for fun
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Make all planets spin faster
        document.querySelectorAll('.planet').forEach(planet => {
            planet.style.animation = 'float 0.5s ease-in-out infinite, spin 2s linear infinite';
        });
        
        console.log('🚀 Cosmic mode activated! The universe is spinning faster!');
        
        // Reset after 5 seconds
        setTimeout(() => {
            document.querySelectorAll('.planet').forEach(planet => {
                planet.style.animation = '';
            });
        }, 5000);
    }
});

// Performance optimization: Lazy load images if any are added later
const observeImages = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observeImages.unobserve(img);
            }
        }
    });
});

// Observe any images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    observeImages.observe(img);
});
