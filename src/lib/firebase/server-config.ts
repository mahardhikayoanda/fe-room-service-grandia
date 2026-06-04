import type { FirebaseClientConfig, FirebaseWebConfig } from "./types";
import { getSanitizedVapidKey } from "./vapid-key";

export type { FirebaseWebConfig } from "./types";

export const toFirebaseAppOptions = ({
  vapidKey: _vapidKey,
  ...options
}: FirebaseWebConfig) => options;

export const buildFirebaseClientConfig = (): FirebaseClientConfig => {
  const config: FirebaseWebConfig = {
    apiKey: process.env.FIREBASE_API_KEY?.trim() || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN?.trim() || "",
    projectId: process.env.FIREBASE_PROJECT_ID?.trim() || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET?.trim() || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID?.trim() || "",
    appId: process.env.FIREBASE_APP_ID?.trim() || "",
    vapidKey: getSanitizedVapidKey(process.env.FIREBASE_VAPID_KEY) ?? "",
  };

  const configured = Boolean(
    config.apiKey &&
      config.projectId &&
      config.messagingSenderId &&
      config.appId &&
      config.vapidKey,
  );

  return { config, configured };
};

export const getFirebaseWebConfig = (): FirebaseWebConfig =>
  buildFirebaseClientConfig().config;

export const getFirebaseServiceWorkerConfig = () =>
  toFirebaseAppOptions(getFirebaseWebConfig());
