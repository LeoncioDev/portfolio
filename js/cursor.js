/**
 * cursor.js — Cursor personalizado elegante
 * Ponto cinza pequeno + anel externo com delay suave
 */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.id  = 'cursor-dot';
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  ;(function animateRing() {
    rx = lerp(rx, mx, 0.10);
    ry = lerp(ry, my, 0.10);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  const sel = 'a, button, .tag, .project-card, .contact-link, .nav-link, .gh-btn, .hero-stat, .info-row, .stack-row, .btn-primary, .btn-ghost';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(sel)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(sel)) document.body.classList.remove('cursor-hover');
  });

  document.addEventListener('mousedown', () => {
    dot.style.transform   = 'translate(-50%,-50%) scale(0.5)';
    ring.style.transform  = 'translate(-50%,-50%) scale(0.8)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform   = 'translate(-50%,-50%) scale(1)';
    ring.style.transform  = 'translate(-50%,-50%) scale(1)';
  });

  document.documentElement.style.cursor = 'none';
})();