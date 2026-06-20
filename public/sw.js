const CACHE_NAME = "filemitra-v1";
const PRECACHE_URLS = [
  "/",
  "/tools/bg-remover",
  "/tools/image-compress",
  "/tools/image-convert",
  "/tools/image-resize",
  "/tools/image-to-pdf",
  "/tools/pdf-merge",
  "/tools/pdf-split",
  "/tools/pdf-to-image",
  "/favicon.svg",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

// Install Event - Pre-cache core shells
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Pre-caching offline shells");
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Intercept and serve cached versions
self.addEventListener("fetch", (event) => {
  // Only handle GET requests and local requests
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Caching strategy:
  // 1. Navigation requests (HTML pages): Network-First (fallback to cache)
  // This keeps the HTML always updated, but offline fallback works.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response and save it to cache
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fetch fails, search cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If offline and page is not in cache, fallback to '/'
            return caches.match("/");
          });
        })
    );
    return;
  }

  // 2. Static Assets (CSS, JS, Fonts, Images): Cache-First (with network fallback & dynamic caching)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200) {
          return response;
        }

        // Cache newly fetched assets dynamically
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
