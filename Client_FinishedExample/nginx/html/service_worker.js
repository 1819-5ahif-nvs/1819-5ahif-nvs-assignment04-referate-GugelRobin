
const staticCacheName = "chatter-static-v1";
const messagesCacheName = "chatter-messages-v1";

const cacheAssets = [
    "/",
    "/index.html",
    "/users.html",
    "/chat.html",
    "/css/style.css",
    "/js/load_chat.js",
    "/js/load_users.js",
    "/js/login_user.js",
    "/js/main.js"
];

self.addEventListener('install', event => {
    console.log("Service worker installing...");
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(cacheAssets)
                    //.then(() => self.skipWaiting())
                    .catch(reason => console.log(reason));
            })
    );
});

self.addEventListener("activate", event => {
    console.log("Service worker activating...");
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key !== staticCacheName && key !== messagesCacheName) {
                    return caches.delete(key);
                }
            }))
        })
    )
});



self.addEventListener("fetch", event => {
    if (event.request.url.includes("/api")) {
        if (event.request.method !== 'get') {
            event.respondWith(
                fetch(event.request)
            )
        }
        else {
            event.respondWith(
                networkFirst(event)
            )
        }
    }
    else {
        event.respondWith(
            cacheFirst(event)
        )
    }
});

function networkFirst(event) {
    return fetch(event.request).then(result => {
        const clone = result.clone();
        caches.open(messagesCacheName).then(cache => {
            cache.put(event.request, clone);
        });
        return result;
    }).catch(() => {
        return caches.match(event.request);
    })
}


function cacheFirst(event) {
    return caches.match(event.request).then(result => {
        if (result === undefined) {
            return fetch(event.request);
        }
        return result;
    });
}