import { FileStorageType } from "./global";

export interface OrderDetailType {
  uuid: string;
  order_number: string;
  name: string;
  phone_number: string;
  estimated_delivery: string;
  total_item_count: number;
  rounded_grand_total: string;
  ordered_at: string;
  payment_method: string;
  snap_token?: string;
  room: RoomDetailType;
  order_details: MenuOrderType[];
  order_status_trackers: OrderStatusTrackerType[];
}

interface RoomDetailType {
  room_number: string;
  location: string;
  room_type: RoomType;
}

interface RoomType {
  name: string;
}

export interface MenuOrderType {
  name: string;
  quantity: number;
  total_price: string;
  remark: any;
  image: FileStorageType;
  modifiers: ModifierType[];
}

interface ModifierType {
  name: string;
  modifier_items: ModifierItemType[];
}

interface ModifierItemType {
  name: string;
}

interface OrderStatusTrackerType {
  created_at: string;
  status: StatusType;
}

interface StatusType {
  value: string;
  label: string;
}
