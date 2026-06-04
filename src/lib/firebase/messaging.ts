import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  isSupported,
  Messaging,
  onMessage,
  onRegistered,
  register,
} from "firebase/messaging";

import { loadFirebaseClientConfig } from "./config";
import { toFirebaseAppOptions } from "./server-config";

let firebaseApp: FirebaseApp | null = null;

export const getFirebaseApp = async () => {
  const clientConfig = await loadFirebaseClientConfig();
  if (!clientConfig?.configured) return null;

  if (!firebaseApp) {
    firebaseApp = getApps().length
      ? getApps()[0]
      : initializeApp(toFirebaseAppOptions(clientConfig.config));
  }

  return firebaseApp;
};

export const getFirebaseMessaging = async (): Promise<Messaging | null> => {
  if (typeof window === "undefined") return null;

  const clientConfig = await loadFirebaseClientConfig();
  if (!clientConfig?.configured) return null;

  const supported = await isSupported();
  if (!supported) return null;

  const app = await getFirebaseApp();
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

export const registerFCM = async (onFid: (fid: string) => void) => {
  const clientConfig = await loadFirebaseClientConfig();
  const messaging = await getFirebaseMessaging();
  if (!messaging || !clientConfig?.configured) return null;

  const registration = await registerServiceWorker();
  if (!registration) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const unsubscribeOnRegistered = onRegistered(messaging, onFid);

  try {
    await register(messaging, {
      vapidKey: clientConfig.config.vapidKey,
      serviceWorkerRegistration: registration,
    });
  } catch (error) {
    unsubscribeOnRegistered();
    throw error;
  }

  return unsubscribeOnRegistered;
};

export { onMessage };
