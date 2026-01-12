const cacheName = 'songlist-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png'
];

// Install service worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching shell assets');
      cache.addAll(assets);
    })
  );
});

// Activate service worker
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch events
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});