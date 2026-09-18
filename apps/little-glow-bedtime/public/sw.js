/* Little Glow Bedtime — shell + art cache */
const CACHE = "little-glow-v1";
const PRECACHE = [
  "/",
  "/story",
  "/songs",
  "/timer",
  "/favorites",
  "/unlock",
  "/behind-the-story",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/apple-touch-icon.png",
  "/og-image.png",
  "/art/25-finale-glow-returns.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isArt = url.pathname.startsWith("/art/");
  const isShell =
    url.pathname === "/" ||
    url.pathname.startsWith("/story") ||
    url.pathname.startsWith("/songs") ||
    url.pathname.startsWith("/timer") ||
    url.pathname.startsWith("/favorites") ||
    url.pathname.startsWith("/unlock") ||
    url.pathname.startsWith("/behind-the-story") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css");

  if (!isArt && !isShell) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      if (cached) {
        // Stale-while-revalidate for shell; art prefers cache
        if (!isArt) {
          fetch(req)
            .then((res) => {
              if (res && res.ok) cache.put(req, res.clone());
            })
            .catch(() => undefined);
        }
        return cached;
      }
      try {
        const res = await fetch(req);
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      } catch {
        return cached || Response.error();
      }
    })
  );
});
