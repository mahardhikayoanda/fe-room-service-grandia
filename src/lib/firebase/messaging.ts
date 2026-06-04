import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  Messaging,
  onMessage,
} from "firebase/messaging";

import {
  firebaseConfig,
  firebaseVapidKey,
  isFirebaseConfigured,
} from "./config";

const FCM_VAPID_KEY_HELP =
  "Set NEXT_PUBLIC_FIREBASE_VAPID_KEY to the Web Push key pair from Firebase Console → Project settings → Cloud Messaging → Web Push certificates (Key pair).";

let firebaseApp: FirebaseApp | null = null;

export const getFirebaseApp = () => {
  if (!isFirebaseConfigured()) return null;

  if (!firebaseApp) {
    firebaseApp = getApps().length
      ? getApps()[0]
      : initializeApp(firebaseConfig);
  }

  return firebaseApp;
};

export const getFirebaseMessaging = async (): Promise<Messaging | null> => {
  if (typeof window === "undefined" || !isFirebaseConfigured()) return null;

  const supported = await isSupported();
  if (!supported) return null;

  const app = getFirebaseApp();
  if (!app) return null;

  return getMessaging(app);
};

export const registerServiceWorker = async () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
    { scope: "/" },
  );

  await navigator.serviceWorker.ready;

  return registration;
};

export const requestFCMToken = async () => {
  const messaging = await getFirebaseMessaging();
  if (!messaging) return null;

  if (!firebaseVapidKey) {
    console.warn(FCM_VAPID_KEY_HELP);
    return null;
  }

  const registration = await registerServiceWorker();
  if (!registration) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  try {
    return await getToken(messaging, {
      vapidKey: firebaseVapidKey,
      serviceWorkerRegistration: registration,
    });
  } catch (error) {
    if (error instanceof DOMException && error.message.includes("ECDSA")) {
      console.warn(`${FCM_VAPID_KEY_HELP} Current value is invalid.`);
    }

    throw error;
  }
};

export { getToken, onMessage };
