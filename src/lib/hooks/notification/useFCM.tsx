"use client";

import { useEffect, useRef } from "react";

import TAGS from "@/constants/tags";
import {
  isFirebaseConfigured,
  isFirebaseVapidKeyInvalid,
} from "@/lib/firebase/config";
import {
  getFirebaseMessaging,
  onMessage,
  requestFCMToken,
} from "@/lib/firebase/messaging";
import { getQueryCLient } from "@/libs/react-query/providers";
import useRegisterFCMToken from "@/services/notifications/useRegisterFCMToken";
import { FCM_TOKEN_STORAGE_KEY } from "@/utils/customerPhone";

import useCustomerPhone from "./useCustomerPhone";
import { parseFCMPayload } from "./parseFCMPayload";
import { showNotificationToast } from "./showNotificationToast";
import { useNotification } from "./useNotification";

const useFCM = () => {
  const { phoneNumber, isReady } = useCustomerPhone();
  const { mutate: registerToken } = useRegisterFCMToken();
  const { permission, triggerNotification } = useNotification();
  const queryClient = getQueryCLient();
  const registeredTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isReady || !isFirebaseConfigured()) return;

    let unsubscribe: (() => void) | undefined;

    const setupFCM = async () => {
      if (isFirebaseVapidKeyInvalid()) return;

      try {
        const token = await requestFCMToken();
        if (!token || token === registeredTokenRef.current) return;

        registeredTokenRef.current = token;
        localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);

        registerToken({ phone_number: phoneNumber, token });

        const messaging = await getFirebaseMessaging();
        if (!messaging) return;

        unsubscribe = onMessage(messaging, (payload) => {
          const data = parseFCMPayload(payload);

          if (permission === "granted" && data.title) {
            triggerNotification(data.title, { body: data.message });
          }

          if (data.message) {
            showNotificationToast(data.message);
          }

          queryClient.invalidateQueries({
            queryKey: [TAGS.NOTIFICATION, phoneNumber],
          });
        });
      } catch (error) {
        console.error("setupFCM error:", error);
      }
    };

    setupFCM();

    return () => {
      unsubscribe?.();
    };
  }, [
    isReady,
    phoneNumber,
    permission,
    queryClient,
    registerToken,
    triggerNotification,
  ]);
};

export default useFCM;
