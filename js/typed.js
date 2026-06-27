/**
 * typed.js — Digita "Full Stack Developer." uma vez e fica.
 * Sem loop, sem outras frases. É o que ele é.
 */
(function () {
  const el = document.querySelector('.hal-typed');
  if (!el) return;

  const phrase = 'Full Stack Developer.';
  let ci = 0;

  function tick() {
    el.textContent = phrase.slice(0, ++ci);
    if (ci < phrase.length) setTimeout(tick, 72);
  }

  /* Inicia após animações de entrada */
  setTimeout(tick, 900);
})();