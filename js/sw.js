/**
 * sw.js — Service Worker · João Paulo Leôncio Portfolio
 *
 * Estratégia: Network First
 *  - Toda vez que o site abre, busca a versão mais recente na rede
 *  - Salva no cache após buscar
 *  - Só usa cache se não tiver internet
 *
 * Para forçar atualização no próximo deploy:
 *  - Troca CACHE_NAME de 'portfolio-v2' para 'portfolio-v3'
 *  - Isso limpa o cache antigo automaticamente
 */

const CACHE_NAME = 'portfolio-v2';

/* Instala o service worker imediatamente sem esperar */
self.addEventListener('install', () => {
  self.skipWaiting();
});

/* Ao ativar, deleta todos os caches antigos */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  /* Assume controle imediato de todas as abas abertas */
  self.clients.claim();
});

/* Network first: tenta rede, salva no cache, fallback para cache */
self.addEventListener('fetch', e => {
  /* Ignora requisições que não sejam GET */
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        /* Salva cópia no cache */
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(() => {
        /* Sem internet: usa cache */
        return caches.match(e.request);
      })
  );
});