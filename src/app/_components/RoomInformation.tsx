import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";
import { Box, Divider, Typography } from "@mui/material";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useRoom } from "@/providers/RoomProvider";
import { getQRString } from "@/utils/geolocation";
import useCreateRoomLogin from "@/services/room/useCreateRoomLogin";

export default function RoomInformation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { roomData, setRoomData } = useRoom();
  const cachedQRString = getQRString();

  const { mutate: verifyRoomQR, isPending } = useCreateRoomLogin();

  useEffect(() => {
    reloadRoom();
  }, []);

  const reloadRoom = async () => {
    if (cachedQRString) {
      verifyRoomQR(
        { qr_string: cachedQRString },
        {
          onSuccess: (data) => {
            console.log("Room verified successfully:", data);
            setRoomData(data.data);
          },
          onError: (error) => {
            console.error("Error verifying room QR:", error);
          },
        }
      );
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Room Information Trigger */}
      <div
        className="w-full flex justify-between items-center border border-gray-300 rounded-t-4xl px-4 py-6 bg-white shadow-md"
        onClick={handleDrawerOpen}
      >
        <Typography variant="body2" fontWeight="bold" color="textDisabled">
          ROOM INFORMATION
        </Typography>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="primary"
          className="cursor-pointer"
        >
          SHOW DETAILS
        </Typography>
      </div>

      {/* SwipeableDrawer Component */}
      <SwipeableDrawerWrapper
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" fontWeight="bold" color="textDisabled">
            ROOM INFORMATION
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            color="primary"
            onClick={handleDrawerClose}
            className="cursor-pointer"
          >
            HIDE
          </Typography>
        </Box>

        <Divider sx={{ mb: 1 }} />

        {/* Room Details */}
        <div className="flex gap-2">
          <div className="p-2 bg-secondary rounded-full">
            <Home size={20} className="text-primary" />
          </div>
          <div className="flex flex-col">
            <Typography
              variant="body1"
              fontWeight="bold"
              className="text-primary"
            >
              Room {roomData?.room_number || "-"}
            </Typography>

            <Typography
              variant="body2"
              fontWeight="semibold"
              className="text-custom-gray-500"
            >
              {roomData?.room_type?.name || "Loading..."} -{" "}
              {roomData?.location || ""}
            </Typography>
          </div>
        </div>
      </SwipeableDrawerWrapper>
    </>
  );
}
