import { useEffect } from 'react';

declare global {
  interface Window {
    workbox: {
      messageSkipWaiting(): void;
      register(): void;
      addEventListener(name: string, callback: () => unknown): void;
    };
  }
}

const PWAUpdater = () => {
  // This hook only run once in browser after the component is rendered for the first time.
  // It has same effect as the old componentDidMount lifecycle callback.
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox;
      wb.addEventListener('waiting', () => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        // https://developer.chrome.com/docs/workbox/handling-service-worker-updates/#the-code-to-put-in-your-page
        // eslint-disable-next-line no-alert, no-restricted-globals
        if (confirm('A newer version of this web app is available, reload to update?')) {
          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSkipWaiting();
          wb.addEventListener('controlling', () => {
            window.location.reload();
          });
        } else {
          console.log(
            'User rejected to update SW, keeping the old version. New version will be automatically loaded when the app is opened next time.',
          );
        }
      });
      // Don't forget to call register as automatic registration is disabled.
      wb.register();
    }
  }, []);

  return null;
};

export default PWAUpdater;
