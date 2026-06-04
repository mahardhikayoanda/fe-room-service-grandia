"use client";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import { Bell } from "lucide-react";

import useNotificationStore from "@/lib/zustand/notification.store";
import useGetNotifications from "@/services/notifications/useGetNotifications";

const NotificationButton = () => {
  const { openDrawer, orderUuid } = useNotificationStore();

  const listParams: Record<string, string> = {
    page: "1",
    per_page: "21",
  };

  if (orderUuid) {
    listParams.order_uuid = orderUuid;
  }

  const { data: notification } = useGetNotifications(listParams);

  const notificationTotal =
    notification?.data?.filter((d) => !d.is_read).length ?? 0;

  return (
    <Badge
      color="error"
      badgeContent={notificationTotal === 21 ? "20+" : notificationTotal}
    >
      <IconButton
        size="small"
        color="primary"
        onClick={openDrawer}
        aria-label="Notifications"
      >
        <Bell size={20} />
      </IconButton>
    </Badge>
  );
};

export default NotificationButton;
