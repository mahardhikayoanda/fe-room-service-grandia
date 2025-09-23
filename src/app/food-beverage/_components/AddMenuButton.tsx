"use client";

import {
  Typography,
  Button,
  IconButton,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddMenuButton() {
  const [count, setCount] = useState(0);
  const [request, setRequest] = useState("");
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsRequestOpen(true)}
        variant="outlined"
        sx={{
          width: "90px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          py: 0.5,
          borderRadius: "9999px",
          textTransform: "none",
          borderColor: "#4F3534",
          "&:hover": { backgroundColor: "grey.100" },
        }}
      >
        {count < 0 && <Plus size={12} strokeWidth={3} color="#4F3534" />}
        <Typography
          sx={{
            fontWeight: 700,
            color: "#4F3534",
            fontSize: "12px",
          }}
        >
          {count ? `${count} Item${count > 1 ? "s" : ""}` : "Add item"}
        </Typography>
      </Button>

      <Modal open={isRequestOpen} onClose={() => setIsRequestOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 390,
            bgcolor: "background.paper",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
            boxShadow: 3,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Request
          </Typography>
          <TextField
            multiline
            minRows={3}
            fullWidth
            placeholder="Enter Request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setCount(count + 1);
              setIsRequestOpen(false);
            }}
            sx={{
              bgcolor: "black",
              color: "white",
              py: 1,
              borderRadius: "12px",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </Modal>
    </>
  );
}
