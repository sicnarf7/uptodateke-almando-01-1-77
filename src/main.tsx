
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

// Register service worker for PWA capabilities and caching
if (import.meta.env.PROD) {
  registerServiceWorker({
    onUpdate: (registration) => {
      // Notify user about new content if needed
      if (registration && registration.waiting) {
        // You could display a UI to let the user know there's an update
        console.log('New version available! Ready to update.');
      }
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
