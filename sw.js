const CACHE = 'mi-calendario-v1';
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(['./', './index.html', './manifest.webmanifest', './IMG-20261125-WA1528.jpg', './IMG-20261125-WA6656.jpg']);
    })
  );
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (resp) {
        if (resp && resp.ok && new URL(e.request.url).origin === location.origin) {
          const copia = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copia); });
        }
        return resp;
      }).catch(function () { return r; });
    })
  );
});
