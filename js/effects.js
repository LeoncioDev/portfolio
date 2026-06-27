/**
 * effects.js — Efeitos visuais avançados
 *
 *  1. Counter up — números do hero sobem de 0
 *  2. Stack tags entrada escalonada
 *  3. Section lines — se desenham quando entram na tela
 *  4. Section bg numbers — números decorativos de fundo
 */

/* ── 1. COUNTER UP ──────────────────────────────────────────────
   Cada .hs-num com data-count sobe de 0 até o valor final.
   Usa easeOutQuart para desacelerar no final — mais premium.    */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el    = e.target;
      const end   = parseInt(el.dataset.count, 10);
      const unit  = el.dataset.unit || '';
      const dur   = 1200; /* duração em ms */
      const start = performance.now();

      function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
      }

      function frame(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / dur, 1);
        const value    = Math.round(easeOutQuart(progress) * end);
        el.textContent = value + unit;
        if (progress < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
}

/* ── 2. STACK TAGS ESCALONADAS ──────────────────────────────────
   Cada tag entra com delay crescente quando a stack section
   aparece na tela. Dá a sensação de "preenchimento" animado.   */
function initStackTags() {
  const rows = document.querySelectorAll('.stack-row');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const tags = e.target.querySelectorAll('.tag');
      tags.forEach((tag, i) => {
        tag.classList.add('tag-animate');
        setTimeout(() => tag.classList.add('in'), i * 60);
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1 });

  rows.forEach(row => obs.observe(row));
}

/* ── 3. SECTION LINES ───────────────────────────────────────────
   As linhas decorativas dos headers de seção se "desenham"
   da esquerda para a direita quando entram na tela.            */
function initSectionLines() {
  const lines = document.querySelectorAll('.section-line');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('drawn');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  lines.forEach(l => obs.observe(l));
}

/* ── 4. NÚMEROS DECORATIVOS DE FUNDO ────────────────────────────
   Injeta um número enorme e semi-transparente no fundo de
   cada seção numerada. É um detalhe visual que dá profundidade. */
function initSectionBgNums() {
  const sections = document.querySelectorAll('.section[id]');
  const nums = { 'about-detail': '01', 'stack': '02', 'projects': '03', 'contact': '04' };

  sections.forEach(section => {
    const num = nums[section.id];
    if (!num) return;
    const el = document.createElement('div');
    el.className = 'section-bg-num';
    el.textContent = num;
    section.appendChild(el);
  });
}

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initStackTags();
  initSectionLines();
  initSectionBgNums();
});