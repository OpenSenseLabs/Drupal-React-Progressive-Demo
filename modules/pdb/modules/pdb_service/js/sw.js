// if you are using chrome verson 41 or older, then you have to include this file.
// As still, most of the browser does not support the CACHE Api yet.
importScripts('/cache-polyfill.js');

var Config = {
    CACHE_VERSION : "testApp",
    CACHE_FILES : [
        "/",
        "/index.html",
        "/style.css",
        "/vendor/font-awesome/css/font-awesome.min.css",
        "/vendor/bootstrap/css/bootstrap.min.css",
        "/vendor/jquery/jquery.min.js",
        "/vendor/bootstrap/js/bootstrap.bundle.min.js",
        "/vendor/jquery-easing/jquery.easing.min.js"
    ]
};


// Install Service Worker First

// A callBack has been passed whenever install event will be called, for handelling the event
// Remember, Even if a small bit of code gets changed, this event will be called again
self.addEventListener("install",function(e){
    e.waitUntil(
        caches.open(Config.CACHE_VERSION).then(function(cache){
                return cache.addAll(Config.CACHE_FILES);
        })
    );
});


// Fetch request gets triggered on each of the network request, Service worker intercept
// each and every network request going from the browser for that application

self.addEventListener("fetch",function(e){
   e.respondWith(
// If request got matched with that of cache, then it will show that, otherwise fetch it from the network
        caches.match(e.request).then(function (response) {
            if(response){
                return response
            }

            var fetchRequest = e.request.clone();

            return fetch(fetchRequest).then(function (response) {
                // Check if we received a valid response
                if(!response || e.request.url === "chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/js/inject.js") {
                    return response;
                }

                //clone the response

                var responseToCache = response.clone()

                caches.open(Config.CACHE_VERSION).then(function (cache) {
                    cache.put(e.request, responseToCache);
                })

                return response;
            }).catch(function (error) {
                return response;
            })
        }).catch(function (error) {
        })


   );
});

// activate event will be fired to kill the old running service worker instance and new service
// worker will take control

self.addEventListener("activate",function (e) {
    e.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== Config.CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    );
})
