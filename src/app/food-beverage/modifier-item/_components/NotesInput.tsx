"use client";

import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import { MessageSquare } from "lucide-react";

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NotesInput({ value, onChange }: NotesInputProps) {
  return (
    <Box className="py-4 px-6 bg-white mt-2">
      <Typography
        variant="subtitle1"
        className="font-semibold text-gray-800 mb-1 flex items-center gap-2"
      >
        Notes{" "}
        <Typography
          component="span"
          className="text-gray-500 text-sm font-normal"
        >
          (Optional)
        </Typography>
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="Example: Add more, allergy..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "#F9FAFB",
            "& fieldset": {
              borderColor: "#E5E7EB",
            },
            "&:hover fieldset": {
              borderColor: "#D1D5DB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7C3AED",
            },
          },
        }}
      />
    </Box>
  );
}
