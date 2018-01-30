var serviceWorkerRegisteration = null;
console.log("here")

// Key to make request for push notification
const applicationServerPublicKey = 'BNmxTxj02UhogCaRIxXVsoof9iVGNLdu_Wo2zRVvrCeQ4O6qPQKZ67KbTofiuH1o9pbEJ_pElMsRuOL9-d-N9w4';


function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}



if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log("registered",registration.scope);
        serviceWorkerRegisteration = registration;
        setTimeout(function () {
            Initialize();
            Sync()
        },5000)
    }, function() {
        console.log('CLIENT: service worker registration failure.');
    });
} else {
    console.log('CLIENT: service worker and push notification Manager is not supported in your current browser.');
}


function Initialize() {
    serviceWorkerRegisteration.pushManager.getSubscription().then(function (subscription) {
        var isSubscribed = !(subscription === null);

        if (isSubscribed) {
            console.log('User IS subscribed.');
        } else {
            console.log('User is NOT subscribed.');
            console.log("Subscribing User");
            subscribeUser();
        }
    });
}


function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    serviceWorkerRegisteration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then(function (success) {
        console.log('User is subscribed.');
        updateSubscriptionOnServer(success);
    }).catch(function (error) {
        console.log("Failed to subscribe a user",error);
    });
}

function Sync() {
    navigator.serviceWorker.ready.then(function (swregister) {
        return swregister.sync.register('SyncInBackground');
    });
}


function updateSubscriptionOnServer(subscription) {
        //Will update it later
}
