/* ============================================================================
   sw.js — keeps the site working on venue wifi.

   Everything the guest needs is cached on their first visit, so the programmes
   still open when the signal drops mid-reception. Pages are served from the
   cache immediately and refreshed in the background.

   Bump CACHE below whenever you change content, so returning guests pick the
   new version up.
   ========================================================================== */
const CACHE = "wedding-v5";

const SHELL = [
  "./",
  "./index.html",
  "./church.html",
  "./traditional.html",
  "./reception.html",
  "./details.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/data.js",
  "./assets/js/site.js",
  "./assets/js/booklet.js",
  "./assets/js/gallery.js",
  "./assets/js/home.js",
  "./assets/js/details.js",
  "./assets/js/comingsoon.js",
  "./assets/img/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // addAll fails wholesale if one file 404s, so add them individually.
      .then((cache) => Promise.all(SHELL.map((url) => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;

  // Media can be large and is range-requested; let the browser handle it.
  if (req.headers.has("range")) return;

  event.respondWith(
    caches.match(req).then((hit) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok && (sameOrigin || res.type === "basic" || res.type === "cors")) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => {
          // Only a page request should fall back to a page. Handing index.html
          // to a failed image, audio or map request would be worse than failing.
          if (sameOrigin && req.mode === "navigate") {
            return caches.match("./index.html").then((page) => page || Response.error());
          }
          return Response.error();
        });

      // Cache first for speed on a weak connection, refreshed in the background.
      return hit || network;
    })
  );
});
