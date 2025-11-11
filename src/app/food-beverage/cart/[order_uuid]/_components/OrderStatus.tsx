"use client";

import React, { useState, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Hourglass,
  CheckCircle,
  Truck,
  CircleCheckBig,
  CircleX,
} from "lucide-react";
import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";

interface OrderStatusTracker {
  created_at: string;
  status: {
    value: string;
    label: string;
  };
}

interface OrderStatusProps {
  statusTrackers: OrderStatusTracker[];
  estimatedDelivery: string;
  paymentMethod: string;
}

type StatusType =
  | "waiting_payment"
  | "pending"
  | "confirmed"
  | "approved"
  | "on_delivery"
  | "completed"
  | "cancelled";

interface ProcessedStatus {
  type: StatusType;
  label: string;
  timestamp: string;
  isCompleted: boolean;
  isCancelled: boolean;
}

export default function OrderStatus({
  statusTrackers,
  estimatedDelivery,
  paymentMethod,
}: OrderStatusProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Define all possible statuses in order
  const allStatuses: StatusType[] = [
    "waiting_payment",
    "pending",
    "confirmed",
    "approved",
    "on_delivery",
    "completed",
    "cancelled",
  ];

  // Process statuses based on API response
  const processedStatuses = useMemo(() => {
    const result: ProcessedStatus[] = [];

    // Create a map of completed statuses from API
    const completedStatusMap = new Map<string, OrderStatusTracker>();
    statusTrackers.forEach((tracker) => {
      completedStatusMap.set(tracker.status.value, tracker);
    });

    // Check if cancelled status exists
    const hasCancelled = completedStatusMap.has("cancelled");

    // Find the index of cancelled in the response
    const cancelledIndex = statusTrackers.findIndex(
      (t) => t.status.value === "cancelled"
    );

    // If cancelled exists, only show statuses up to cancelled
    if (hasCancelled && cancelledIndex >= 0) {
      // Only show the statuses that are in the API response up to cancelled
      for (let i = 0; i <= cancelledIndex; i++) {
        const tracker = statusTrackers[i];
        result.push({
          type: tracker.status.value as StatusType,
          label: tracker.status.label,
          timestamp: tracker.created_at,
          isCompleted: true,
          isCancelled: tracker.status.value === "cancelled",
        });
      }
      return result;
    }

    // Normal flow - show all statuses except cancelled
    allStatuses.forEach((statusType) => {
      // Skip cancelled in normal flow
      if (statusType === "cancelled") return;

      // Skip waiting_payment if payment_method is not "N/A"
      if (statusType === "waiting_payment" && paymentMethod !== "N/A") return;

      const tracker = completedStatusMap.get(statusType);

      if (tracker) {
        // Status exists in API response - show as completed (green)
        result.push({
          type: statusType,
          label: tracker.status.label,
          timestamp: tracker.created_at,
          isCompleted: true,
          isCancelled: false,
        });
      } else {
        // Status not yet in API response - show as pending (gray)
        result.push({
          type: statusType,
          label: getDefaultLabel(statusType),
          timestamp: "-",
          isCompleted: false,
          isCancelled: false,
        });
      }
    });

    return result;
  }, [statusTrackers, paymentMethod]);

  // Show only first and last status on main page
  const displayedStatuses =
    processedStatuses.length > 2
      ? [processedStatuses[0], processedStatuses[processedStatuses.length - 1]]
      : processedStatuses;

  function getDefaultLabel(statusType: StatusType): string {
    const labels: Record<StatusType, string> = {
      waiting_payment: "Waiting Payment",
      pending: "Pending",
      confirmed: "Confirmed",
      approved: "Approved",
      on_delivery: "On Delivery",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return labels[statusType];
  }

  const getIcon = (
    statusType: StatusType,
    isCompleted: boolean,
    isCancelled: boolean
  ) => {
    const iconSize = 20;
    const iconColor = isCancelled
      ? "#DC2626"
      : isCompleted
        ? "#28A745"
        : "#7F7F7F";

    const iconMap: Record<StatusType, React.ReactNode> = {
      waiting_payment: (
        <Clock size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      pending: <Hourglass size={iconSize} color={iconColor} strokeWidth={2} />,
      confirmed: (
        <CheckCircle size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      approved: (
        <CheckCircle2 size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      on_delivery: <Truck size={iconSize} color={iconColor} strokeWidth={2} />,
      completed: (
        <CircleCheckBig size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      cancelled: <CircleX size={iconSize} color={iconColor} strokeWidth={2} />,
    };

    const bgColor = isCancelled
      ? "rgba(220, 38, 38, 0.1)"
      : isCompleted
        ? "rgba(40, 167, 69, 0.1)"
        : "#F2F2F2";

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
        {iconMap[statusType]}
      </Box>
    );
  };

  const renderStatusList = (items: ProcessedStatus[], showConnector = true) => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;
      const textColor = item.isCancelled
        ? "#DC2626"
        : item.isCompleted
          ? "#28A745"
          : "#7F7F7F";

      return (
        <Box
          key={`${item.type}-${index}`}
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
            {getIcon(item.type, item.isCompleted, item.isCancelled)}

            {/* Vertical Line */}
            {!isLast && (
              <Box
                sx={{
                  width: 1.5,
                  height: 24,
                  bgcolor: "#D8D8D8",
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
                color: "#7F7F7F",
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
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            mb: 2,
            color: "#000",
          }}
        >
          Order Status
        </Typography>

        {/* Status Items - Show only first and last */}
        <Box sx={{ position: "relative" }}>
          {renderStatusList(displayedStatuses, processedStatuses.length <= 2)}
        </Box>

        {/* Estimated Delivery */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#666",
                mb: 0.5,
              }}
            >
              Estimated delivery of the order
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#000",
              }}
            >
              {estimatedDelivery}
            </Typography>
          </Box>

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
            Order Status Details
          </Typography>

          {/* All Status Items */}
          <Box sx={{ position: "relative" }}>
            {renderStatusList(processedStatuses)}
          </Box>

          {/* Estimated Delivery in Drawer */}
          <Box
            sx={{
              mt: 3,
              pt: 3,
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#666",
                mb: 0.5,
              }}
            >
              Estimated delivery of the order
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#000",
              }}
            >
              {estimatedDelivery}
            </Typography>
          </Box>
        </Box>
      </SwipeableDrawerWrapper>
    </>
  );
}
