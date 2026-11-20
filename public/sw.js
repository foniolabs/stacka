// Kill switch. This site no longer uses a service worker.
// Visitors who loaded the old site still have the previous cache-first worker installed,
// which would keep serving old pages. When their browser fetches this file it clears the
// caches, unregisters itself and reloads open tabs. Safe to delete after a few months.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((c) => c.navigate(c.url));
    })()
  );
});
