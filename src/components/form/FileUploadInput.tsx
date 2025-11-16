"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Dialog,
} from "@mui/material";
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import ControllWrapper from "./FormControlWrapper";
import { useImageCompressor } from "@/libs/hooks/useImageCompressor";
import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";

interface FileUploadInputProps<T extends FieldValues> {
  name?: Path<T>;
  control?: Control<T, any, FieldValues>;
  label?: string;
  helperText?: string;
  maxFiles?: number;
  accept?: string;
  required?: boolean;
  enableCompression?: boolean;
}

const FileUploadInput = <T extends FieldValues>({
  name,
  control,
  label = "Upload Image",
  helperText,
  maxFiles = 3,
  accept = "image/*",
  required = false,
  enableCompression = true,
}: FileUploadInputProps<T>) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);
  const [errorMessageImage, setErrorMessageImage] = useState("");
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const { compressImages, isCompressing } = useImageCompressor();

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        try {
          URL.revokeObjectURL(preview);
        } catch (e) {
          // Ignore errors
        }
      });
    };
  }, [previews]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    currentFiles: FileList | null,
    onChange?: (value: FileList | null) => void
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Get existing files
    const existingFiles = currentFiles ? Array.from(currentFiles) : [];

    // Add new files
    let newFiles = Array.from(files);

    // Validate file size BEFORE compression (2MB per file)
    const maxSizeBytes = 2 * 1024 * 1024; // 2MB
    const oversizedFiles = newFiles.filter((file) => file.size > maxSizeBytes);

    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map((f) => f.name).join(", ");
      setErrorMessageImage(
        `The following file(s) exceed 2MB:\n${fileNames}\n\nPlease select smaller files.`
      );
      setErrorDrawerOpen(true);
      event.target.value = "";
      return;
    }

    // Compress images if enabled
    if (enableCompression) {
      try {
        newFiles = await compressImages(newFiles, {
          quality: 0.8,
          maxWidth: 1920,
          mimeType: "image/png",
          convertTypes: ["image/jpeg", "image/jpg", "image/webp"],
        });
      } catch (error) {
        console.error("Compression error:", error);
        setErrorMessageImage("Failed to compress images. Please try again.");
        setErrorDrawerOpen(true);
        event.target.value = "";
        return;
      }
    }

    const allFiles = [...existingFiles, ...newFiles];

    // Limit to maxFiles
    const limitedFiles = allFiles.slice(0, maxFiles);

    // Clean up old preview URLs
    previews.forEach((preview) => {
      try {
        URL.revokeObjectURL(preview);
      } catch (e) {
        // Ignore errors
      }
    });

    // Create preview URLs for all files
    const newPreviews = limitedFiles
      .map((file) => {
        try {
          return URL.createObjectURL(file);
        } catch (error) {
          console.error("Error creating object URL:", error);
          return "";
        }
      })
      .filter((url) => url !== "");

    setPreviews(newPreviews);

    // Create new FileList from limited files
    const dataTransfer = new DataTransfer();
    limitedFiles.forEach((file) => {
      try {
        dataTransfer.items.add(file);
      } catch (error) {
        console.error("Error adding file:", error);
      }
    });

    if (onChange) {
      onChange(dataTransfer.files.length > 0 ? dataTransfer.files : null);
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

    // Revoke the URL for the removed preview
    if (previews[index]) {
      try {
        URL.revokeObjectURL(previews[index]);
      } catch (e) {
        // Ignore errors
      }
    }

    // Remove preview
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);

    // Remove file from FileList
    const dataTransfer = new DataTransfer();
    Array.from(currentFiles).forEach((file, i) => {
      if (i !== index) {
        try {
          dataTransfer.items.add(file);
        } catch (error) {
          console.error("Error adding file:", error);
        }
      }
    });

    if (onChange) {
      onChange(dataTransfer.files.length > 0 ? dataTransfer.files : null);
    }
  };

  const renderInput = (
    value: FileList | null,
    onChange?: (value: FileList | null) => void,
    error?: boolean
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
        disabled={previews.length >= maxFiles || isCompressing}
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
        {isCompressing ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: "#9CA3AF" }} />
            Compressing images...
          </>
        ) : (
          <>
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
          </>
        )}
        <input
          type="file"
          hidden
          accept={accept}
          multiple={previews.length === 0}
          onChange={(e) => handleFileChange(e, value, onChange)}
          disabled={isCompressing}
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
      {/* {error && errorMessage && (
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
      )} */}

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
              onClick={() => setSelectedPreview(preview)}
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #E5E7EB",
                cursor: "pointer",
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index, value, onChange);
                }}
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

      {/* Error Drawer */}
      <SwipeableDrawerWrapper
        open={errorDrawerOpen}
        onClose={() => setErrorDrawerOpen(false)}
        onOpen={() => setErrorDrawerOpen(true)}
        maxHeight="auto"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            py: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={32} color="#EF4444" />
          </Box>

          <Box sx={{ textAlign: "center", px: 2 }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#191919",
                mb: 1,
              }}
            >
              File Size Limit Exceeded
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
                whiteSpace: "pre-line",
                wordBreak: "break-word",
              }}
            >
              {errorMessageImage}
            </Typography>
          </Box>

          <Button
            onClick={() => setErrorDrawerOpen(false)}
            fullWidth
            sx={{
              bgcolor: "#5B3C2E",
              color: "white",
              py: 1.5,
              borderRadius: 3,
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#4A2F23",
              },
            }}
          >
            Got it
          </Button>
        </Box>
      </SwipeableDrawerWrapper>

      {/* Image Preview Dialog (shows blob/object URLs as full preview) */}
      <Dialog
        open={selectedPreview !== null}
        onClose={() => setSelectedPreview(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => setSelectedPreview(null)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              zIndex: 1,
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <X size={24} />
          </IconButton>

          {selectedPreview && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={selectedPreview}
                alt="Preview"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );

  return control && name ? (
    <ControllWrapper<T>
      name={name}
      control={control}
      render={({ onChange, value, error }) =>
        renderInput(value as FileList | null, onChange, error)
      }
    />
  ) : (
    renderInput(null)
  );
};

export default FileUploadInput;
