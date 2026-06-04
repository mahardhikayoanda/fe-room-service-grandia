const FIREBASE_SDK_VERSION = "12.14.0";

export interface FirebaseServiceWorkerConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const buildFirebaseServiceWorkerScript = (
  config: FirebaseServiceWorkerConfig,
) => `/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-messaging-compat.js');

firebase.initializeApp(${JSON.stringify(config)});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || payload.data?.title || 'New Notification';
  const body = payload.notification?.body || payload.data?.message || '';

  self.registration.showNotification(title, {
    body,
    icon: '/images/home/bg_hero_section.png',
    data: payload.data,
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const path = event.notification.data?.action_path_customer || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(path);
      }

      return undefined;
    }),
  );
});
`;

export const getFirebaseServiceWorkerConfig =
  (): FirebaseServiceWorkerConfig => ({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  });
