// Patch School moved to school.bradleyejjackson.com. This replaces the old
// offline worker: it clears the old cache and removes itself.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then((cs) => cs.forEach((c) => c.navigate(c.url))));
});
