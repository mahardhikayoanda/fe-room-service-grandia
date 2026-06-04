import { useEffect, useState } from "react";

interface NotifOptions {
  body?: string;
  icon?: string;
  vibrate?: number[];
  tag?: string;
  data?: unknown;
}

const isSupportNotification = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

export const useNotification = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (isSupportNotification()) {
      if (Notification.permission === "granted") {
        setPermission("granted");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => setPermission(perm));
      }
    }
  }, []);

  const triggerNotification = (title: string, options?: NotifOptions) => {
    if (permission === "granted") {
      return new Notification(title, options);
    }
    console.warn("Notification permission not granted.");
    return null;
  };

  return { triggerNotification, permission };
};
