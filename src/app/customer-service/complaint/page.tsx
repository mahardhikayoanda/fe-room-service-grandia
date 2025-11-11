"use client";

import BackHeader from "@/components/BackHeader";
import { useScrolled } from "@/libs/hooks/useScrolled";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import ComplaintRequestRoomInfo from "./_components/ComplaintRequestRoomInfo";
import ComplaintRequestStatus from "./_components/ComplaintRequestStatus";
import ComplaintRequestMainInfo from "./_components/ComplaintRequestMainInfo";
import { Box, Button, Divider } from "@mui/material";
import ComplaintRequestNumber from "./_components/ComplaintRequestNumber";
import BackNavigationConfirm from "@/app/food-beverage/cart/[order_uuid]/_components/BackNavigationConfirm";

export default function TrackingComplaintRequestPage() {
  const isScrolled = useScrolled(5);
  const router = useRouter();

  // Local state
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [showBackConfirm, setShowBackConfirm] = React.useState<boolean>(false);

  // Prevent browser back button
  React.useEffect(() => {
    // Push a dummy state to prevent back
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      // Prevent the default back action
      window.history.pushState(null, "", window.location.href);
      // Show confirmation dialog
      setShowBackConfirm(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Handlers
  const handleConfirmBack = () => {
    setShowBackConfirm(false);
    // Navigate to food-beverage page
    router.push("/");
  };

  const handleCancelBack = () => {
    setShowBackConfirm(false);
  };

  return (
    <div className="w-full min-h-screen relative min-w-sm">
      {/* Header */}
      <div
        className={`sticky top-0 z-10 flex flex-col gap-3 bg-white px-6 pt-4 pb-4 transition-shadow duration-150 ease-in-out ${isScrolled ? "shadow-md" : "shadow-none"}`}
      >
        <BackHeader
          title="Complaint/Request Submitted"
          subTitle="#25012421320"
          withoutBackButton
        />
      </div>

      {/* Content */}
      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          {/* Complaint Room Info */}
          <ComplaintRequestRoomInfo
            roomNumber={"120"}
            roomType={"Deluxe Suite"}
            floor={"3rd floor"}
          />

          {/* Complaint Information */}
          <ComplaintRequestMainInfo
            remark={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
            imageList={[
              {
                uuid: "1",
                src: "/images/customer_service/pict-cs.png",
              },
              {
                uuid: "2",
                src: "/images/customer_service/pict-cs.png",
              },
              {
                uuid: "3",
                src: "/images/customer_service/pict-cs.png",
              },
            ]}
          />

          <Divider
            sx={{
              my: 2,
              borderColor: "#E0E0E0",
            }}
          />

          {/* Complaint Request Status */}
          <ComplaintRequestStatus
            statusItems={[
              {
                id: "1",
                title: "Order Received",
                timestamp: "07-07-2025 09:15",
                isCompleted: true,
                icon: "order_received",
              },
              {
                id: "2",
                title: "Message Read",
                timestamp: "07-07-2025 09:10",
                isCompleted: true,
                icon: "message_read",
              },
              {
                id: "3",
                title: "Processed",
                timestamp: "07-07-2025 09:15",
                isCompleted: false,
                icon: "processed",
              },
              {
                id: "4",
                title: "Finished",
                timestamp: "07-07-2025 09:15",
                isCompleted: false,
                icon: "finished",
              },
            ]}
            estimatedDelivery="10:58 PM"
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          {/* Complaint Request Number */}
          <ComplaintRequestNumber
            ComplaintRequestNumber="#25012421320"
            orderTime="07-07-2025 09:15"
          />
        </div>
      </section>

      {/* Return to Main Menu Button */}
      <Box sx={{ mb: 3, mt: 2, px: 2 }}>
        <Button
          fullWidth
          onClick={() => setShowBackConfirm(true)}
          sx={{
            bgcolor: "transparent",
            color: "#4F3534",
            py: 1,
            borderRadius: 8,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            border: "1px solid #4F3534",
            "&:hover": {
              bgcolor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
          }}
        >
          Return to the main menu
        </Button>
      </Box>

      {/* Back Navigation Confirmation */}
      <BackNavigationConfirm
        open={showBackConfirm}
        onClose={handleCancelBack}
        onConfirm={handleConfirmBack}
      />
    </div>
  );
}
