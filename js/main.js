/**
 * main.js — Portfolio João Paulo Leôncio
 * Cursor glow · Hero animations · Scroll spy · Reveal · Header
 */

function initGlow() {
  const el = document.getElementById('glow');
  if (!el || window.matchMedia('(pointer: coarse)').matches) return;
  let tx = -999, ty = -999, cx = -999, cy = -999;
  const lerp = (a, b, t) => a + (b - a) * t;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  function tick() {
    cx = lerp(cx, tx, 0.07); cy = lerp(cy, ty, 0.07);
    el.style.left = cx + 'px'; el.style.top = cy + 'px';
    requestAnimationFrame(tick);
  }
  tick();
}

function initScrollSpy() {
  const links    = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
      if (a) a.classList.add('active');
    });
  }, { rootMargin: '-10% 0px -50% 0px' });
  sections.forEach(s => obs.observe(s));
  links.forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(l.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initSectionLines() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('drawn'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.section-line').forEach(l => obs.observe(l));
}

function initSectionBgNums() {
  const map = { 'about-detail': '01', 'stack': '02', 'projects': '03', 'contact': '04' };
  document.querySelectorAll('.section[id]').forEach(s => {
    const num = map[s.id]; if (!num) return;
    const el = document.createElement('div');
    el.className = 'section-bg-num'; el.textContent = num;
    s.appendChild(el);
  });
}

function initStackTags() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.tag').forEach((tag, i) => {
        tag.classList.add('tag-animate');
        setTimeout(() => tag.classList.add('in'), i * 55);
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.stack-row').forEach(r => obs.observe(r));
}

function initHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 40px rgba(0,0,0,0.6)'
      : 'none';
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initGlow();
  initScrollSpy();
  initReveal();
  initSectionLines();
  initSectionBgNums();
  initStackTags();
  initHeader();
});