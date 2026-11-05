/* Cache khusus direktori ini; mendukung beberapa proyek pada satu github.io. */
var VERSION = "2026-11-05-full-1";
var PREFIX = "zuperverse-pages-" + encodeURIComponent(self.registration.scope) + "-";
var CACHE = PREFIX + VERSION;
var CORE = [
  "./", "./index.html", "./config.js", "./guru.html", "./privasi.html", "./ketentuan.html",
  "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable.png", "./apple-touch-icon.png",
  "./assets/style.css", "./assets/fonts.css", "./assets/boot.js", "./assets/three.min.js",
  "./assets/game.js", "./assets/github-pages.js",
  "./assets/fonts/font-1.ttf", "./assets/fonts/font-2.ttf", "./assets/fonts/font-3.ttf",
  "./assets/fonts/font-4.ttf", "./assets/fonts/font-5.ttf", "./assets/fonts/font-6.ttf", "./assets/fonts/font-7.ttf"
];
self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(CORE);
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (names) {
    return Promise.all(names.filter(function (name) {
      return name.indexOf(PREFIX) === 0 && name !== CACHE;
    }).map(function (name) { return caches.delete(name); }));
  }).then(function () { return self.clients.claim(); }));
});
async function networkFirst(request) {
  var cache = await caches.open(CACHE);
  var network = fetch(request).then(async function (response) {
    if (response.ok) await cache.put(request, response.clone());
    return response;
  });
  try {
    var response = await Promise.race([
      network,
      new Promise(function (_, reject) { setTimeout(function () { reject(new Error("timeout")); }, 5000); })
    ]);
    return response.ok ? response : (await cache.match(request, {ignoreSearch:true})) || response;
  } catch (error) {
    var cached = await cache.match(request, {ignoreSearch:true});
    if (cached) return cached;
    return network;
  }
}
async function cacheFirst(request) {
  var cache = await caches.open(CACHE);
  var cached = await cache.match(request);
  if (cached) return cached;
  var response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}
self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !request.url.startsWith(self.registration.scope)) return;
  if (/\/api\//.test(url.pathname)) return;
  if (request.mode === "navigate" || /\/(config\.js|manifest\.webmanifest)$/.test(url.pathname)) {
    event.respondWith(networkFirst(request));
  } else event.respondWith(cacheFirst(request));
});
