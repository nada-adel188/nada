const CACHE_NAME = 'el-nada-tours-cache-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/welcome.html',
    '/login.html',
    '/register.html',
    '/booking.html',
    '/cancel.html',
    '/contact.html',
    '/fallback.html',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request).catch(() => {
                    return caches.match('/fallback.html');
                });
            })
    );
});


self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});