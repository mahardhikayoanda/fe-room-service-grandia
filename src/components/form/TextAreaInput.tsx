"use client";

import React from "react";
import { Box, FormHelperText } from "@mui/material";
import type { Control, FieldValues, Path } from "react-hook-form";
import ControllWrapper from "./FormControlWrapper";

interface TextAreaInputProps<T extends FieldValues> {
  name?: Path<T>;
  control?: Control<T, any, FieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  helperText?: string;
}

const TextAreaInput = <T extends FieldValues>({
  name,
  control,
  label = "",
  placeholder = "",
  required = false,
  rows = 5,
  helperText,
}: TextAreaInputProps<T>) => {
  const containerStyles = {
    backgroundColor: "#FAFAFA",
    borderRadius: "12px",
    padding: "12px 16px",
    border: "1px solid transparent",
    "&:hover": {
      borderColor: "transparent",
    },
    "&:focus-within": {
      borderColor: "#9CA3AF",
    },
  };

  const errorContainerStyles = {
    borderColor: "#EF4444",
    "&:hover": {
      borderColor: "#EF4444",
    },
    "&:focus-within": {
      borderColor: "#EF4444",
    },
  };

  const labelStyles = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#7F7F7F",
    marginBottom: "4px",
    display: "block",
  };

  const textareaStyles = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    color: "#191919",
    fontFamily: "inherit",
    padding: 0,
    "&::placeholder": {
      color: "#B2B2B2",
    },
  };

  return control && name ? (
    <ControllWrapper<T>
      name={name}
      control={control}
      render={({ onChange, value, error, helperText: errorMessage }) => (
        <Box>
          <Box
            sx={{
              ...containerStyles,
              ...(error && errorContainerStyles),
            }}
          >
            {label && (
              <Box component="label" sx={labelStyles}>
                {label}
                {required && (
                  <Box
                    component="span"
                    sx={{
                      color: "#EF4444",
                      marginLeft: "4px",
                    }}
                  >
                    *
                  </Box>
                )}
              </Box>
            )}
            <Box
              component="textarea"
              value={value || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(e.target.value)
              }
              placeholder={placeholder}
              rows={rows}
              sx={textareaStyles}
            />
          </Box>
          {error && errorMessage ? (
            <FormHelperText
              sx={{
                marginLeft: "12px",
                fontSize: "12px",
                color: "#EF4444",
                marginTop: "4px",
              }}
            >
              {errorMessage}
            </FormHelperText>
          ) : (
            helperText && (
              <FormHelperText
                sx={{
                  marginLeft: "12px",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                {helperText}
              </FormHelperText>
            )
          )}
        </Box>
      )}
    />
  ) : (
    <Box>
      <Box sx={containerStyles}>
        {label && (
          <Box component="label" sx={labelStyles}>
            {label}
            {required && (
              <Box
                component="span"
                sx={{
                  color: "#EF4444",
                  marginLeft: "4px",
                }}
              >
                *
              </Box>
            )}
          </Box>
        )}
        <Box
          component="textarea"
          placeholder={placeholder}
          rows={rows}
          sx={textareaStyles}
        />
      </Box>
      {helperText && (
        <FormHelperText
          sx={{
            marginLeft: "12px",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default TextAreaInput;
