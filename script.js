/* ===== THEME TOGGLE ===== */
const html = document.documentElement;
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => {
mx = e.clientX; my = e.clientY;
cursor.style.left = mx + 'px';
cursor.style.top  = my + 'px';
});
function animRing() {
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
ring.style.left = rx + 'px';
ring.style.top  = ry + 'px';
requestAnimationFrame(animRing);
}
animRing();

// Cursor trails
const trails = [];
for(let i = 0; i < 8; i++) {
const t = document.createElement('div');
t.className = 'cursor-trail';
const size = 8 - i;
t.style.cssText = `width:${size}px;height:${size}px;opacity:${0.4 - i*0.04};`;
document.body.appendChild(t);
trails.push({ el: t, x: -100, y: -100 });
}
function animTrails() {
let px = mx, py = my;
trails.forEach((t, i) => {
    t.x += (px - t.x) * (0.3 - i * 0.025);
    t.y += (py - t.y) * (0.3 - i * 0.025);
    t.el.style.left = t.x + 'px';
    t.el.style.top  = t.y + 'px';
    px = t.x; py = t.y;
});
requestAnimationFrame(animTrails);
}
animTrails();

document.querySelectorAll('a,button,.glass').forEach(el => {
el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ===== PARALLAX ===== */
const parallaxEls = document.querySelectorAll('.parallax-layer');
document.addEventListener('mousemove', e => {
const cx = window.innerWidth / 2;
const cy = window.innerHeight / 2;
const dx = (e.clientX - cx) / cx;
const dy = (e.clientY - cy) / cy;
parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.03;
    el.style.transform = `translate(${dx * speed * 100}px, ${dy * speed * 100}px)`;
});
});

// Scroll parallax on hero content
const heroContent = document.querySelector('.hero-content');
const heroVisual  = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
const sy = window.scrollY;
if(heroContent) heroContent.style.transform = `translateY(${sy * 0.25}px)`;
if(heroVisual)  heroVisual.style.transform  = `translateY(${sy * 0.15}px)`;
});

/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver(entries => {
entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

//Hiden Project
function toggleProjects() {
  const cards = document.querySelectorAll('.proj-card');
  const btn = document.getElementById('showMoreBtn');
  const isExpanded = btn.textContent === 'Show Less';

  if (isExpanded) {
    cards.forEach((el, i) => { if (i >= 6) el.classList.add('hidden'); });
    btn.textContent = 'Show More';
  } else {
    cards.forEach(el => el.classList.remove('hidden'));
    btn.textContent = 'Show Less';
  }
}