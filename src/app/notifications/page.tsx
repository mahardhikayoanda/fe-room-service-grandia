"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";

import { CheckCheck, MessageCircleQuestion } from "lucide-react";

import BackHeader from "@/components/BackHeader";
import NotificationItem from "@/components/Notification/NotificationItem";
import useNotificationStore from "@/lib/zustand/notification.store";
import useGetNotifications from "@/services/notifications/useGetNotifications";
import useReadAllNotifications from "@/services/notifications/useReadAllNotifications";

export default function NotificationsPage() {
  const closeDrawer = useNotificationStore((s) => s.closeDrawer);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data } = useGetNotifications({
    page: String(page),
    per_page: String(perPage),
  });

  const { mutate, isPending } = useReadAllNotifications();

  return (
    <div className="relative min-h-screen w-full min-w-sm">
      <div className="sticky top-0 z-10 bg-white px-6 pt-4 pb-4 shadow-sm">
        <BackHeader title="Notifications" />
      </div>

      <Box className="mx-4 mt-4 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between p-4">
          <div>
            <Typography variant="h6">Notifications</Typography>
            <Typography variant="body2" color="text.secondary">
              Your notifications list
            </Typography>
          </div>

          <IconButton
            color="primary"
            disabled={!((data?.data?.length || 0) > 0) || isPending}
            onClick={() => mutate()}
            aria-label="Mark all as read"
          >
            <CheckCheck />
          </IconButton>
        </div>

        <Divider />

        <Box className="flex flex-col gap-2 p-2">
          {(data?.data?.length || 0) > 0 ? (
            <>
              {data?.data?.map((notification, index) => (
                <NotificationItem
                  key={notification.uuid}
                  notification={notification}
                  index={index}
                  closeDrawer={closeDrawer}
                />
              ))}
              {(data?.pagination?.total_page || 0) > 1 && (
                <Pagination
                  page={page}
                  count={data?.pagination?.total_page || 1}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  shape="rounded"
                  className="ml-auto py-4"
                />
              )}
            </>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-12">
              <MessageCircleQuestion size={64} strokeWidth={1.3} />
              <Typography className="text-center text-gray-500">
                You don&apos;t have any notifications yet
              </Typography>
            </div>
          )}
        </Box>
      </Box>

      <Box className="px-6 py-6">
        <Button
          LinkComponent={Link}
          href="/"
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#4F3534",
            color: "#4F3534",
          }}
        >
          Back to home
        </Button>
      </Box>
    </div>
  );
}
