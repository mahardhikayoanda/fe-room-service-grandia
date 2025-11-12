"use client";

import { Box, Button, Divider, Typography } from "@mui/material";
import {
  ChevronDown,
  Hourglass,
  CheckCircle,
  CheckCircle2,
  Truck,
  Eye,
  CircleCheckBig,
  CircleX,
} from "lucide-react";
import { useState, useMemo, JSX } from "react";
import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";

interface StatusTracker {
  created_at: string;
  status: {
    value: string;
    label: string;
  };
}

interface ComplaintRequestStatusProps {
  statusTrackers: StatusTracker[];
}

type StatusValue =
  | "pending"
  | "confirmed"
  | "approved"
  | "processing"
  | "in_review"
  | "completed"
  | "cancelled";

export default function ComplaintRequestStatus({
  statusTrackers,
}: ComplaintRequestStatusProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Define all possible statuses in order
  const allStatuses: { value: StatusValue; label: string }[] = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "approved", label: "Approved" },
    { value: "processing", label: "Processing" },
    { value: "in_review", label: "In Review" },
    { value: "completed", label: "Completed" },
  ];

  // Process statuses based on API response
  const processedStatuses = useMemo(() => {
    // Check if cancelled exists in response
    const hasCancelled = statusTrackers.some(
      (tracker) => tracker.status.value === "cancelled"
    );

    // Get all status values from response
    const responseStatusValues = statusTrackers.map((t) => t.status.value);

    // If cancelled exists, only show statuses up to cancelled
    if (hasCancelled) {
      const cancelledTracker = statusTrackers.find(
        (t) => t.status.value === "cancelled"
      );

      // Get all statuses from response up to and including cancelled
      const statusesBeforeCancelled = statusTrackers
        .filter((t) => t.status.value !== "cancelled")
        .map((tracker) => ({
          value: tracker.status.value as StatusValue,
          label: tracker.status.label,
          timestamp: tracker.created_at,
          isCompleted: true,
          color: "green" as const,
        }));

      // Add cancelled status
      return [
        ...statusesBeforeCancelled,
        {
          value: "cancelled" as StatusValue,
          label: cancelledTracker!.status.label,
          timestamp: cancelledTracker!.created_at,
          isCompleted: true,
          color: "red" as const,
        },
      ];
    }

    // If no cancelled, show all statuses
    return allStatuses.map((status) => {
      const tracker = statusTrackers.find(
        (t) => t.status.value === status.value
      );

      return {
        value: status.value,
        label: status.label,
        timestamp: tracker?.created_at || "-",
        isCompleted: !!tracker,
        color: tracker ? ("green" as const) : ("gray" as const),
      };
    });
  }, [statusTrackers]);

  const getIcon = (
    statusValue: StatusValue,
    color: "green" | "gray" | "red"
  ) => {
    const iconSize = 20;
    const iconColor =
      color === "green" ? "#10B981" : color === "red" ? "#DC2626" : "#9CA3AF";

    const iconMap: Record<StatusValue, JSX.Element> = {
      pending: <Hourglass size={iconSize} color={iconColor} strokeWidth={2} />,
      confirmed: (
        <CheckCircle size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      approved: (
        <CheckCircle2 size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      processing: <Truck size={iconSize} color={iconColor} strokeWidth={2} />,
      in_review: <Eye size={iconSize} color={iconColor} strokeWidth={2} />,
      completed: (
        <CircleCheckBig size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      cancelled: <CircleX size={iconSize} color={iconColor} strokeWidth={2} />,
    };

    const bgColor =
      color === "green"
        ? "rgba(16, 185, 129, 0.1)"
        : color === "red"
          ? "rgba(220, 38, 38, 0.1)"
          : "#F3F4F6";

    return (
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          bgcolor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {iconMap[statusValue]}
      </Box>
    );
  };

  const renderStatusList = (
    items: typeof processedStatuses,
    showAll = false
  ) => {
    const displayItems = showAll
      ? items
      : items.length > 2
        ? [items[0], items[items.length - 1]]
        : items;

    return displayItems.map((item, index) => {
      const isLast = index === displayItems.length - 1;
      const textColor =
        item.color === "green"
          ? "#10B981"
          : item.color === "red"
            ? "#DC2626"
            : "#9CA3AF";

      return (
        <Box
          key={item.value}
          sx={{
            display: "flex",
            gap: 2,
            position: "relative",
          }}
        >
          {/* Icon and Line */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {getIcon(item.value, item.color)}

            {/* Vertical Line */}
            {!isLast && (
              <Box
                sx={{
                  width: 2,
                  height: 24,
                  bgcolor: "#E5E7EB",
                  my: 0.5,
                }}
              />
            )}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, pb: isLast ? 0 : 2 }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: textColor,
                mb: 0.5,
              }}
            >
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: "#6B7280",
              }}
            >
              {item.timestamp}
            </Typography>
          </Box>
        </Box>
      );
    });
  };

  return (
    <>
      <Box sx={{ mb: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            mb: 2,
            color: "#000",
          }}
        >
          Complaint or Request Status
        </Typography>

        {/* Status Items - Show only first and last */}
        <Box sx={{ position: "relative" }}>
          {renderStatusList(processedStatuses, false)}
        </Box>

        <Divider sx={{ mt: 3, mb: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() => setShowDetails(true)}
            endIcon={
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronDown size={20} color="#1976d2" />
              </Box>
            }
            sx={{
              textTransform: "none",
              color: "#1976d2",
              fontWeight: 600,
              fontSize: "14px",
              mb: 0,
              pb: 0,
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </Box>

      {/* Swipeable Drawer for Full Status Details */}
      <SwipeableDrawerWrapper
        open={showDetails}
        onClose={() => setShowDetails(false)}
        onOpen={() => setShowDetails(true)}
        maxWidth={384}
        maxHeight="85vh"
        borderRadius={16}
      >
        <Box sx={{ pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              mb: 3,
              color: "#000",
            }}
          >
            Complaint Status Details
          </Typography>

          {/* All Status Items */}
          <Box sx={{ position: "relative" }}>
            {renderStatusList(processedStatuses, true)}
          </Box>
        </Box>
      </SwipeableDrawerWrapper>
    </>
  );
}
