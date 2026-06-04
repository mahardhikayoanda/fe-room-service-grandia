export type NotificationOrderType =
  | "order_created"
  | "order_waiting_payment"
  | "order_paid"
  | "order_confirmed"
  | "order_approved"
  | "order_on_delivery"
  | "order_completed"
  | "order_cancelled"
  | "order_payment_failed"
  | "test";

export interface NotificationPayloadType {
  order_uuid?: string;
  order_number?: string;
  status?: string;
  room_name?: string;
  grand_total?: number;
  type?: NotificationOrderType;
  action_path_admin?: string;
  action_path_customer?: string;
  customer_name?: string;
}

export interface NotificationType {
  uuid: string;
  recipient_type: "admin" | "customer";
  type: NotificationOrderType;
  title: string;
  message: string;
  reference_type: string | null;
  reference_uuid: string | null;
  channel: string;
  payload: NotificationPayloadType | null;
  is_read: boolean;
  read_at: number | null;
  version: number;
}
