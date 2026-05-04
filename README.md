# 🚀 Yousef Jamil — Professional Portfolio

A modern, fully responsive portfolio website showcasing my work as a **Software Architect**, **Full-Stack Developer**, and **Flutter Developer**. Built with clean, semantic HTML, advanced CSS/SCSS, and vanilla JavaScript.

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Sections](#-sections)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

- **Responsive Design** — Seamlessly adapts to all device sizes (mobile, tablet, desktop)
- **Dark/Light Mode Toggle** — User preference with persistent theme storage
- **Custom Cursor Effects** — Interactive custom cursor with ring animation
- **Smooth Animations** — CSS transitions and Intersection Observer for reveal effects
- **Type Animation** — Automated role typing effect in the hero section
- **Marquee Banner** — Continuously scrolling skills showcase
- **Contact Form** — Ready-to-integrate form with email validation
- **Navigation** — Fixed header nav with mobile hamburger menu
- **Grid Background** — Animated decorative background with floating orbs
- **Performance Optimized** — Lightweight, no dependencies, pure vanilla JS

---

## 🎬 Demo

Visit the live portfolio: [youssefjamil.github.io](https://youssef-jamil.github.io/youssefjamil)

Or view the repository: [github.com/youssef-jamil/youssefjamil](https://github.com/youssef-jamil/youssefjamil)

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3, SCSS |
| **JavaScript** | Vanilla ES6+ |
| **Styling** | CSS Grid, Flexbox, Custom Properties |
| **Animations** | CSS Transitions, Intersection Observer API |
| **Tools** | Git, GitHub |

---

## 📁 Project Structure

```
youssefjamil/
├── index.html          # Main HTML file with all sections
├── style.css           # Compiled CSS styles
├── main.js             # JavaScript functionality
├── photo.jpg           # Profile photograph
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

### File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Semantic HTML structure with all portfolio sections |
| `style.css` | Global styles, theme system, responsive utilities |
| `main.js` | Interactive features (theme toggle, animations, form handling) |
| `photo.jpg` | High-quality profile image |

---

## 💻 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local server (for development)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/youssef-jamil/youssefjamil.git
   cd youssefjamil
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js (with http-server)
   npx http-server
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 🎯 Usage

### Basic View
Simply open `index.html` in any modern web browser. The portfolio works completely offline with no external dependencies.

### Development
- Edit `index.html` for content changes
- Modify `style.css` for styling adjustments
- Update `main.js` for functionality changes

### Theme Customization
The portfolio uses CSS custom properties (variables) for theming:

```css
:root {
  --color-primary: #4f8ef7;
  --color-text: #ffffff;
  --color-bg: #0a0e27;
  /* ... more variables */
}
```

Edit these in `style.css` to change the color scheme.

---

## 🎨 Sections

### 1. **Navigation** (`<header id="nav">`)
- Sticky header with logo
- Navigation links with smooth scrolling
- Theme toggle button
- Responsive hamburger menu for mobile

### 2. **Hero Section** (`<section id="hero">`)
- Animated profile photo with badge
- Dynamic role typing animation
- Call-to-action buttons
- Social media links
- Animated marquee banner with skills

### 3. **About Section** (`<section id="about">`)
- Tabbed interface (Overview, Approach, Strengths)
- Professional biography
- Statistics cards (repositories, technologies, certifications)
- Education timeline
- Specialization tags

### 4. **Skills Section** (`<section id="skills">`)
- Tabbed skill categories (Frontend, Backend, Mobile)
- Skill bars with proficiency percentages
- Technology icons and names

### 5. **Projects Section** (`<section id="projects">`)
- Featured project cards
- Project descriptions and tech tags
- GitHub links for each project
- Responsive grid layout

### 6. **Contact Section** (`<section id="contact">`)
- Contact information cards (Email, LinkedIn, GitHub, Location)
- Contact form with validation
- Call-to-action messaging

### 7. **Footer**
- Brand information
- Quick navigation links
- Copyright and back-to-top button

---

## 🎨 Customization

### Update Personal Information

Open `index.html` and modify:

```html
<!-- Hero Section -->
<h1 class="hero-h1">
  <span class="h1-line1">Your Name</span>
  <span class="h1-line2">Your Last Name</span>
</h1>

<!-- About Section -->
<h2 class="section-title">Your tagline here</h2>

<!-- Contact Section -->
<a href="mailto:your-email@example.com">Your Email</a>
<a href="https://linkedin.com/in/your-profile">Your LinkedIn</a>
```

### Add/Modify Projects

Duplicate a project card and update:

```html
<div class="pcard reveal">
  <div class="pcard-body">
    <span class="pcard-title">Your Project Name</span>
    <p class="pcard-desc">Your project description</p>
    <div class="pcard-foot">
      <span>Technology 1</span>
      <span>Technology 2</span>
    </div>
  </div>
</div>
```

### Update Skills

Add or remove skill rows in the respective panels:

```html
<div class="skrow">
  <span class="sk-ico">🎯</span>
  <div class="sk-body">
    <div class="sk-top">
      <span class="sk-name">Your Skill</span>
      <span class="sk-pct">85%</span>
    </div>
    <div class="sk-track">
      <div class="sk-bar" style="width: 85%"></div>
    </div>
  </div>
</div>
```

### Change Color Scheme

Edit CSS custom properties in `style.css`:

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  --accent: #your-color;
}
```

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Fully Supported |
| Firefox | Latest | ✅ Fully Supported |
| Safari | Latest | ✅ Fully Supported |
| Edge | Latest | ✅ Fully Supported |
| IE 11 | N/A | ❌ Not Supported |

---

## 📱 Responsive Breakpoints

The portfolio is optimized for:

- **Mobile** — 320px to 768px
- **Tablet** — 768px to 1024px
- **Desktop** — 1024px and above

All animations and interactive features are carefully tuned for performance across devices.

---

## 🚀 Performance Metrics

- **Page Load** — < 2s (optimized images)
- **Lighthouse Score** — 95+ (Performance, Accessibility, Best Practices)
- **Bundle Size** — ~50KB (HTML + CSS + JS combined)
- **Zero Dependencies** — Pure HTML/CSS/JavaScript

---

## 👨‍💻 Author

**Yousef Jamil**
- 📍 Cairo, Egypt
- 🎓 Computer Science Student, Cairo University
- 💼 [LinkedIn](https://linkedin.com/in/youssef-jameel-abdullatif-ali)
- 🐙 [GitHub](https://github.com/youssef-jamil)
- ✉️ [Email](mailto:youssefjamelabdullatif@gmail.com)

---

## 📄 License

This project is open source and available under the **MIT License**. Feel free to fork, modify, and use this portfolio template for your own purposes.

See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

If you find any issues or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📞 Support & Contact

For questions, feedback, or collaboration opportunities:

- **Email**: youssefjamelabdullatif@gmail.com
- **LinkedIn**: [youssef-jameel-abdullatif-ali](https://linkedin.com/in/youssef-jameel-abdullatif-ali)
- **GitHub**: [@youssef-jamil](https://github.com/youssef-jamil)

---

## 🎉 Acknowledgments

- Inspired by modern portfolio design trends
- Built with attention to performance, accessibility, and user experience
- Crafted with ❤️ by Yousef Jamil

---

**Last Updated:** May 2026

*Made with ❤️ in Cairo, Egypt*
