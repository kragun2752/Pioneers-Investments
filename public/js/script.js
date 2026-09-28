// ========================================
// PIONEERS INVESTMENTS
// PWA SERVICE WORKER REGISTRATION
// ========================================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log(
                    "Pioneers Investments PWA service worker registered",
                    registration
                );
            })
            .catch((error) => {
                console.error(
                    "PWA service worker registration failed:",
                    error
                );
            });
    });
}


// ========================================
// PWA INSTALL SUPPORT
// ========================================

let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;

    console.log("Pioneers Investments can be installed as an app.");
});


async function installPWA() {
    if (!deferredInstallPrompt) {
        console.log("PWA installation prompt is not available yet.");
        return;
    }

    deferredInstallPrompt.prompt();

    const { outcome } = await deferredInstallPrompt.userChoice;

    console.log(`PWA installation result: ${outcome}`);

    deferredInstallPrompt = null;
}


window.addEventListener("appinstalled", () => {
    console.log("Pioneers Investments was installed successfully.");
    deferredInstallPrompt = null;
});
