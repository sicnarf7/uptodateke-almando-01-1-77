
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { register as registerServiceWorker } from 'virtual:pwa-register';

// Register service worker for PWA capabilities with update notification
const updateSW = registerServiceWorker({
  onNeedRefresh() {
    // Show a toast or notification that there's an update available
    if (confirm('New content available. Reload to update?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
  immediate: true
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
