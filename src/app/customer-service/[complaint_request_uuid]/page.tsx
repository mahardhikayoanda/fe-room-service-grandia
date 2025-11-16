"use client";

import BackHeader from "@/components/BackHeader";
import { useScrolled } from "@/libs/hooks/useScrolled";
import { useRouter } from "nextjs-toploader/app";
import React, { use } from "react";
import ComplaintRequestRoomInfo from "./_components/ComplaintRequestRoomInfo";
import ComplaintRequestStatus from "./_components/ComplaintRequestStatus";
import ComplaintRequestMainInfo from "./_components/ComplaintRequestMainInfo";
import { Box, Button, Divider } from "@mui/material";
import ComplaintRequestNumber from "./_components/ComplaintRequestNumber";
import BackNavigationConfirm from "@/app/food-beverage/cart/[order_uuid]/_components/BackNavigationConfirm";
import useGetComplaintRequest from "@/services/customer-service/useGetRequestComplain";

export default function TrackingComplaintRequestPage({
  params,
}: {
  params: Promise<{ complaint_request_uuid: string }>;
}) {
  const { complaint_request_uuid } = use(params);
  const isScrolled = useScrolled(5);
  const router = useRouter();

  const { data, isLoading } = useGetComplaintRequest(complaint_request_uuid);

  // Local state
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
          title="Complaint or Request Submitted"
          subTitle={data?.report_number || "----"}
          withoutBackButton
        />
      </div>

      {/* Content */}
      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          {/* Complaint Room Info */}
          <ComplaintRequestRoomInfo
            nameUser={data?.name || "----"}
            phoneUser={data?.phone_number || "----"}
            roomNumber={data?.room?.room_number || "----"}
            roomType={data?.room?.room_type?.name || "----"}
            floor={data?.room?.location || "----"}
          />

          {/* Complaint Information */}
          <ComplaintRequestMainInfo
            remark={data?.remark || "No additional information provided."}
            imageList={(data?.car_images || []).map((item) => ({
              photo: {
                uuid: (item.photo as any)?.uuid ?? "",
                src:
                  (item.photo as any)?.src ??
                  (item.photo as any)?.url ??
                  `/api/files/${(item.photo as any)?.uuid ?? ""}`,
              },
            }))}
          />

          <Divider
            sx={{
              my: 2,
              borderColor: "#E0E0E0",
            }}
          />

          {/* Complaint Request Status */}
          <ComplaintRequestStatus
            statusTrackers={data?.car_status_trackers || []}
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          {/* Complaint Request Number */}
          <ComplaintRequestNumber
            ComplaintRequestNumber={data?.report_number || "----"}
            ComplaintRequestTime={data?.created_at || "----"}
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
            color: "#191919",
            py: 1,
            borderRadius: 8,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            border: "1px solid #4F3534",
            "&:hover": {
              color: "#FFFFFF",
              fontWeight: 500,
              bgcolor: "#4F3534",
              borderColor: "#4F3534",
            },
          }}
        >
          Return to the main menu
        </Button>
      </Box>

      {/* Back Navigation Confirmation */}
      <BackNavigationConfirm
        title="Are you sure you want to leave this page?"
        description="You can still check your complaint or request status from the WhatsApp link we've sent."
        open={showBackConfirm}
        onClose={handleCancelBack}
        onConfirm={handleConfirmBack}
      />
    </div>
  );
}
