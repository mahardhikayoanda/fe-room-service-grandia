"use client";

import { Button, Typography } from "@mui/material";

import { MessageCircle } from "lucide-react";

import { NotificationType } from "@/types/notification.type";
import useReadNotification from "@/services/notifications/useReadNotification";

import { useGetNotificationProps } from "./_utils";

const NotificationItem = ({
  notification,
  index,
  closeDrawer,
}: {
  notification: NotificationType;
  index: number;
  closeDrawer: () => void;
}) => {
  const { mutate } = useReadNotification();

  const notificationProps = useGetNotificationProps(notification);

  return (
    <div
      className={`border-b border-gray-200 ${index === 0 ? "border-t" : ""}`}
    >
      <Button
        {...notificationProps}
        color="inherit"
        className="flex w-full cursor-pointer items-start justify-start gap-4 rounded-none px-6 py-4 text-start normal-case"
        onClick={(...params) => {
          if (!notification.is_read) mutate(notification.uuid);
          notificationProps?.onClick?.(...params);
          closeDrawer();
        }}
      >
        <div>
          <div className="rounded-full bg-[#F4F0F0] p-2 text-[#4F3534]">
            <MessageCircle size="1rem" />
          </div>
        </div>
        <div className="relative w-full">
          <Typography variant="body1" className="mb-2 text-gray-800">
            {notification.message}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {notification.title}
          </Typography>

          {!notification.is_read && (
            <div className="absolute top-0 right-0 size-2 rounded-full bg-[#4F3534]" />
          )}
        </div>
      </Button>
    </div>
  );
};

export default NotificationItem;
