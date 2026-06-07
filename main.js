// ── NAVBAR scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const step = Math.ceil(target / (1800 / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 16);
  });
}
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); heroObserver.disconnect(); } });
}, { threshold: 0.3 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ── FADE IN ──
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentElement.querySelectorAll('.fade-in')];
      const delay = siblings.indexOf(e.target) * 60;
      setTimeout(() => e.target.classList.add('visible'), delay);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── FILTER TABS ──
const tabs = document.querySelectorAll('.tab');
const grid = document.getElementById('incubatorGrid');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    grid.querySelectorAll('.incubator-card').forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && card.dataset.type !== f);
    });
  });
});

// ── FORMS ──
function handleForm(e) {
  e.preventDefault();
  document.getElementById('formSuccess').classList.add('visible');
}
function handlePartnership(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✅ Inquiry Sent!';
  btn.style.cssText = 'background:#00c48c;color:white;border-color:#00c48c';
  btn.disabled = true;
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 68, behavior: 'smooth' }); }
  });
});