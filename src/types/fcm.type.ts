import { NotificationOrderType } from "./notification.type";

export interface FCMNotificationPayload {
  title?: string;
  message?: string;
  type?: NotificationOrderType;
  notification_uuid?: string;
  reference_uuid?: string;
  action_path_customer?: string;
}

export interface RegisterFCMTokenBody {
  phone_number: string;
  token: string;
}
