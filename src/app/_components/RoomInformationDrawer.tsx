import {
  Box,
  Card,
  CardContent,
  Divider,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function RoomInformationDrawer() {
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
        className="flex justify-between items-center border border-gray-300 rounded-t-4xl px-4 py-6 bg-white shadow-md"
        onClick={handleDrawerOpen}
      >
        <Typography variant="body2" fontWeight="bold" color="textDisabled">
          ROOM INFORMATION
        </Typography>
        <Typography variant="body2" fontWeight="semibold" color="primary">
          SHOW DETAILS
        </Typography>
      </div>

      {/* SwipeableDrawer Component */}
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        disableSwipeToOpen={false}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "80vh",
          },
        }}
      >
        <Box sx={{ width: "auto", p: 2 }}>
          {/* Handle bar */}
          <Box
            sx={{
              width: 40,
              height: 4,
              backgroundColor: "grey.300",
              borderRadius: 2,
              mx: "auto",
              mb: 1,
            }}
          />

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
            <Typography variant="body2" fontWeight="semibold" color="primary">
              Hide
            </Typography>
          </Box>

          <Divider sx={{ mb: 1 }} />

          {/* Room Details */}
          <Card sx={{ mb: 0.5, boxShadow: 0 }}>
            <CardContent>
              <Typography variant="body2" fontWeight="semibold">
                Lorem ipsum
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
