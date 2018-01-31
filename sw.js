// if you are using chrome verson 41 or older, then you have to include this file.
// As still, most of the browser does not support the CACHE Api yet.
console.log("i am in");
var Config = {
    CACHE_VERSION : "testApp",
    CACHE_FILES : [
        "/",
        "/core/assets/vendor/normalize-css/normalize.css?p3dlup"
    ],
    NOTIFICATION_TITLE : 'I Was running in the background',
    OPTIONS :{
        body: "Notification from AGWeb.",
        icon: 'http://wfarm3.dataknet.com/static/resources/icons/set57/dbba6d94.png'
    }
};


// Install Service Worker First

// A callBack has been passed whenever install event will be called, for handelling the event
// Remember, Even if a small bit of code gets changed, this event will be called again
self.addEventListener("install",function(e){
    console.log(e,"waiting");
    e.waitUntil(
        caches.open(Config.CACHE_VERSION).then(function(cache){
                return cache.addAll(Config.CACHE_FILES);
        })
    );
});


// Fetch request gets triggered on each of the network request, Service worker intercept
// each and every network request going from the browser for that application

self.addEventListener("fetch",function(e){
    console.log("Going to fetch", e.request.url);
//    e.respondWith(
// // If request got matched with that of cache, then it will show that, otherwise fetch it from the network
//         caches.match(e.request).then(function (response) {
//             if(response){
//                 console.log("From the cache",e.request.url);
//                 return response
//             }

//             var fetchRequest = e.request.clone();

//             return fetch(fetchRequest).then(function (response) {
//                 // Check if we received a valid response
//                 if(!response || e.request.url === "chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/js/inject.js") {
//                     return response;
//                 }

//                 //clone the response

//                 var responseToCache = response.clone()
//                 console.log("Putting in the cache",e.request.url);
//                 caches.open(Config.CACHE_VERSION).then(function (cache) {
//                     cache.put(e.request, responseToCache);
//                 })

//                 return response;
//             }).catch(function (error) {
//                 console.log("Not in the cache",e.request.url);
//                 return response;
//             })
//         }).catch(function (error) {
//             console.log("error");
//         })


//    );
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
});


// To recive Notification from server.
self.addEventListener('push', function(e) {
    console.log('[Service Worker] Push Received.');
    e.waitUntil(self.registration.showNotification(e.data.text(), Config.OPTIONS));
});

// Service to run in background
self.addEventListener('sync', function(event) {
    console.log("Sync Recieved",event);
    if (event.tag == 'SyncInBackground') {
        self.registration.showNotification(Config.NOTIFICATION_TITLE, Config.OPTIONS)
    }
});