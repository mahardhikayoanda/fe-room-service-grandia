"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import ControllWrapper from "./FormControlWrapper";

interface SelectInputProps<T extends FieldValues> {
  name?: Path<T>;
  control?: Control<T, any, FieldValues>;
  label?: string;
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  required?: boolean;
  startIcon?: React.ReactNode;
}

const SelectInput = <T extends FieldValues>({
  name,
  control,
  label = "",
  placeholder = "Select an option",
  value,
  onClick,
  required = false,
  startIcon,
}: SelectInputProps<T>) => {
  const renderInput = (
    inputValue: string,
    error?: boolean,
    errorMessage?: string
  ) => (
    <Box>
      {/* Label */}
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#7F7F7F",
            mb: 1,
          }}
        >
          {label}
          {required && (
            <Typography
              component="span"
              sx={{
                color: "#EF4444",
                ml: 0.5,
              }}
            >
              *
            </Typography>
          )}
        </Typography>
      )}

      {/* Select Box */}
      <Box
        onClick={onClick}
        sx={{
          bgcolor: "#FAFAFA",
          px: 2,
          py: 1.5,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          border: error ? "1px solid #EF4444" : "1px solid transparent",
          "&:hover": {
            bgcolor: "#F3F4F6",
          },
        }}
      >
        {startIcon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#7F7F7F",
            }}
          >
            {startIcon}
          </Box>
        )}
        <Typography
          sx={{
            fontSize: "14px",
            color: inputValue ? "#191919" : "#B2B2B2",
            flex: 1,
          }}
        >
          {inputValue || placeholder}
        </Typography>
        <ChevronDown size={20} color="#7F7F7F" />
      </Box>

      {/* Error Message */}
      {error && errorMessage && (
        <Typography
          sx={{
            fontSize: "12px",
            color: "#EF4444",
            mt: 0.5,
            ml: 1.5,
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );

  return control && name ? (
    <ControllWrapper<T>
      name={name}
      control={control}
      render={({ value: inputValue, error, helperText: errorMessage }) =>
        renderInput(inputValue as string, error, errorMessage)
      }
    />
  ) : (
    renderInput(value || "")
  );
};

export default SelectInput;
