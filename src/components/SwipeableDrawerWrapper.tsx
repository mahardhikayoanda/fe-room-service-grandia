import { Box, SwipeableDrawer, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface SwipeableDrawerWrapperProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: ReactNode;
  anchor?: "top" | "bottom" | "left" | "right";
  disableSwipeToOpen?: boolean;
  maxWidth?: string | number;
  maxHeight?: string | number;
  borderRadius?: number;
  showHandle?: boolean;
  paperSx?: SxProps<Theme>;
}

export default function SwipeableDrawerWrapper({
  open,
  onClose,
  onOpen,
  children,
  anchor = "bottom",
  disableSwipeToOpen = false,
  maxWidth = "640px",
  maxHeight = "80vh",
  borderRadius = 20,
  showHandle = true,
  paperSx,
}: SwipeableDrawerWrapperProps) {
  const defaultPaperSx: SxProps<Theme> = {
    ...(anchor === "bottom" && {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    }),
    ...(anchor === "top" && {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    }),
    ...(anchor === "left" && {
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    }),
    ...(anchor === "right" && {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    }),
    maxHeight: maxHeight,
    maxWidth: maxWidth,
    marginLeft: "auto",
    marginRight: "auto",
    ...paperSx,
  };

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen={disableSwipeToOpen}
      PaperProps={{
        sx: defaultPaperSx,
      }}
    >
      <Box sx={{ width: "auto", p: 2 }}>
        {/* Handle bar */}
        {showHandle && (
          <Box
            sx={{
              width: 40,
              height: 4,
              backgroundColor: "grey.300",
              borderRadius: 2,
              mx: "auto",
              mb: 2,
            }}
          />
        )}

        {/* Content */}
        {children}
      </Box>
    </SwipeableDrawer>
  );
}
