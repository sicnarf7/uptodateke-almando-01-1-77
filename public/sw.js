
// This is a placeholder service worker file
// The VitePWA plugin will generate the actual service worker content
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
