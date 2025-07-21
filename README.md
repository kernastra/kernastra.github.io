# Kernastra - Developer Portfolio Landing Page

A modern, responsive landing page with a sophisticated dark theme, designed to showcase your coding projects and professional presence.

## ✨ Features

- **Modern Design**: Clean, professional layout with sophisticated dark aesthetics
- **Kernastra Branding**: Sleek, tech-forward visual identity
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **GitHub Integration**: Automatically fetches and displays your latest repositories
- **Social Links**: Direct links to GitHub, YouTube, Reddit, and email
- **Interactive Elements**: Smooth scrolling, animations, and hover effects
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading with efficient CSS and JavaScript

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Customize the content** (see Customization section below)
3. **Open `index.html`** in your browser or deploy to your hosting service

## 🎨 Customization

### 1. Personal Information

Edit the following sections in `index.html`:

#### Hero Section
```html
<!-- Update the hero title and description -->
<h1 class="hero-title">
    <span class="title-line">Building Digital</span>
    <span class="title-line accent">Universes</span>
</h1>
<p class="hero-description">
    Your personal description here...
</p>
```

#### About Section
```html
<!-- Update your personal story -->
<p>Your personal story and background...</p>
```

#### Skills
Update the skill tags to match your expertise:
```html
<div class="skill-tags">
    <span class="skill-tag">Your Skill</span>
    <!-- Add more skills -->
</div>
```

### 2. Social Links

Update your social media links in the contact section:

```html
<a href="https://github.com/yourusername" class="social-link" target="_blank">
<a href="https://youtube.com/@yourchannel" class="social-link" target="_blank">
<a href="https://reddit.com/u/yourusername" class="social-link" target="_blank">
<a href="mailto:your.email@example.com" class="social-link">
```

### 3. GitHub Integration

To display your actual repositories:

1. Open `script.js`
2. Find the line: `const username = 'yourusername';`
3. Replace `'yourusername'` with your actual GitHub username
4. Comment out or remove the `displayMockProjects();` line
5. Uncomment the `fetchGitHubRepos();` line

```javascript
// Replace this
const username = 'yourusername';

// With your actual username
const username = 'your-actual-username';

// Remove this line
// displayMockProjects();

// Uncomment this line
fetchGitHubRepos();
```

### 4. Color Scheme

Customize the color palette in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #06b6d4;       /* Highlights */
    --background-primary: #0f0f23; /* Main background */
    --background-secondary: #1a1a3a; /* Section backgrounds */
    /* ... more colors */
}
```

### 5. Contact Form

The contact form is set up with basic frontend validation. To make it functional:

1. Set up a backend service (Node.js, PHP, etc.)
2. Update the form submission logic in `script.js`
3. Replace the mock submission with your actual endpoint

## 📁 File Structure

```
kernastra-landing/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── logo.png            # Kernastra logo
└── README.md           # This file
```

## 🎯 Sections Overview

1. **Navigation**: Fixed header with smooth scrolling links
2. **Hero**: Eye-catching introduction with animated cosmic elements
3. **About**: Personal story, skills, and statistics
4. **Projects**: Showcase of GitHub repositories (auto-populated)
5. **Contact**: Contact form and social links
6. **Footer**: Simple footer with navigation links

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **GitHub API**: Automatic repository fetching
- **Google Fonts**: Space Grotesk and JetBrains Mono
- **Feather Icons**: Clean, consistent iconography

## 📱 Responsive Design

The landing page is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ⚡ Performance Features

- **Lazy Loading**: Images and content load as needed
- **Optimized Animations**: Respects user's motion preferences
- **Efficient CSS**: Minimal and well-organized styles
- **Fast JavaScript**: Optimized event listeners and API calls

## 🎨 Design Philosophy

- **Minimalist**: Clean, uncluttered design
- **Professional**: Suitable for job applications and client presentations
- **Accessible**: WCAG guidelines compliant
- **Modern**: Contemporary design trends and best practices

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Build command: (none needed)
3. Publish directory: `/` (root)
4. Deploy!

### Vercel
1. Import your GitHub repository
2. Framework: Other
3. Root directory: `./`
4. Deploy!

## 🎪 Easter Eggs

Try the Konami Code (↑↑↓↓←→←→BA) while on the page for a fun surprise! 🚀

## 🤝 Contributing

Feel free to fork this project and make it your own! If you create something cool, I'd love to see it.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💫 Credits

- Design inspiration from various portfolio websites and Dribbble
- Icons by [Feather Icons](https://feathericons.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

Made with 💙 and lots of ☕ by the Kernastra team.

*Happy coding! 🚀*
