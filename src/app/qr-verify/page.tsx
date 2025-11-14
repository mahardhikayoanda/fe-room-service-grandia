"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { MapPin, CheckCircle, AlertCircle, QrCode } from "lucide-react";
import {
  getUserLocation,
  isWithinHotelRadius,
  saveQRString,
  saveRoomData,
  HOTEL_LOCATION,
  MAX_DISTANCE_KM,
} from "@/utils/geolocation";
import useCreateRoomLogin from "@/services/room/useCreateRoomLogin";
import { useRoom } from "@/providers/RoomProvider";
import { refreshQRCache } from "@/libs/react-query/service/fetchHelper";
import { IsCheckRadius } from "@/constants";

type VerificationStep = "loading" | "checking" | "success" | "error";

type ErrorType = "qr_invalid" | "qr_missing" | "location_failed" | "general";

interface VerificationState {
  step: VerificationStep;
  message: string;
  error?: string;
  errorType?: ErrorType;
}

export default function QRVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setRoomData } = useRoom();
  const [state, setState] = useState<VerificationState>({
    step: "loading",
    message: "Initializing verification...",
  });

  const { mutate: verifyRoomQR, isPending } = useCreateRoomLogin();

  useEffect(() => {
    verifyAccess();
  }, []);

  const verifyAccess = async () => {
    try {
      // Step 1: Check QR parameter
      setState({
        step: "checking",
        message: "Validating QR code...",
      });

      const qrString = searchParams.get("qr_params");
      if (!qrString) {
        setState({
          step: "error",
          message: "Invalid QR Code",
          error:
            "QR code parameter is missing. Please scan the QR code from your room.",
          errorType: "qr_missing",
        });
        return;
      }

      // Step 2: Check geolocation (only if IsCheckRadius is true)
      if (IsCheckRadius) {
        setState({
          step: "checking",
          message: "Checking your location...",
        });

        const coords = await getUserLocation();
        const withinRadius = isWithinHotelRadius(
          coords.latitude,
          coords.longitude
        );

        if (!withinRadius) {
          setState({
            step: "error",
            message: "Location Verification Failed",
            error: `You must be within ${MAX_DISTANCE_KM} kilometers radius of Hotel Grandia to access this service. Please make sure you are at the hotel premises.`,
            errorType: "location_failed",
          });
          return;
        }
      } else {
        console.log("⏭️ Radius check skipped (IsCheckRadius = false)");
      }

      // Step 3: Verify QR with backend
      setState({
        step: "checking",
        message: "Verifying room access with server...",
      });

      verifyRoomQR(
        { qr_string: qrString },
        {
          onSuccess: (response) => {
            // Save QR string and room data
            saveQRString(qrString);
            saveRoomData(response.data);
            setRoomData(response.data);

            // Refresh QR cache immediately for API calls
            refreshQRCache();

            setState({
              step: "success",
              message: "Verification Successful!",
            });

            // Redirect to home after 2 seconds
            setTimeout(() => {
              router.push("/");
            }, 2000);
          },
          onError: (error: any) => {
            console.error("Room verification error:", error);

            let errorMessage =
              "Failed to verify room QR code. The QR code may be invalid or expired.";
            let errorTitle = "Room Verification Failed";

            // Check if error response has the specific format from BE
            if (error?.response?.data) {
              const responseData = error.response.data;

              // Handle error message that is an object with validation errors
              if (
                typeof responseData.message === "object" &&
                responseData.message !== null
              ) {
                // Extract qr_string error message
                if (responseData.message.qr_string) {
                  errorMessage = Array.isArray(responseData.message.qr_string)
                    ? responseData.message.qr_string[0]
                    : responseData.message.qr_string;
                  errorTitle = "Invalid QR Code";
                }
              } else if (typeof responseData.message === "string") {
                errorMessage = responseData.message;
              }
            }

            setState({
              step: "error",
              message: errorTitle,
              error: errorMessage,
              errorType: "qr_invalid",
            });
          },
        }
      );
    } catch (error: any) {
      console.error("Verification error:", error);

      let errorMessage = "Unable to verify your location.";
      let errorDetails = "";

      if (error.code === 1) {
        errorMessage =
          "Location permission denied. Please enable location access in your browser settings to use this service.";
        errorDetails =
          "Go to your browser settings → Site permissions → Location → Allow";
      } else if (error.code === 2) {
        errorMessage =
          "Unable to determine your location. Please check your device's location settings.";
        errorDetails = "Make sure GPS is enabled on your device";
      } else if (error.code === 3) {
        errorMessage = "Location request timed out. Please try again.";
        errorDetails = "This might happen if GPS signal is weak";
      } else if (error.message?.includes("secure")) {
        errorMessage =
          "Geolocation requires HTTPS connection. This page must be accessed via HTTPS.";
        errorDetails = "Current protocol: " + window.location.protocol;
      }

      // Log detailed error for debugging
      console.log("=== GEOLOCATION ERROR DEBUG ===");
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);
      console.log("Protocol:", window.location.protocol);
      console.log("Is HTTPS:", window.location.protocol === "https:");
      console.log("User Agent:", navigator.userAgent);
      console.log("==============================");

      setState({
        step: "error",
        message: "Verification Failed",
        error: `${errorMessage}${errorDetails ? `\n\n${errorDetails}` : ""}`,
        errorType: "general",
      });
    }
  };

  const handleRetry = () => {
    setState({
      step: "loading",
      message: "Initializing verification...",
    });
    verifyAccess();
  };

  const handleCloseTab = () => {
    // Try to close the current tab/window
    window.close();

    // If window.close() doesn't work (some browsers block it),
    // try to go back or redirect to a safe page
    setTimeout(() => {
      // If we're still here, the tab didn't close
      // Try to go back in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // As a last resort, redirect to a blank page
        window.location.href = "about:blank";
      }
    }, 100);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F9FAFB",
        px: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          bgcolor: "white",
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          {state.step === "loading" || state.step === "checking" ? (
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={40} />
            </Box>
          ) : state.step === "success" ? (
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#D1FAE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={48} color="#10B981" />
            </Box>
          ) : (
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertCircle size={48} color="#EF4444" />
            </Box>
          )}
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
            mb: 1,
          }}
        >
          {state.message}
        </Typography>

        {/* Description */}
        {state.step === "loading" || state.step === "checking" ? (
          <Typography
            sx={{
              fontSize: "14px",
              color: "#6B7280",
              mb: 3,
            }}
          >
            Please wait while we verify your QR code and location...
          </Typography>
        ) : state.step === "success" ? (
          <>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
                mb: 2,
              }}
            >
              Your access has been verified. Redirecting to home page...
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "#10B981",
                fontSize: "14px",
              }}
            >
              <MapPin size={16} />
              <Typography sx={{ fontSize: "14px" }}>
                Within Hotel Grandia premises
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#EF4444",
                mb: 1,
                whiteSpace: "pre-line",
              }}
            >
              {state.error}
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",
                color: "#6B7280",
                mb: 3,
              }}
            >
              Please contact the front desk for further assistance.
            </Typography>

            {/* Additional help for HTTPS issue */}
            {state.error?.includes("HTTPS") && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: "#FFF4ED",
                  borderRadius: 2,
                  border: "1px solid #FED7AA",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#9A3412",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Secure Connection Required
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#9A3412",
                  }}
                >
                  Location access requires a secure HTTPS connection. Please
                  make sure you're accessing this page via HTTPS.
                </Typography>
              </Box>
            )}

            <Button
              onClick={
                state.errorType === "location_failed"
                  ? handleRetry
                  : handleCloseTab
              }
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#5B3C2E",
                color: "white",
                py: 1,
                borderRadius: 3,
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#4A2F23",
                },
              }}
            >
              {state.errorType === "location_failed" ? "Try Again" : "Close"}
            </Button>
          </>
        )}

        {/* Info */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <QrCode size={20} color="#6B7280" />
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#6B7280",
              }}
            >
              QR Verification Required
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#9CA3AF",
              lineHeight: 1.5,
            }}
          >
            For security purposes, you must scan the QR code from your hotel
            room and be within close proximity of Hotel Grandia to access room
            service.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
