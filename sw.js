const CACHE_NAME = 'eli-14';
const ASSETS = [
  './',
  './index.html',
  './img/bb.png',
  './img/orchid.png',
  './img/pwa-icon-192.png',
  './img/pwa-icon-512.png',
  './img/kathabb1.jpeg',
  './img/kathabb2.jpeg',
  './img/kathabb3.jpeg',
  './img/kathabb4.jpeg',
  './img/kathabb5.jpeg',
  './img/kathabb6.jpeg',
  './img/kathabb7.jpeg',
  './img/kathabb8.jpeg',
  './img/kathabb9.jpeg',
  './img/kathabb10.jpeg',
  './img/kathabb11.jpeg',
  './img/kathabb12.jpeg',
  './img/kathabb13.jpeg',
  './img/kathabb14.jpeg',
  './img/kathabb15.jpeg',
  './img/kathabb16.jpeg',
  './img/kathabb16-1.jpeg',
  './img/kathabb16-2.jpeg',
  './img/kathabb16-3.jpeg',
  './img/kathabb17.jpeg',
  './img/kathabb18.jpeg',
  './img/kathabb19.jpeg',
  './img/kathabb20.jpeg',
  './img/kathabb21.jpeg',
  './img/kathabb22.jpeg',
  './img/kathabb23.jpeg',
  './img/kathabb23-1.jpeg',
  './img/kathabb24.jpeg',
  './img/kathabb25.jpeg',
  './img/kathabb26.jpeg',
  './img/kathabb27.jpeg',
  './img/kathabb28.jpeg',
  './img/kathabb29.jpeg',
  './img/kathabb30.jpeg',
  './img/kathabb31.jpeg',
  './img/kathabb31-1.jpeg',
  './img/kathabb32.jpeg',
  './img/kathabb33.jpeg',
  './img/kathabb34.jpeg',
  './img/kathabb35.jpeg',
  './img/kathabb36.jpeg',
  './img/kathabb36-1.jpeg',
  './img/kathabb36-2.jpeg',
  './img/kathabb37.jpeg',
  './img/kathabb38.jpeg',
  './img/katha-y-papa.jpeg'     
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