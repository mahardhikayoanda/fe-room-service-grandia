import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";
import {
  Box,
  Card,
  CardContent,
  Divider,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Home } from "lucide-react";
import { useState } from "react";

export default function RoomInformation() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
              Room 120
            </Typography>

            <Typography
              variant="body2"
              fontWeight="semibold"
              className="text-custom-gray-500"
            >
              Deluxe Suite - 3rd floor
            </Typography>
          </div>
        </div>
      </SwipeableDrawerWrapper>
    </>
  );
}
