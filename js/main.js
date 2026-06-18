/* ===================================
   NexGen — Shared JS across all pages
   =================================== */

// ── NAVBAR scroll shadow ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ── COUNTER ANIMATION (for elements with .stat-box .num data-target, optional) ──
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const step = Math.ceil(target / (1800 / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 16);
  });
}
const heroStats = document.querySelector('.hero-stats, .stats-row');
if (heroStats) {
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); heroObserver.disconnect(); } });
  }, { threshold: 0.3 });
  heroObserver.observe(heroStats);
}

// ── FADE-IN ON SCROLL ──
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentElement.querySelectorAll('.fade-in')];
      const delay = siblings.indexOf(e.target) * 60;
      setTimeout(() => e.target.classList.add('visible'), delay);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── SMOOTH ANCHOR SCROLL (for in-page #links) ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const t = document.querySelector(targetId);
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
    }
  });
});
