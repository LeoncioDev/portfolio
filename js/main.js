/**
 * main.js — Portfolio de João Paulo Leôncio
 *
 * Responsável por toda a interatividade da página:
 * - Cursor glow que segue o mouse (apenas desktop)
 * - Scroll spy que destaca o item ativo no nav
 * - Animações de reveal ao scrollar (fade + slide up)
 * - Sombra no header ao scrollar a página
 */

/**
 * Cursor glow — elemento ciano que segue o cursor pelo fundo.
 * Cria profundidade e identidade visual única.
 * Desativado em dispositivos touch (pointer: coarse) para não impactar mobile.
 */
function initGlow() {
  const el = document.getElementById('glow');
  if (!el || window.matchMedia('(pointer: coarse)').matches) return;
  document.addEventListener('mousemove', e => {
    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';
  });
}

/**
 * Scroll spy — destaca o link de navegação correspondente à seção visível.
 *
 * Usa IntersectionObserver com rootMargin assimétrico:
 * -10% no topo e -50% na base = a seção precisa ocupar pelo menos
 * 40% da viewport para ser considerada "ativa".
 * Isso evita que duas seções fiquem ativas ao mesmo tempo.
 *
 * Também adiciona scroll suave ao clicar nos links do nav.
 */
function initScrollSpy() {
  const links    = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      // Remove active de todos e adiciona só no link da seção visível
      links.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
      if (a) a.classList.add('active');
    });
  }, { rootMargin: '-10% 0px -50% 0px' });

  sections.forEach(s => obs.observe(s));

  // Scroll suave ao clicar nos links — evita o comportamento padrão de pulo
  links.forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(l.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/**
 * Reveal on scroll — anima elementos com classe .reveal quando entram na viewport.
 * O CSS define a animação: opacity 0→1 + translateY(16px)→0.
 * unobserve() após a animação evita re-execução desnecessária.
 */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in'); // dispara a animação CSS
        obs.unobserve(e.target);      // para de observar após animar
      }
    });
  }, { threshold: 0.05 }); // 5% visível já dispara

  els.forEach(el => obs.observe(el));
}

/**
 * Header shadow — adiciona sombra no header fixo ao scrollar.
 * Sem sombra no topo da página (scrollY = 0) para não pesar visualmente.
 * { passive: true } melhora a performance do scroll listener.
 */
function initHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 1px 20px rgba(0,0,0,0.4)'
      : 'none';
  }, { passive: true });
}

// Inicializa tudo após o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
  initGlow();
  initScrollSpy();
  initReveal();
  initHeader();
});
