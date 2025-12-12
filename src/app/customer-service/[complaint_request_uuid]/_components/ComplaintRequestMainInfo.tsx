"use client";

import { Box, Typography, IconButton, Dialog } from "@mui/material";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

interface imageProps {
  photo: {
    uuid: string;
    src: string;
  };
}

interface ComplaintRequestMainInfoProps {
  remark?: string;
  imageList?: imageProps[];
}

export default function ComplaintRequestMainInfo({
  remark,
  imageList,
}: ComplaintRequestMainInfoProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Box sx={{ mt: 2, width: "100%" }}>
        {/* Image Gallery */}
        {imageList && imageList.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mb: 2,
              width: "100%",
            }}
          >
            {imageList.map((image) => (
              <Box
                key={image.photo?.uuid || ""}
                onClick={() => handleImageClick(image.photo?.src || "")}
                sx={{
                  position: "relative",
                  flex: 1,
                  aspectRatio: "1 / 1",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid #E5E7EB",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Image
                  src={image.photo?.src || ""}
                  alt={`Complaint image ${image.photo?.uuid || ""}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 33vw, 150px"
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Remark Text */}
        {remark && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#374151",
                lineHeight: 1.6,
              }}
            >
              {remark}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Image Preview Dialog */}
      <Dialog
        open={selectedImage !== null}
        onClose={handleCloseDialog}
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
          {/* Close Button */}
          <IconButton
            onClick={handleCloseDialog}
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

          {/* Image */}
          {selectedImage && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}
