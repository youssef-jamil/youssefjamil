# 💻 Yousef Jameel — Personal Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Status](https://img.shields.io/badge/status-live-22d47e)](https://youssef-jamil.github.io/youssefjamil)

A **production-quality, fully responsive** personal portfolio website showcasing my work as a Software Architect, Full-Stack Developer, and Flutter Developer. Built from scratch with semantic HTML5, advanced CSS3, and vanilla JavaScript — zero dependencies, zero frameworks.

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Sections Breakdown](#-sections-breakdown)
- [JavaScript Modules](#-javascript-modules)
- [CSS Architecture](#-css-architecture)
- [Installation & Local Development](#-installation--local-development)
- [Customization Guide](#-customization-guide)
- [Accessibility](#-accessibility)
- [Performance](#-performance)
- [Browser Support](#-browser-support)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [Author & Contact](#-author--contact)
- [License](#-license)

---

## 🌐 Live Demo

🔗 **[youssef-jamil.github.io/youssefjamil](https://youssef-jamil.github.io/youssefjamil)**

> View the full source: [github.com/youssef-jamil/youssefjamil](https://github.com/youssef-jamil/youssefjamil)

---

## ✨ Features

### UI & Design
- **Dark / Light Mode Toggle** — Respects the OS `prefers-color-scheme` preference on first load; choice is persisted in `localStorage` and synced across browser tabs
- **Scroll Progress Bar** — A 2 px gradient bar fixed at the very top of the viewport tracks reading progress in real time
- **Animated Background** — A subtle CSS grid overlay combined with two blurred radial-gradient "orbs" gives the page depth without hurting performance
- **Marquee Skills Banner** — An infinitely scrolling, CSS-animated ticker lists core technologies; pauses on hover
- **Photo Tilt Effect** — On desktop pointer devices, the hero photo responds to `mousemove` with a smooth `perspective` 3-D tilt

### Navigation
- **Fixed Header** — Transparent until the user scrolls 50 px, then a border separator fades in
- **Active Link Highlighting** — Uses `IntersectionObserver` to highlight the nav link for whichever section is in view
- **Smooth Anchor Scrolling** — All `href="#..."` links use `window.scrollTo({ behavior: 'smooth' })` and account for the fixed nav height (64 px offset)
- **Mobile Hamburger Menu** — Full-screen overlay nav with body-scroll lock, outside-click dismiss, and `Escape` key support; fully ARIA-compliant

### Content & Interactions
- **Typewriter Role Animation** — Cycles through five job titles with configurable typing / deleting speeds; pauses when the browser tab is hidden via the Page Visibility API
- **Scroll Reveal** — `IntersectionObserver`-powered `reveal` and `reveal-r` classes fade + slide elements in as they enter the viewport
- **Animated Skill Bars** — CSS transform (`scaleX`) bars animate from zero to their target width with staggered `transitionDelay` when the Skills section scrolls into view
- **Tabbed Interfaces** — Both the About and Skills sections use accessible tab panels with full arrow-key keyboard navigation
- **Animated Counters** — Statistics in the About card count up from zero using an `ease-out-quart` easing function driven by `requestAnimationFrame`
- **Project Cards** — Feature a drifting dot-grid background, a sweep shine effect on hover, a scan-beam animation, and a CSS `cardReveal` entry animation

### Contact Form
- Client-side validation (name, valid e-mail regex, message length ≤ 2 000 characters)
- Control-character sanitisation before building the `mailto:` URL
- Live character counter with colour warning above 1 800 characters
- Sends via the default e-mail client — no server or third-party service required

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Markup** | HTML5 — semantic, accessible, SEO-optimised |
| **Styling** | CSS3 — Custom Properties (design tokens), Grid, Flexbox, `@keyframes`, `@media` |
| **Scripting** | Vanilla JavaScript ES6+ — IIFEs, `IntersectionObserver`, Page Visibility API, `requestAnimationFrame` |
| **Fonts** | Bricolage Grotesque (display) · Plus Jakarta Sans (body) via Google Fonts |
| **Icons** | Font Awesome 6 Free via CDN |
| **Version Control** | Git · GitHub Pages |

---

## 📁 Project Structure

```
youssefjamil/
│
├── index.html              # Single-page application shell — all sections live here
│
├── Styles/
│   └── style.css           # All styling: design tokens → reset → components → animations → responsive
│
├── Js/
│   └── main.js             # All interactivity split into self-contained IIFEs
│
├── Image/
│   └── my-photo.png        # Hero profile photograph
│
├── README.md               # Project documentation (this file)
├── LICENSE                 # MIT License
└── .gitignore              # Git ignore rules
```

---

## 🎨 Sections Breakdown

### 1. Navigation (`<header id="nav">`)

A fixed 64 px header that blurs its background (`backdrop-filter: blur(22px) saturate(1.6)`) and adds a subtle border separator after the user scrolls. Contains:

- Brand logo that links back to `#hero`
- Desktop pill-style nav with active-link tracking
- "Hire Me" CTA button
- Theme toggle (moon ↔ sun icon swap)
- Hamburger button (mobile only, hidden via CSS on wider screens)

### 2. Hero (`<section id="hero">`)

A full-viewport-height (`100svh`) two-column grid (text left, photo right) that collapses to single column on tablet and below.

- **Availability badge** with blinking green dot
- **H1 display heading** with underline-draw animation on the surname
- **Typewriter** cycling: *Software Architect → Full-Stack Developer → Flutter Developer → Clean Code Enthusiast → Problem Solver*
- **Bio paragraph**, CTA buttons, and social pills (GitHub, LinkedIn, Email)
- **Floating badges** on the profile photo (location, university) + "Open to work" status chip
- **Marquee band** immediately below the hero grid

### 3. About (`<section id="about">`)

Two-column layout (text + card). The text column has a **three-tab panel**:

| Tab | Content |
|---|---|
| Overview | Personal bio, university, passion for architecture |
| Approach | Problem-solving philosophy and methodology |
| Strengths | 8-item grid of core competencies |

The card column features:
- Three animated counters: Repositories · Technologies · Certifications
- Education timeline (B.Sc. Cairo University, CS50 Harvard)
- Specialization and language tag clouds

### 4. Skills (`<section id="skills">`)

Three-tab panel (Frontend / Backend / Mobile), each containing a list of `skrow` items:

| Tab | Skills |
|---|---|
| **Frontend** | HTML5 · CSS3/SCSS · JavaScript ES6+ · React · Bootstrap · Responsive Design |
| **Backend** | Java · Python · C++ · Git · GitHub |
| **Mobile** | Flutter · Dart |

Every skill row has:
- Coloured Font Awesome icon
- Skill name + percentage label
- ARIA `role="progressbar"` track with an animating `scaleX` fill bar
- Category chip badge

### 5. Projects (`<section id="projects">`)

A 3-column CSS Grid with:

| # | Project | Stack |
|---|---|---|
| 01 | **Portfolio Website** *(spans 2 cols)* | HTML5, SCSS, CSS3, Animations |
| 02 | **Flutter Mobile App** | Flutter, Dart, Clean Architecture |
| 03 | **React Web Application** | React, JavaScript, Bootstrap, Hooks |

Each card (`pcard`) includes a gradient banner, drifting dot grid, animated scan beam, shine sweep on hover, and graceful `cardReveal` entry.

### 6. Contact (`<section id="contact">`)

Two-column layout: info list (Email, LinkedIn, GitHub, Location) on the left, form on the right.

The form collects:
- Name (required, max 100 chars)
- Email (required, RFC 5322 validation, max 254 chars)
- Subject (optional, max 200 chars)
- Message (required, max 2 000 chars with live counter)

On submit, a sanitised `mailto:` URL is opened in the user's default mail client. No backend or third-party service needed.

### 7. Footer

Flex row: brand logo + tagline · quick nav links · copyright year (auto-updated) + back-to-top button.

---

## 🧩 JavaScript Modules

All functionality is wrapped in **immediately invoked function expressions (IIFEs)** to avoid global scope pollution. Each module is fully independent.

| IIFE | Description |
|---|---|
| `initScrollBar` | Calculates `scrollY / (scrollHeight - innerHeight)` and sets the progress bar width |
| `initTheme` | Reads `localStorage`, falls back to `prefers-color-scheme`, swaps icons, and listens on `storage` for cross-tab sync |
| `initMobileNav` | Manages open/close state, ARIA attributes, body scroll lock, outside-click and `Escape` dismiss |
| `initTypewriter` | Cursor-blinking typewriter with configurable words, respects Page Visibility API |
| `initReveal` | Single `IntersectionObserver` handles both `.reveal` / `.reveal-r` fade-slide and `.pcard` entry animation gating |
| `initActiveNav` | Finds the current section by comparing `offsetTop` to `scrollY + 120px` offset; also toggles `.scrolled` on the nav |
| `initCounters` | `IntersectionObserver` triggers `requestAnimationFrame` counter with `ease-out-quart` easing |
| `initSkillsTabs` | Tab switching with bar reset/re-animate; arrow-key keyboard navigation; first-view animation via section observer |
| `initAboutTabs` | Same pattern as skills tabs without the bar animation |
| `initPhotoTilt` | `mousemove` → `perspective` + `rotateX/Y` on desktop pointer devices only |
| `initSmoothScroll` | Intercepts all `a[href^="#"]` clicks, adjusts for nav height, pushes to `history`, moves focus for screen readers |
| `initContactForm` | Sanitises input, validates, builds `mailto:` URL, manages button loading state, shows feedback |

---

## 🖌️ CSS Architecture

The stylesheet follows a **top-down token-first** architecture:

```
1. Design Tokens    — :root custom properties (colours, radii, easing, fonts)
2. Light Theme      — [data-theme="light"] overrides
3. Reset            — box-sizing, margin/padding zero-out, scrollbar styling
4. Accessibility    — skip link, :focus-visible ring, prefers-reduced-motion
5. Global UI        — scroll bar, bg grid, orbs
6. Navigation       — fixed header, nav-pill, mobile nav
7. Layout Helpers   — .container, .section-tag, .section-title, .section-sub
8. Buttons          — .btn variants with shine pseudo-element
9. Sections         — Hero → About → Skills → Projects → Contact → Footer
10. Animations      — @keyframes library
11. Reveal Classes  — .reveal, .reveal-r, .in, .d1/.d2/.d3 delay helpers
12. Responsive      — ≤1024px tablet, ≤768px mobile, ≤480px small mobile
13. Print           — hides decorative UI, appends href to links
```

### Design Token Reference

```css
/* Core palette (dark mode defaults) */
--bg:     #07070f   /* page background          */
--sur:    #0f0f1e   /* card / surface            */
--text:   #eeeeff   /* primary text              */
--sub:    #9898bc   /* secondary text            */
--accent: #4f8ef7   /* primary accent (blue)     */
--ac2:    #f5a623   /* secondary accent (amber)  */
--green:  #22d47e   /* success / availability    */
```

---

## 💻 Installation & Local Development

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- A local static file server (required to avoid CORS issues with fonts)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/youssef-jamil/youssefjamil.git
cd youssefjamil

# 2a. Serve with Python 3
python -m http.server 8000

# 2b. Or with Node.js
npx serve .

# 2c. Or with the VS Code Live Server extension — click "Go Live"

# 3. Open in your browser
open http://localhost:8000
```

> **Note:** Opening `index.html` directly via `file://` works for most features, but Google Fonts may not load due to browser security restrictions. Always prefer a local server.

---

## 🎨 Customization Guide

### Update Personal Information

Open `index.html` and search for the following placeholders:

```html
<!-- Hero name -->
<span class="h1-line1">Your First Name</span>
<span class="h1-line2">Your Last Name</span>

<!-- Hero bio -->
<p class="hero-bio">Your bio here...</p>

<!-- Social links -->
<a href="https://github.com/YOUR_USERNAME" ...>GitHub</a>
<a href="https://linkedin.com/in/YOUR_PROFILE" ...>LinkedIn</a>
<a href="mailto:YOUR_EMAIL" ...>Email</a>
```

### Update the Typewriter Roles

In `Js/main.js`, edit the `roles` array inside `initTypewriter`:

```js
const roles = [
  'Your Role 1',
  'Your Role 2',
  'Your Role 3',
];
```

### Add a Project Card

Copy and paste this template inside `.proj-grid` in `index.html`:

```html
<article class="pcard reveal" aria-label="Project: Your Project Name">
  <div class="pcard-top" style="background:linear-gradient(135deg,#0d1117,#1a2040)">
    <div class="pcard-dots" aria-hidden="true"></div>
    <div class="pcard-bar" style="background:linear-gradient(90deg,#4f8ef7,#a78bfa)" aria-hidden="true"></div>
    <i class="fa-solid fa-code pcard-emoji" aria-hidden="true"></i>
    <span class="pcard-n" aria-hidden="true">04</span>
  </div>
  <div class="pcard-body">
    <div class="pcard-row">
      <span class="pcard-title">Your Project Name</span>
      <a href="https://github.com/YOUR_USERNAME/YOUR_REPO" target="_blank" rel="noopener noreferrer"
        class="pcard-link" aria-label="View on GitHub">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
      </a>
    </div>
    <p class="pcard-desc">Short description of your project.</p>
    <div class="pcard-foot">
      <span>Tech 1</span><span>Tech 2</span><span>Tech 3</span>
    </div>
  </div>
</article>
```

### Add a Skill Row

Inside the appropriate `<div class="skill-list">` in `index.html`:

```html
<div class="skrow">
  <span class="sk-ico"><i class="fa-brands fa-node-js" style="color:#339933"></i></span>
  <div class="sk-body">
    <div class="sk-top">
      <span class="sk-name">Node.js</span>
      <span class="sk-pct">80%</span>
    </div>
    <div class="sk-track" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
      <div class="sk-fill" style="--w:0.80"></div>
    </div>
  </div>
  <span class="sk-chip">Runtime</span>
</div>
```

> The `--w` custom property on `.sk-fill` is a decimal (0–1) and drives the `scaleX` transform.

### Change the Colour Scheme

Edit the CSS custom properties at the top of `Styles/style.css`:

```css
:root {
  --accent: #your-primary-colour;
  --ac2:    #your-secondary-colour;
  --green:  #your-success-colour;
  /* backgrounds, surfaces, text colours … */
}
```

---

## ♿ Accessibility

This portfolio is built with accessibility as a first-class concern:

- **Skip link** — `<a href="#main-content" class="skip-link">` lets keyboard users jump past the nav
- **ARIA landmarks** — `<header role="banner">`, `<main>`, `<footer role="contentinfo">`, `<nav aria-label="…">`, `<section aria-labelledby="…">`
- **ARIA tab pattern** — `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-hidden` — with arrow-key keyboard navigation
- **Progress bars** — `role="progressbar"` with `aria-valuenow/min/max`
- **Live regions** — `aria-live="polite"` on the typewriter and character counter; `aria-live="assertive"` on the form feedback
- **Focus management** — Custom `focus-visible` ring (2 px blue outline); smooth-scroll moves focus to the target element for screen readers
- **Decorative elements** — All icons and decorative `div`s have `aria-hidden="true"`
- **Reduced motion** — A `@media (prefers-reduced-motion: reduce)` block disables all transitions and animations for users who opt out

---

## ⚡ Performance

| Metric | Target |
|---|---|
| Page load | < 2 s on a fast 3G connection |
| Lighthouse Performance | 95 + |
| Lighthouse Accessibility | 95 + |
| Lighthouse Best Practices | 95 + |
| Lighthouse SEO | 95 + |
| Total bundle size | ≈ 50 KB (HTML + CSS + JS combined, excluding fonts/icons CDN) |
| JavaScript dependencies | **Zero** — pure vanilla ES6+ |

**Optimisation techniques used:**
- `fetchpriority="high"` + `decoding="async"` on the hero image
- `rel="preconnect"` for Google Fonts to eliminate DNS + TLS round trips
- `IntersectionObserver` instead of scroll listeners wherever possible
- `passive: true` on all `scroll` event listeners
- CSS animations handled on the compositor thread (`transform`, `opacity`)
- `will-change` avoided to prevent excessive layer promotion

---

## 🌐 Browser Support

| Browser | Min Version | Status |
|---|---|---|
| Chrome | 88+ | ✅ Fully supported |
| Firefox | 87+ | ✅ Fully supported |
| Safari | 14+ | ✅ Fully supported |
| Edge | 88+ | ✅ Fully supported |
| Internet Explorer | Any | ❌ Not supported |

> Requires: CSS Custom Properties, `IntersectionObserver`, CSS Grid, `backdrop-filter`, `min()` / `clamp()`.

---

## 📱 Responsive Breakpoints

| Breakpoint | Range | Behaviour |
|---|---|---|
| **Desktop** | > 1024 px | Two-column hero and about; three-column project grid |
| **Tablet** | 769 px – 1024 px | Single-column hero (photo above text); two-column project grid |
| **Mobile** | 481 px – 768 px | Hamburger nav; single-column everywhere; stacked form fields |
| **Small mobile** | ≤ 480 px | Reduced font sizes; hidden photo badges; compact stat cards |

Fluid typography uses `clamp()` throughout, so no hard jumps between breakpoints.

---

## 👨‍💻 Author & Contact

**Yousef Jameel**

| | |
|---|---|
| 📍 Location | Cairo, Egypt |
| 🎓 Education | B.Sc. Computer Science — Cairo University *(In Progress)* |
| ✉️ Email | [youssefjamelabdullatif@gmail.com](mailto:youssefjamelabdullatif@gmail.com) |
| 💼 LinkedIn | [youssef-jameel-abdullatif-ali](https://linkedin.com/in/youssef-jameel-abdullatif-ali) |
| 🐙 GitHub | [@youssef-jamil](https://github.com/youssef-jamil) |
| 🌐 Portfolio | [youssef-jamil.github.io/youssefjamil](https://youssef-jamil.github.io/youssefjamil) |

Open to **internships**, **freelance projects**, and **full-time roles** — feel free to reach out!

---

## 📄 License

This project is open-source and available under the **MIT License**.
See the [LICENSE](LICENSE) file for full details.

You are free to fork, adapt, and use this as a template for your own portfolio —  
a credit back to the original author is appreciated but not required.

---

## 🤝 Contributing

Found a bug or have a suggestion?

1. Fork the repository
2. Create a feature branch: `git checkout -b fix/your-fix`
3. Commit your changes: `git commit -m 'fix: describe the fix'`
4. Push to the branch: `git push origin fix/your-fix`
5. Open a Pull Request

---

*Made with ❤️ in Cairo, Egypt · Last updated May 2026*
