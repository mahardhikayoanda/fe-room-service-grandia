"use client";

import { Box, Button, Typography } from "@mui/material";
import {
  CheckCircle2,
  Package,
  ChevronDown,
  Clock,
  ChefHat,
  Truck,
} from "lucide-react";
import { useState } from "react";
import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";

interface OrderStatusItem {
  id: string;
  title: string;
  timestamp: string;
  isCompleted: boolean;
  icon:
    | "waiting"
    | "received"
    | "confirmed"
    | "prepared"
    | "delivery"
    | "delivered";
}

interface OrderStatusProps {
  statusItems: OrderStatusItem[];
  estimatedDelivery: string;
}

export default function OrderStatus({
  statusItems,
  estimatedDelivery,
}: OrderStatusProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Show only first and last status on main page
  const displayedStatuses =
    statusItems.length > 2
      ? [statusItems[0], statusItems[statusItems.length - 1]]
      : statusItems;

  const getIcon = (
    iconType:
      | "waiting"
      | "received"
      | "confirmed"
      | "prepared"
      | "delivery"
      | "delivered",
    isCompleted: boolean
  ) => {
    const iconSize = 20;
    const iconColor = isCompleted ? "#28A745" : "#7F7F7F";

    const iconMap = {
      waiting: <Clock size={iconSize} color={iconColor} strokeWidth={2} />,
      received: <Package size={iconSize} color={iconColor} strokeWidth={2} />,
      confirmed: (
        <CheckCircle2 size={iconSize} color={iconColor} strokeWidth={2} />
      ),
      prepared: <ChefHat size={iconSize} color={iconColor} strokeWidth={2} />,
      delivery: <Truck size={iconSize} color={iconColor} strokeWidth={2} />,
      delivered: (
        <CheckCircle2 size={iconSize} color={iconColor} strokeWidth={2} />
      ),
    };

    return (
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          bgcolor: isCompleted ? "rgba(40, 167, 69, 0.1)" : "#F2F2F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {iconMap[iconType]}
      </Box>
    );
  };

  const renderStatusList = (items: OrderStatusItem[], showConnector = true) => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;

      return (
        <Box
          key={item.id}
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
            {getIcon(item.icon, item.isCompleted)}

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
                color: item.isCompleted ? "#28A745" : "#7F7F7F",
                mb: 0.5,
              }}
            >
              {item.title}
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
          {renderStatusList(displayedStatuses, statusItems.length <= 2)}
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
            {renderStatusList(statusItems)}
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
