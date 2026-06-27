/**
 * particles.js — Partículas massivas cobrindo toda a tela
 *
 * 3 camadas de profundidade:
 *  - Micro    (80): minúsculas, lentas, fundo
 *  - Medium   (50): médias, velocidade normal
 *  - Featured (20): grandes, brilhantes, frente
 *
 * Total: 150 partículas
 * Reagem ao cursor: brilham e crescem quando o mouse passa perto.
 */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = [
    'position:fixed',
    'inset:0',
    'width:100%',
    'height:100%',
    'pointer-events:none',
    'z-index:0',
  ].join(';');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, mx = -999, my = -999;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function make(layer) {
    const cfg = {
      micro:    { rMin: 0.3, rMax: 1.0,  aMin: 0.10, aMax: 0.35, spd: 0.10 },
      medium:   { rMin: 1.0, rMax: 2.0,  aMin: 0.18, aMax: 0.50, spd: 0.18 },
      featured: { rMin: 2.2, rMax: 3.5,  aMin: 0.30, aMax: 0.70, spd: 0.12 },
    };
    const c = cfg[layer];
    return {
      x:    Math.random() * 2000,
      y:    Math.random() * 1200,
      r:    c.rMin + Math.random() * (c.rMax - c.rMin),
      vx:   (Math.random() - 0.5) * c.spd,
      vy:   (Math.random() - 0.5) * c.spd,
      a:    c.aMin + Math.random() * (c.aMax - c.aMin),
      da:   (Math.random() - 0.5) * 0.003,
      aMin: c.aMin,
      aMax: c.aMax,
      layer,
    };
  }

  const P = [
    ...Array.from({ length: 80 }, () => make('micro')),
    ...Array.from({ length: 50 }, () => make('medium')),
    ...Array.from({ length: 20 }, () => make('featured')),
  ];

  function draw() {
    ctx.clearRect(0, 0, W, H);

    P.forEach(p => {
      p.a += p.da;
      if (p.a > p.aMax || p.a < p.aMin) p.da *= -1;

      const dx   = p.x - mx;
      const dy   = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const prox = dist < 180 ? (1 - dist / 180) : 0;

      const alpha  = Math.min(p.a + prox * 0.6, 0.95);
      const radius = p.r + prox * 3;

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(151, 149, 145, ${alpha})`;
      ctx.fill();

      if (prox > 0.15 && p.layer !== 'micro') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(151, 149, 145, ${prox * 0.08})`;
        ctx.fill();
      }

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();