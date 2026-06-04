"use client";

import { Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

import NotificationButton from "@/components/Notification/NotificationButton";

interface Props {
  title?: string;
  subTitle?: string;
  withoutBackButton?: boolean;
  showNotifications?: boolean;
  trailing?: React.ReactNode;
}

export default function BackHeader({
  title,
  subTitle,
  withoutBackButton,
  showNotifications = false,
  trailing,
}: Props) {
  const route = useRouter();

  const trailingContent =
    trailing ?? (showNotifications ? <NotificationButton /> : null);

  return (
    <div className="flex w-full items-start justify-between gap-3 bg-white">
      <div className="flex min-w-0 flex-1 gap-3 items-start">
        {!withoutBackButton && (
          <ArrowLeft
            size={24}
            className="text-primary shrink-0 cursor-pointer"
            onClick={() => route.back()}
          />
        )}
        <div className="min-w-0">
          <Typography
            variant="h1"
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              color: "text.primary",
            }}
          >
            {title || "Unknown Title"}
          </Typography>
          {subTitle && (
            <Typography
              variant="body1"
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                color: "text.primary",
              }}
            >
              {subTitle}
            </Typography>
          )}
        </div>
      </div>
      {trailingContent ? (
        <div className="shrink-0">{trailingContent}</div>
      ) : null}
    </div>
  );
}
