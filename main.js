'use strict';

/* ══════════════════════════════════════
   CURSOR — smooth lag + 5 states
══════════════════════════════════════ */
const curDot  = document.getElementById('cur-dot');
const curRing = document.getElementById('cur-ring');
const curLbl  = document.getElementById('cur-label');
let mx=0, my=0, rx=0, ry=0, curVisible=false;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (!curVisible) {
    curVisible = true;
    if (curDot)  curDot.style.opacity  = '1';
    if (curRing) curRing.style.opacity = '0.55';
  }
});
document.addEventListener('mouseleave', () => {
  if (curDot)  curDot.style.opacity  = '0';
  if (curRing) curRing.style.opacity = '0';
});

// Laggy ring follows dot
(function raf() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  if (curDot)  curDot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  if (curRing) curRing.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(raf);
})();

function setCursor(state, label='') {
  if (!curRing) return;
  curRing.dataset.state = state || '';
  if (curLbl) curLbl.textContent = label;
}

// Apply cursor states
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { document.body.classList.add('hov'); setCursor('link'); });
  el.addEventListener('mouseleave', () => { document.body.classList.remove('hov'); setCursor(''); });
});
document.querySelectorAll('.pcard').forEach(el => {
  el.addEventListener('mouseenter', () => { document.body.classList.add('hov'); setCursor('view','VIEW'); });
  el.addEventListener('mouseleave', () => { document.body.classList.remove('hov'); setCursor(''); });
});
document.querySelectorAll('.skrow').forEach(el => {
  el.addEventListener('mouseenter', () => { document.body.classList.add('hov'); setCursor('skill'); });
  el.addEventListener('mouseleave', () => { document.body.classList.remove('hov'); setCursor(''); });
});
document.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('focus', () => setCursor('input'));
  el.addEventListener('blur',  () => setCursor(''));
});

/* ══════════════════════════════════════
   SCROLL PROGRESS
══════════════════════════════════════ */
const progBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (progBar) progBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ══════════════════════════════════════
   THEME
══════════════════════════════════════ */
const themeBn = document.getElementById('themeToggle');
const htmlEl  = document.documentElement;
function setTheme(t) {
  htmlEl.setAttribute('data-theme', t);
  if (themeBn) themeBn.textContent = t === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', t);
}
setTheme(localStorage.getItem('theme') || 'dark');
if (themeBn) themeBn.addEventListener('click', () =>
  setTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

/* ══════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════ */
const burger  = document.getElementById('hamburger');
const mobNav  = document.getElementById('mobNav');
if (burger && mobNav) {
  burger.addEventListener('click', () => {
    const open = mobNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  mobNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobNav.classList.remove('open')));
}

/* ══════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════ */
const roles = ['Software Architect','Full-Stack Developer','Flutter Developer','Clean Code Enthusiast','Problem Solver'];
let ri=0, ci=0, del=false;
const typedEl = document.getElementById('typed');
function typeLoop() {
  if (!typedEl) return;
  const w = roles[ri];
  typedEl.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
  let t = del ? 50 : 90;
  if (!del && ci === w.length + 1) { t = 2200; del = true; }
  if (del && ci < 0) { del = false; ri = (ri + 1) % roles.length; ci = 0; t = 380; }
  setTimeout(typeLoop, t);
}
typeLoop();

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal, .reveal-r').forEach(el => revObs.observe(el));

/* ══════════════════════════════════════
   ACTIVE NAV + NAV SHRINK
══════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navEl    = document.getElementById('nav');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ══════════════════════════════════════
   ANIMATED COUNTERS
══════════════════════════════════════ */
function animCount(el, dur = 1400) {
  const raw = el.dataset.target, suffix = el.dataset.suffix || '';
  if (isNaN(raw)) { el.textContent = raw + suffix; return; }
  const target = Number(raw); let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

/* ══════════════════════════════════════
   SKILLS TABS + BAR ANIMATION
══════════════════════════════════════ */
const stabs   = document.querySelectorAll('.stab');
const spanels = document.querySelectorAll('.spanel');

function animBars(panel) {
  panel.querySelectorAll('.sk-fill').forEach((b, i) => {
    b.style.transitionDelay = `${i * 0.09}s`;
    b.classList.add('go');
  });
}
function switchSkill(id) {
  stabs.forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  spanels.forEach(p => {
    const on = p.dataset.panel === id;
    p.classList.toggle('active', on);
    if (on) {
      p.querySelectorAll('.sk-fill').forEach(b => { b.classList.remove('go'); b.style.transitionDelay = '0s'; });
      setTimeout(() => animBars(p), 80);
    }
  });
}
stabs.forEach(b => b.addEventListener('click', () => switchSkill(b.dataset.tab)));

const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const active = document.querySelector('.spanel.active');
      if (active) animBars(active);
      skillObs.disconnect();
    }
  });
}, { threshold: 0.15 });
const skillSec = document.getElementById('skills');
if (skillSec) skillObs.observe(skillSec);

/* ══════════════════════════════════════
   ABOUT TABS
══════════════════════════════════════ */
const atabs   = document.querySelectorAll('.atab');
const apanels = document.querySelectorAll('.apanel');
atabs.forEach(b => b.addEventListener('click', () => {
  atabs.forEach(x => x.classList.remove('active'));
  apanels.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const t = document.querySelector(`.apanel[data-panel="${b.dataset.tab}"]`);
  if (t) t.classList.add('active');
}));

/* ══════════════════════════════════════
   PHOTO TILT (desktop only)
══════════════════════════════════════ */
const pw = document.querySelector('.hero-photo-wrap');
if (pw && window.matchMedia('(pointer:fine)').matches) {
  pw.addEventListener('mousemove', e => {
    const r = pw.getBoundingClientRect();
    const rotX = ((e.clientY - r.top  - r.height/2) / r.height) * -8;
    const rotY = ((e.clientX - r.left - r.width /2) / r.width)  *  8;
    pw.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });
  pw.addEventListener('mouseleave', () => { pw.style.transform = ''; });
}

/* ══════════════════════════════════════
   CLICK PARTICLES
══════════════════════════════════════ */
document.addEventListener('click', e => {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span');
    p.className = 'cpart';
    const angle = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 65;
    p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;
      width:${3+Math.random()*5}px;height:${3+Math.random()*5}px;
      --dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;
      background:${Math.random()>.5?'var(--accent)':'var(--ac2)'}`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
});

/* ══════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════ */
function handleSend() {
  const name    = document.getElementById('f-name')?.value.trim();
  const email   = document.getElementById('f-email')?.value.trim();
  const subject = document.getElementById('f-subject')?.value.trim();
  const msg     = document.getElementById('f-msg')?.value.trim();
  const out     = document.getElementById('f-out');
  const btn     = document.getElementById('send-btn');

  function flash(text, ok) {
    if (!out) return;
    out.style.display    = 'block';
    out.style.color      = ok ? 'var(--green)' : '#f87171';
    out.style.background = ok ? 'rgba(34,212,126,.09)' : 'rgba(248,113,113,.09)';
    out.style.border     = `1px solid ${ok ? 'rgba(34,212,126,.28)' : 'rgba(248,113,113,.28)'}`;
    out.textContent      = text;
  }

  if (!name || !email || !msg) { flash('⚠️  Please fill in all required fields.', false); return; }
  if (btn) { btn.textContent = 'Sending…'; btn.style.opacity = '.65'; btn.disabled = true; }

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = 'Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      btn.style.opacity = '1'; btn.disabled = false;
    }
    flash('✓  Message sent! Opening your email client…', true);
    window.location.href =
      `mailto:yousefjamelabdulatif@gmail.com` +
      `?subject=${encodeURIComponent(subject || 'Hello from ' + name)}` +
      `&body=${encodeURIComponent(msg)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  }, 900);
}
