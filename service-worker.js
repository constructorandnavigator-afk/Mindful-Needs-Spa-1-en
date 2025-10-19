const CACHE_NAME = 'spa-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'KissVaultLogo.png',
  'Mindful_Needs_Digital_Spa_Logo.png',
  'logobriga.png',
  'LogoLjubav.png',
  'LogoRiskTrack.png',
  'worry.html',
  'Love.html',
  'gambling.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
                  .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
