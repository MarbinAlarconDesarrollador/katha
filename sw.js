const CACHE_NAME = 'eli-13-v1';
const ASSETS = [
  './',
  './index.html',
  './img/bb.png',
  './img/orchid.png',
  './img/pwa-icon-192.png',
  './img/pwa-icon-512.png'
];

// Instalación: Guardar archivos esenciales
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Estrategia: Cache First (Carga instantánea)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});