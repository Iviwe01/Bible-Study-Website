const CACHE_NAME = 'bible-study-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts.js',
    '/the_promises logo.jpg',
    '/icons/icon-512x512.png',
    // Add other assets you want to cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
              return cache.addAll(urlsToCache);
          })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
          .then(response => {
              return response || fetch(event.request);
          })
    );
});
