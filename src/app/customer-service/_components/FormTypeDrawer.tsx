"use client";

import React from "react";
import {
  SwipeableDrawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Check } from "lucide-react";

interface FormTypeDrawerProps {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const formTypes = [
  {
    value: "Complaint",
    label: "Complaint",
    description: "Report an issue with our service or facilities",
  },
  {
    value: "Request",
    label: "Request",
    description: "Ask for additional service or assistance",
  },
];

export default function FormTypeDrawer({
  value,
  onChange,
  open,
  onClose,
  onOpen,
}: FormTypeDrawerProps) {
  const handleSelect = (newValue: string) => {
    onChange(newValue);
    onClose();
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: "50vh",
        },
      }}
    >
      <Box sx={{ px: 3, py: 2 }}>
        {/* Drag indicator */}
        <Box
          sx={{
            width: 40,
            height: 4,
            backgroundColor: "#D1D5DB",
            borderRadius: 2,
            mx: "auto",
            mb: 2,
          }}
        />

        {/* Title */}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#191919",
            mb: 2,
          }}
        >
          Select form type
        </Typography>

        {/* Divider */}
        <Box
          sx={{
            borderBottom: "1px solid #E5E7EB",
            mb: 2,
          }}
        />

        {/* List Options */}
        <List sx={{ p: 0 }}>
          {formTypes.map((type, index) => (
            <React.Fragment key={type.value}>
              <ListItem
                disablePadding
                sx={{
                  py: 1.5,
                }}
              >
                <ListItemButton
                  onClick={() => handleSelect(type.value)}
                  sx={{
                    py: 0,
                    px: 0,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  <Box
                    sx={{
                      mt: 0.5,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border:
                        value === type.value
                          ? "6px solid #5B3C2E"
                          : "2px solid #D1D5DB",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#191919",
                        mb: 0.5,
                      }}
                    >
                      {type.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#6B7280",
                      }}
                    >
                      {type.description}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              {index < formTypes.length - 1 && (
                <Box
                  sx={{
                    borderBottom: "1px solid #F3F4F6",
                    my: 1,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
