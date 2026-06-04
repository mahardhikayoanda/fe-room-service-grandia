"use client";

import Link from "next/link";

import {
  Button,
  Drawer,
  DrawerProps,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import { CheckCheck, X } from "lucide-react";

import useNotificationStore from "@/lib/zustand/notification.store";
import useGetNotifications from "@/services/notifications/useGetNotifications";
import useReadAllNotifications from "@/services/notifications/useReadAllNotifications";

import NotificationItem from "./NotificationItem";

interface Props extends DrawerProps {}

const NotificationDrawer = ({ ...props }: Props) => {
  const { isDrawerOpen, toggleDrawer, closeDrawer, orderUuid } =
    useNotificationStore();

  const listParams: Record<string, string> = {
    page: "1",
    per_page: "20",
  };

  if (orderUuid) {
    listParams.order_uuid = orderUuid;
  }

  const { data } = useGetNotifications(listParams);
  const { mutate, isPending } = useReadAllNotifications();

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={closeDrawer}
      anchor="right"
      PaperProps={{
        className: "w-full max-w-[480px] flex flex-col flex-1 p-4 px-6 !pb-0",
      }}
      {...props}
    >
      <div className="mb-4 flex items-center justify-between">
        <Typography variant="h6">Notifications</Typography>
        <div className="flex">
          <Tooltip title="Mark all as read">
            <IconButton
              color="primary"
              disabled={isPending}
              onClick={() => mutate()}
            >
              <CheckCheck size={20} />
            </IconButton>
          </Tooltip>
          <IconButton onClick={toggleDrawer} aria-label="Close notifications">
            <X size={20} />
          </IconButton>
        </div>
      </div>

      <div className="-mx-6 flex h-1 flex-1 flex-grow flex-col overflow-y-auto border-t border-gray-300">
        {data?.data?.length ? (
          data.data.map((notification, i) => (
            <NotificationItem
              key={notification.uuid}
              notification={notification}
              index={i}
              closeDrawer={closeDrawer}
            />
          ))
        ) : (
          <Typography className="px-6 py-12 text-center text-gray-500">
            No notifications yet
          </Typography>
        )}
      </div>

      <div className="py-4">
        <Button
          LinkComponent={Link}
          href="/notifications"
          fullWidth
          variant="contained"
          onClick={closeDrawer}
          sx={{
            bgcolor: "#4F3534",
            textTransform: "none",
            "&:hover": { bgcolor: "#3d2a29" },
          }}
        >
          View All
        </Button>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
