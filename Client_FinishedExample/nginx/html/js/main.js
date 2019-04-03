

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service_worker.js")
    .then(registration => {
        console.log("Registration successful: Scope: " + registration.scope);
    })
    .catch(reason => {
        console.log("Registration failed: Error: " + reason)
    });

    Notification.requestPermission().then(status => {
        console.log(`Notification permission status: ${status}`)
    })
} else {
    console.log("Couldn't install service worker...\n\t serviceWorker is missing!")
}
