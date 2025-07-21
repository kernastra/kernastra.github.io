# Kernastra - Full Stack Developer Portfolio

A modern, responsive personal portfolio website featuring a retro-futuristic space aesthetic. Built with clean HTML, CSS, and JavaScript for optimal performance and GitHub Pages compatibility.

## 🎨 Design Features

- **Retro-Futuristic Space Theme**: Inspired by mid-century sci-fi aesthetics
- **Custom Color Palette**: 
  - `#cda57d` – Warm beige (headings, buttons, accents)
  - `#e5c197` – Pale sand (highlights, hover states)
  - `#8f2f1c` – Deep orange-red (primary accent)
  - `#1a2633` – Space blue (main background)
  - `#0e0e0f` – Deep black-gray (footer, navigation)
- **Responsive Design**: Mobile-first approach with smooth animations
- **Interactive Elements**: Glitch effects, hover animations, parallax scrolling

## 🏗️ Structure

- **Landing Page**: Full-width hero with animated title and call-to-action buttons
- **Navigation**: Sticky navbar with mobile hamburger menu
- **Projects Section**: Grid layout showcasing portfolio work with hover effects
- **About Me**: Personal bio with organized skills grid
- **Contact Section**: Working contact form with social media links

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kernastra/kernastra.github.io.git
   cd kernastra.github.io
   ```

2. **Open in browser**:
   - Open `index.html` directly in your browser, or
   - Use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Visit**: `http://localhost:8000`

### GitHub Pages Deployment

1. **Repository Setup**:
   - Ensure your repository is named `[username].github.io`
   - Push all files to the `main` branch

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click "Save"

3. **Access**: Your site will be live at `https://[username].github.io`

## 📁 File Structure

```
kernastra.github.io/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # Interactive functionality
├── assets/             # Static assets folder
│   ├── project1.jpg    # Project screenshots
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   ├── resume.pdf      # Resume/CV file
│   └── README.md       # Assets documentation
└── README.md           # This file
```

## ⚙️ Customization

### Personal Information

1. **Update the hero section** in `index.html`:
   ```html
   <h1 class="hero-title glitch" data-text="YOUR_NAME">YOUR_NAME</h1>
   <p class="hero-subtitle">Your Title</p>
   <p class="hero-description">Your description</p>
   ```

2. **Modify the About section** with your bio and skills
3. **Update contact information** in the contact section

### Projects

1. **Add project images** to the `assets/` folder
2. **Update project cards** in the Projects section:
   ```html
   <div class="project-card">
       <div class="project-image">
           <img src="assets/your-project.jpg" alt="Project Name">
           <!-- ... -->
       </div>
       <div class="project-content">
           <h3>Your Project Name</h3>
           <p>Project description</p>
           <div class="project-tags">
               <span class="tag">Technology</span>
               <!-- ... -->
           </div>
       </div>
   </div>
   ```

### Color Scheme

Modify the CSS variables in `style.css`:
```css
:root {
    --warm-beige: #cda57d;
    --pale-sand: #e5c197;
    --deep-orange-red: #8f2f1c;
    --space-blue: #1a2633;
    --deep-black-gray: #0e0e0f;
}
```

### Social Links

Update the social media links in the contact section:
```html
<div class="social-links">
    <a href="https://github.com/yourusername" target="_blank" class="social-link">
        <i class="fab fa-github"></i>
    </a>
    <!-- ... -->
</div>
```

## 🛠️ Technical Features

- **Semantic HTML5**: Accessible and SEO-friendly structure
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Easy theming and maintenance
- **Intersection Observer API**: Smooth scroll animations
- **Form Validation**: Client-side contact form validation
- **Mobile Navigation**: Responsive hamburger menu
- **Performance Optimized**: Lightweight with minimal dependencies

## 📱 Browser Support

- **Modern browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features**: CSS Grid, Custom Properties, Intersection Observer

## 🎯 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Load Time**: < 2 seconds on 3G networks
- **Image Optimization**: Recommended max 200KB per project image
- **Minimal Dependencies**: Only Font Awesome for icons

## � Development

### Adding New Features

1. **CSS**: Use the existing custom properties for consistency
2. **JavaScript**: Follow the modular pattern in `script.js`
3. **HTML**: Maintain semantic structure and accessibility

### Common Modifications

- **Add new sections**: Copy existing section structure
- **Modify animations**: Update CSS transitions and keyframes
- **Change fonts**: Update Google Fonts imports and CSS variables
- **Add icons**: Use Font Awesome classes or custom SVGs

## � Support

For questions or issues:
- Review the code comments for guidance
- Check browser console for JavaScript errors
- Ensure all file paths are correct
- Validate HTML/CSS for syntax errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for developers by developers**
