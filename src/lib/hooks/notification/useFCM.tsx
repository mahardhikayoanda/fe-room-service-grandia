"use client";

import { useEffect, useRef } from "react";

import TAGS from "@/constants/tags";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  getFirebaseMessaging,
  onMessage,
  registerFCM,
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
  const registeredFidRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isReady) return;

    let unsubscribeOnMessage: (() => void) | undefined;
    let unsubscribeOnRegistered: (() => void) | undefined;

    const setupFCM = async () => {
      if (!(await isFirebaseConfigured())) return;

      try {
        const messaging = await getFirebaseMessaging();
        if (!messaging) return;

        const unsubscribeRegistered = await registerFCM((fid) => {
          if (!fid || fid === registeredFidRef.current) return;

          registeredFidRef.current = fid;
          localStorage.setItem(FCM_TOKEN_STORAGE_KEY, fid);
          registerToken({ phone_number: phoneNumber, token: fid });
        });

        if (!unsubscribeRegistered) return;

        unsubscribeOnRegistered = unsubscribeRegistered;

        unsubscribeOnMessage = onMessage(messaging, (payload) => {
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
      } catch {
        // FCM is optional — fail silently when not configured or unsupported
      }
    };

    setupFCM();

    return () => {
      unsubscribeOnMessage?.();
      unsubscribeOnRegistered?.();
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
