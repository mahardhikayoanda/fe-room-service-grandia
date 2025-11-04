"use client";

import React, { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { Upload, X, ImageIcon } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import ControllWrapper from "./FormControlWrapper";

interface FileUploadInputProps<T extends FieldValues> {
  name?: Path<T>;
  control?: Control<T, any, FieldValues>;
  label?: string;
  helperText?: string;
  maxFiles?: number;
  accept?: string;
  required?: boolean;
}

const FileUploadInput = <T extends FieldValues>({
  name,
  control,
  label = "Upload Image",
  helperText,
  maxFiles = 3,
  accept = "image/*",
  required = false,
}: FileUploadInputProps<T>) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentFiles: FileList | null,
    onChange?: (value: FileList | null) => void
  ) => {
    const files = event.target.files;
    if (!files) return;

    // Get existing files
    const existingFiles = currentFiles ? Array.from(currentFiles) : [];

    // Add new files
    const newFiles = Array.from(files);
    const allFiles = [...existingFiles, ...newFiles];

    // Limit to maxFiles
    const limitedFiles = allFiles.slice(0, maxFiles);

    // Create preview URLs for all files
    const newPreviews = limitedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Create new FileList from limited files
    const dataTransfer = new DataTransfer();
    limitedFiles.forEach((file) => dataTransfer.items.add(file));

    if (onChange) {
      onChange(dataTransfer.files);
    }

    // Reset input value to allow selecting the same file again
    event.target.value = "";
  };

  const handleRemoveFile = (
    index: number,
    currentFiles: FileList | null,
    onChange?: (value: FileList | null) => void
  ) => {
    if (!currentFiles) return;

    // Remove preview
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);

    // Remove file from FileList
    const dataTransfer = new DataTransfer();
    Array.from(currentFiles).forEach((file, i) => {
      if (i !== index) {
        dataTransfer.items.add(file);
      }
    });

    if (onChange) {
      onChange(dataTransfer.files.length > 0 ? dataTransfer.files : null);
    }
  };

  const renderInput = (
    value: FileList | null,
    onChange?: (value: FileList | null) => void,
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
            color: "#374151",
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

      {/* Upload Button */}
      <Button
        component="label"
        fullWidth
        disabled={previews.length >= maxFiles}
        sx={{
          bgcolor: "#FAFAFA",
          color: "#374151",
          py: 1.5,
          px: 2,
          borderRadius: 3,
          fontSize: "14px",
          fontWeight: 500,
          textTransform: "none",
          border: error ? "1px solid #EF4444" : "1px solid #E5E7EB",
          justifyContent: "flex-start",
          "&:hover": {
            bgcolor: previews.length >= maxFiles ? "#FAFAFA" : "#F3F4F6",
            borderColor: error ? "#EF4444" : "#D1D5DB",
          },
          "&.Mui-disabled": {
            bgcolor: "#F5F5F5",
            color: "#9CA3AF",
            border: "1px solid #E5E7EB",
          },
        }}
      >
        <Upload size={20} style={{ marginRight: 8 }} />
        {previews.length >= maxFiles
          ? `Maximum ${maxFiles} images uploaded`
          : `Upload up to ${maxFiles} images`}
        {previews.length < maxFiles && (
          <Box
            component="span"
            sx={{
              ml: "auto",
              color: "#9CA3AF",
              fontSize: "14px",
            }}
          >
            Choose file
          </Box>
        )}
        <input
          type="file"
          hidden
          accept={accept}
          multiple={previews.length === 0}
          onChange={(e) => handleFileChange(e, value, onChange)}
        />
      </Button>

      {/* Helper Text */}
      {helperText && !error && (
        <Typography
          sx={{
            fontSize: "12px",
            color: "#6B7280",
            mt: 0.5,
            ml: 1.5,
          }}
        >
          {helperText}
        </Typography>
      )}

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

      {/* File Previews */}
      {previews.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
          }}
        >
          {previews.map((preview, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #E5E7EB",
              }}
            >
              <Box
                component="img"
                src={preview}
                alt={`Preview ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <IconButton
                onClick={() => handleRemoveFile(index, value, onChange)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  width: 24,
                  height: 24,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.8)",
                  },
                }}
              >
                <X size={16} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );

  return control && name ? (
    <ControllWrapper<T>
      name={name}
      control={control}
      render={({ onChange, value, error, helperText: errorMessage }) =>
        renderInput(value as FileList | null, onChange, error, errorMessage)
      }
    />
  ) : (
    renderInput(null)
  );
};

export default FileUploadInput;
