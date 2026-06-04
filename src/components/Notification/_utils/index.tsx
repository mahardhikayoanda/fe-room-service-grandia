import Link from "next/link";

import { ButtonProps } from "@mui/material";

import {
  NotificationOrderType,
  NotificationType,
} from "@/types/notification.type";

interface NotificationConfig {
  type: NotificationOrderType;
  props?: (notif: NotificationType) => ButtonProps;
}

const getOrderHref = (notification: NotificationType) => {
  if (notification.payload?.action_path_customer) {
    return notification.payload.action_path_customer;
  }

  const orderUuid =
    notification.reference_uuid || notification.payload?.order_uuid;

  if (!orderUuid) return "/food-beverage";

  return `/food-beverage/cart/${orderUuid}`;
};

const CUSTOMER_ORDER_TYPES: NotificationOrderType[] = [
  "order_waiting_payment",
  "order_paid",
  "order_confirmed",
  "order_approved",
  "order_on_delivery",
  "order_completed",
  "order_cancelled",
  "order_payment_failed",
];

const CUSTOMER_NOTIFICATIONS: NotificationConfig[] = CUSTOMER_ORDER_TYPES.map(
  (type) => ({
    type,
    props: (notif) => ({
      LinkComponent: Link,
      href: getOrderHref(notif),
    }),
  }),
);

export const useGetNotificationProps = (notification: NotificationType) => {
  const notificationType = CUSTOMER_NOTIFICATIONS.find(
    (item) => item.type === notification.type,
  );

  return notificationType?.props?.(notification);
};
