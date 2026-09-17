/* ============================================================================
   sw.js — keeps the site working on venue wifi, and picks up every deploy.

   Pages, scripts and styles are fetched fresh from the network whenever there
   is a connection, and only fall back to the cached copy when the signal is
   weak or gone — so a push shows up on the next visit, and the programmes
   still open mid-reception. Photos, audio and fonts, which rarely change and
   are heavy, are served from the cache first.

   You never need to edit CACHE by hand: every Vercel build replaces __BUILD__
   with the commit id (see vercel.json). That change is what tells returning
   guests' browsers a new version exists, and site.js then refreshes the page.
   ========================================================================== */
const CACHE = "wedding-__BUILD__";

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

/* How long to wait for the network before settling for the cached copy. */
const PATIENCE_MS = 3500;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // addAll fails wholesale if one file 404s, so add them individually.
      // cache: "reload" skips the browser's HTTP cache, so a new version
      // never gets filled with the previous deploy's files.
      .then((cache) => Promise.all(SHELL.map((url) =>
        cache.add(new Request(url, { cache: "reload" })).catch(() => {}))))
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

function store(req, res) {
  const type = res.headers.get("content-type") || "";
  if (type.startsWith("video/")) return;          // too big to keep on a phone
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
}

/* Only a page request should fall back to a page. Handing index.html to a
   failed image, audio or map request would be worse than failing. */
function fromCache(req) {
  return caches.match(req, { ignoreSearch: true }).then((hit) => {
    if (hit) return hit;
    if (req.mode === "navigate") return caches.match("./index.html");
    return undefined;
  });
}

function networkFirst(req) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (res) => { if (!settled && res) { settled = true; resolve(res); } };

    // Slow connection: show the cached copy rather than a blank screen.
    const timer = setTimeout(() => fromCache(req).then(finish), PATIENCE_MS);

    fetch(req)
      .then((res) => {
        clearTimeout(timer);
        if (res && res.ok) store(req, res);
        finish(res);
      })
      .catch(() => {
        clearTimeout(timer);
        fromCache(req).then((hit) => finish(hit || Response.error()));
      });
  });
}

function cacheFirst(req, sameOrigin) {
  return caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res && res.ok && (sameOrigin || res.type === "cors")) store(req, res);
    return res;
  }));
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Media can be large and is range-requested; let the browser handle it.
  if (req.headers.has("range")) return;

  const url = new URL(req.url);
  if (!url.protocol.startsWith("http")) return;
  const sameOrigin = url.origin === location.origin;

  const isCode = sameOrigin && (
    req.mode === "navigate" ||
    url.pathname === "/" ||
    /\.(html|js|css|webmanifest|json)$/.test(url.pathname)
  );

  event.respondWith(isCode ? networkFirst(req) : cacheFirst(req, sameOrigin));
});
