/* Service Worker · Kathaleia 13
   - App shell: cache-first (funciona sin conexión)
   - Imágenes, fuentes y librerías: stale-while-revalidate
   - Supabase y audio: siempre a la red (no se cachean)
   Sube el número de VERSION cada vez que cambies index.html. */
const VERSION = "v5";
const SHELL_CACHE = `kathaleia-shell-${VERSION}`;
const RUNTIME_CACHE = `kathaleia-runtime-${VERSION}`;

const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./img/pwa-icon-192.png",
  "./img/pwa-icon-512.png",
  "./img/orchid.png",
  "./img/bb.png",
  "./img/orchid.png",
  "./img/pwa-icon-192.png",
  "./img/pwa-icon-512.png",
  "./img/katha.jpeg",
  "./img/kathabb1.jpeg",
  "./img/kathabb2.jpeg",
  "./img/kathabb3.jpeg",
  "./img/kathabb4.jpeg",
  "./img/kathabb5.jpeg",
  "./img/kathabb6.jpeg",
  "./img/kathabb7.jpeg",
  "./img/kathabb8.jpeg",
  "./img/kathabb9.jpeg",
  "./img/kathabb10.jpeg",
  "./img/kathabb11.jpeg",
  "./img/kathabb11-1.jpeg",
  "./img/kathabb12.jpeg",
  "./img/kathabb13.jpeg",
  "./img/kathabb14.jpeg",
  "./img/kathabb15.jpeg",
  "./img/kathabb16.jpeg",
  "./img/kathabb16-1.jpeg",
  "./img/kathabb16-2.jpeg",
  "./img/kathabb16-3.jpeg",
  "./img/kathabb17.jpeg",
  "./img/kathabb18.jpeg",
  "./img/kathabb19.jpeg",
  "./img/kathabb20.jpeg",
  "./img/kathabb21.jpeg",
  "./img/kathabb22.jpeg",
  "./img/kathabb23.jpeg",
  "./img/kathabb23-1.jpeg",
  "./img/kathabb24.jpeg",
  "./img/kathabb25.jpeg",
  "./img/kathabb26.jpeg",
  "./img/kathabb27.jpeg",
  "./img/kathabb28.jpeg",
  "./img/kathabb29.jpeg",
  "./img/kathabb30.jpeg",
  "./img/kathabb31.jpeg",
  "./img/kathabb31-1.jpeg",
  "./img/kathabb32.jpeg",
  "./img/kathabb33.jpeg",
  "./img/kathabb34.jpeg",
  "./img/kathabb35.jpeg",
  "./img/kathabb36.jpeg",
  "./img/kathabb36-1.jpeg",
  "./img/kathabb36-2.jpeg",
  "./img/kathabb37.jpeg",
  "./img/kathabb38.jpeg",
  "./img/katha-y-papa.jpeg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => Promise.allSettled(SHELL.map((u) => cache.add(u))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![SHELL_CACHE, RUNTIME_CACHE].includes(k))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Nunca interceptar Supabase (API y realtime) ni audio (peticiones Range)
  if (url.hostname.endsWith("supabase.co")) return;
  if (req.headers.has("range") || url.pathname.endsWith(".mp3")) return;

  // Navegación: red primero, caché como respaldo
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html")),
    );
    return;
  }

  // Recursos propios y externos permitidos: stale-while-revalidate
  const cacheable =
    url.origin === self.location.origin ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com" ||
    url.hostname === "cdn.jsdelivr.net";

  if (!cacheable) return;

  event.respondWith(
    caches.open(RUNTIME_CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res && (res.status === 200 || res.type === "opaque"))
            cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
