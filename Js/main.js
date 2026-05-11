'use strict';

/* ─────────────────────────────────────────
   UTILS
───────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─────────────────────────────────────────
   DYNAMIC COPYRIGHT YEAR
───────────────────────────────────────── */
const yearEl = $('#copy-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────── */
(function initScrollBar() {
  const bar = $('#scroll-bar');
  if (!bar) return;

  function update() {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = max > 0 ? Math.min((window.scrollY / max) * 100, 100) + '%' : '0';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ─────────────────────────────────────────
   THEME TOGGLE
   Respects OS preference on first load.
   Syncs across browser tabs.
───────────────────────────────────────── */
(function initTheme() {
  const btn  = $('#themeToggle');
  const html = document.documentElement;

  function setTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if (!btn) return;
    // Swap icon
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    btn.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} theme`);
  }

  const stored  = localStorage.getItem('theme');
  const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(stored || (prefDark ? 'dark' : 'light'));

  if (btn) btn.addEventListener('click', () =>
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
  );

  // Sync across tabs
  window.addEventListener('storage', e => {
    if (e.key === 'theme' && e.newValue) setTheme(e.newValue);
  });
})();

/* ─────────────────────────────────────────
   MOBILE NAV
   Locks body scroll when open.
   Closes on outside click or Escape key.
───────────────────────────────────────── */
(function initMobileNav() {
  const burger = $('#hamburger');
  const nav    = $('#mobNav');
  if (!burger || !nav) return;

  function open() {
    nav.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
  $$('a', nav).forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== burger) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { close(); burger.focus(); }
  });
})();

/* ─────────────────────────────────────────
   TYPEWRITER
   Pauses when the tab is hidden.
───────────────────────────────────────── */
(function initTypewriter() {
  const el = $('#typed');
  if (!el) return;

  const roles = [
    'Software Architect',
    'Full-Stack Developer',
    'Flutter Developer',
    'Clean Code Enthusiast',
    'Problem Solver',
  ];

  let ri = 0, ci = 0, deleting = false;

  function tick() {
    if (document.hidden) { setTimeout(tick, 300); return; }

    const word = roles[ri];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    let delay = deleting ? 48 : 88;
    if (!deleting && ci === word.length + 1) { delay = 2100; deleting = true; }
    if (deleting  && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; delay = 360; }

    setTimeout(tick, delay);
  }
  tick();
})();

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  // Standard reveal elements
  $$('.reveal, .reveal-r').forEach(el => obs.observe(el));

  // Project cards — need .in to start their CSS animation
  $$('.pcard').forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────
   ACTIVE NAV LINK + SCROLLED CLASS
───────────────────────────────────────── */
(function initActiveNav() {
  const links  = $$('.nav-link');
  const navEl  = $('#nav');
  const sects  = $$('section[id]');
  const OFFSET = 120;

  function update() {
    const y = window.scrollY + OFFSET;
    let current = '';
    sects.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ─────────────────────────────────────────
   ANIMATED COUNTERS
───────────────────────────────────────── */
(function initCounters() {
  function animate(el, duration = 1400) {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) { el.textContent = el.dataset.target + suffix; return; }

    let startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });

  $$('[data-target]').forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────
   SKILLS TABS + BAR ANIMATION
   Arrow-key keyboard navigation included.
───────────────────────────────────────── */
(function initSkillsTabs() {
  const tabs   = $$('.stab');
  const panels = $$('.spanel');

  function animBars(panel) {
    $$('.sk-fill', panel).forEach((b, i) => {
      b.style.transitionDelay = `${i * 0.09}s`;
      b.classList.add('go');
    });
  }
  function resetBars(panel) {
    $$('.sk-fill', panel).forEach(b => { b.classList.remove('go'); b.style.transitionDelay = '0s'; });
  }

  function switchTo(id) {
    tabs.forEach(b => {
      const on = b.dataset.tab === id;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', String(on));
    });
    panels.forEach(p => {
      const on = p.dataset.panel === id;
      p.classList.toggle('active', on);
      if (on) { p.removeAttribute('hidden'); resetBars(p); setTimeout(() => animBars(p), 80); }
      else    { p.setAttribute('hidden', ''); resetBars(p); }
    });
  }

  tabs.forEach(b => {
    b.addEventListener('click', () => switchTo(b.dataset.tab));
    b.addEventListener('keydown', e => {
      const idx = tabs.indexOf(b);
      if (e.key === 'ArrowRight') { e.preventDefault(); const n = tabs[(idx + 1) % tabs.length]; n.focus(); switchTo(n.dataset.tab); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); const p = tabs[(idx - 1 + tabs.length) % tabs.length]; p.focus(); switchTo(p.dataset.tab); }
    });
  });

  // Animate on scroll into view
  const skillSec = $('#skills');
  if (skillSec) {
    let fired = false;
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        const active = $('.spanel.active');
        if (active) animBars(active);
      }
    }, { threshold: 0.15 }).observe(skillSec);
  }
})();

/* ─────────────────────────────────────────
   ABOUT TABS
   Arrow-key keyboard navigation included.
───────────────────────────────────────── */
(function initAboutTabs() {
  const tabs   = $$('.atab');
  const panels = $$('.apanel');

  function switchTo(id) {
    tabs.forEach(b => {
      const on = b.dataset.tab === id;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', String(on));
    });
    panels.forEach(p => {
      const on = p.dataset.panel === id;
      p.classList.toggle('active', on);
      if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
    });
  }

  tabs.forEach(b => {
    b.addEventListener('click', () => switchTo(b.dataset.tab));
    b.addEventListener('keydown', e => {
      const idx = tabs.indexOf(b);
      if (e.key === 'ArrowRight') { e.preventDefault(); const n = tabs[(idx + 1) % tabs.length]; n.focus(); switchTo(n.dataset.tab); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); const p = tabs[(idx - 1 + tabs.length) % tabs.length]; p.focus(); switchTo(p.dataset.tab); }
    });
  });
})();

/* ─────────────────────────────────────────
   PHOTO TILT (desktop pointer only)
───────────────────────────────────────── */
(function initPhotoTilt() {
  const wrap = $('.hero-photo-wrap');
  if (!wrap || !window.matchMedia('(pointer:fine)').matches) return;

  wrap.addEventListener('mousemove', e => {
    const r    = wrap.getBoundingClientRect();
    const rotX = ((e.clientY - r.top  - r.height / 2) / r.height) * -8;
    const rotY = ((e.clientX - r.left - r.width  / 2) / r.width)  *  8;
    wrap.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  }, { passive: true });

  wrap.addEventListener('mouseleave', () => { wrap.style.transform = ''; });
})();

/* ─────────────────────────────────────────
   SMOOTH ANCHOR SCROLL
   Accounts for fixed nav height.
───────────────────────────────────────── */
(function initSmoothScroll() {
  const NAV_HEIGHT = 64;

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id     = link.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', '#' + id);

      // Move focus for screen readers
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();

/* ─────────────────────────────────────────
   CONTACT FORM
   Validates, sanitises, and builds a
   mailto: URL — no server required.
───────────────────────────────────────── */
(function initContactForm() {
  const nameEl    = $('#f-name');
  const emailEl   = $('#f-email');
  const subjectEl = $('#f-subject');
  const msgEl     = $('#f-msg');
  const outEl     = $('#f-out');
  const btnEl     = $('#send-btn');
  const charCount = $('#char-count');
  if (!btnEl) return;

  // Live character counter
  if (msgEl && charCount) {
    msgEl.addEventListener('input', () => {
      const len = msgEl.value.length;
      charCount.textContent = `${len} / 2000`;
      charCount.style.color = len > 1800 ? 'var(--ac2)' : '';
    });
  }

  function flash(text, ok) {
    if (!outEl) return;
    outEl.style.cssText = `display:block;color:${ok ? 'var(--green)' : '#f87171'};
      background:${ok ? 'rgba(34,212,126,.09)' : 'rgba(248,113,113,.09)'};
      border:1px solid ${ok ? 'rgba(34,212,126,.28)' : 'rgba(248,113,113,.28)'}`;
    outEl.textContent = text;
  }

  // Strip control characters
  const sanitise = str => String(str).replace(/[\x00-\x1F\x7F]/g, '').trim();

  // Simple RFC 5322 email check
  const validEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  let sending = false;

  btnEl.addEventListener('click', () => {
    if (sending) return;

    const name    = sanitise(nameEl?.value    || '');
    const email   = sanitise(emailEl?.value   || '');
    const subject = sanitise(subjectEl?.value || '');
    const msg     = sanitise(msgEl?.value     || '');

    if (outEl) outEl.style.display = 'none';

    if (!name)               return flash('⚠️ Please enter your name.', false), nameEl?.focus();
    if (!email)              return flash('⚠️ Please enter your email.', false), emailEl?.focus();
    if (!validEmail(email))  return flash('⚠️ Please enter a valid email address.', false), emailEl?.focus();
    if (!msg)                return flash('⚠️ Please enter a message.', false), msgEl?.focus();
    if (msg.length > 2000)   return flash('⚠️ Message exceeds 2000 characters.', false), msgEl?.focus();

    sending = true;
    const originalHTML = btnEl.innerHTML;
    btnEl.innerHTML = 'Opening email client… <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
    btnEl.style.opacity = '0.65';
    btnEl.disabled = true;

    const mailto = `mailto:yousefjamelabdulatif@gmail.com`
      + `?subject=${encodeURIComponent(subject || 'Hello from ' + name)}`
      + `&body=${encodeURIComponent(msg + '\n\nFrom: ' + name + ' (' + email + ')')}`;

    setTimeout(() => {
      window.location.href = mailto;
      btnEl.innerHTML     = originalHTML;
      btnEl.style.opacity = '1';
      btnEl.disabled      = false;
      sending             = false;
      flash('✓ Email client opened! Your message is ready to send.', true);
    }, 600);
  });
})();
