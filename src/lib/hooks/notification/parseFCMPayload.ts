import { FCMNotificationPayload } from "@/types/fcm.type";

export const parseFCMPayload = (payload: {
  notification?: { title?: string; body?: string };
  data?: Record<string, string>;
}): FCMNotificationPayload => ({
  title: payload.notification?.title || payload.data?.title,
  message: payload.notification?.body || payload.data?.message,
  type: payload.data?.type as FCMNotificationPayload["type"],
  notification_uuid: payload.data?.notification_uuid,
  reference_uuid: payload.data?.reference_uuid || payload.data?.order_uuid,
  action_path_customer: payload.data?.action_path_customer,
});
