"use client";

import {
  Box,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { CheckCircle, Loader, MailOpen, Inbox } from "lucide-react";
import React from "react";

interface ComplaintInformationDetailsProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  { label: "Finished", date: null, icon: CheckCircle, status: "inactive" },
  { label: "Processed", date: null, icon: Loader, status: "inactive" },
  {
    label: "Message Read",
    date: "07-07-2025 09:15",
    icon: MailOpen,
    status: "active",
  },
  {
    label: "Order received",
    date: "07-07-2025 09:10",
    icon: Inbox,
    status: "done",
  },
];

export default function ComplaintInformationDetails({
  open,
  onClose,
}: ComplaintInformationDetailsProps) {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      transitionDuration={{ enter: 400, exit: 300 }}
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
        <div className="mb-4">
          <p className="text-[16px] font-bold text-[#191919]">
            Complaint Information
          </p>
          <p className="text-[14px] text-[#4C4C4C]">
            Bayu Imam Fauzan | 0895632317128
          </p>
          <div className="border-b border-dashed border-[#D8D8D8] mt-2"></div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            // Define styles by status
            let iconColor = "text-gray-400";
            let textColor = "text-gray-400";
            let fontWeight: "bold" | "regular" = "regular";
            let borderColor = "border-gray-300 bg-gray-100";

            if (step.status === "active") {
              iconColor = "text-green-600";
              textColor = "text-green-600";
              fontWeight = "bold";
              borderColor = "border-green-500 bg-white";
            } else if (step.status === "done") {
              iconColor = "text-gray-400";
              textColor = "text-gray-600";
            }

            return (
              <div key={index} className="flex flex-row">
                {/* LEFT COLUMN: icon + line */}
                <div className="flex flex-col items-center w-6">
                  {/* Circle with icon */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full border ${borderColor}`}
                  >
                    <Icon size={16} className={iconColor} />
                  </div>

                  {/* Vertical line with fixed height */}
                  {!isLast && (
                    <div className="w-[2px] bg-gray-300 h-6 my-1"></div>
                  )}
                </div>

                {/* RIGHT COLUMN: text */}
                <div className="ml-2 flex flex-col pb-4">
                  <Typography
                    variant="body2"
                    fontWeight={fontWeight}
                    className={textColor}
                  >
                    {step.label}
                  </Typography>
                  {step.date && (
                    <Typography variant="caption" className="text-gray-500">
                      {step.date}
                    </Typography>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Box>
    </SwipeableDrawer>
  );
}
