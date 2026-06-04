import { getSanitizedVapidKey } from "./vapid-key";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseVapidKey = getSanitizedVapidKey(
  process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
);

export const isFirebaseConfigured = () =>
  Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId &&
    firebaseVapidKey,
  );

export const isFirebaseVapidKeyInvalid = () => {
  const rawKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY?.trim();

  return Boolean(rawKey && !firebaseVapidKey);
};
