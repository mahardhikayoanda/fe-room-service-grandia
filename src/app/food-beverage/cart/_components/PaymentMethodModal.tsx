"use client";

import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Building2,
  Percent,
  CreditCard,
  ChevronRight,
  Banknote,
  HandCoins,
} from "lucide-react";
import React from "react";

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  onSelectPaymentTitle: (methodTitle: string) => void;
  onSelectPaymentId: (methodId: string) => void;
}

const paymentMethods = [
  {
    id: "non-tunai",
    title: "Non Tunai",
    description: "Transfer through bank and e-wallet",
    icon: CreditCard,
  },
  {
    id: "cod",
    title: "Pay on Delivery",
    description: "Pay upon order arrival",
    icon: HandCoins,
  },
  {
    id: "checkout",
    title: "Pay at Checkout",
    description: "Pay at hotel checkout",
    icon: Banknote,
  },
];

export default function PaymentMethodModal({
  open,
  onClose,
  onSelectPaymentTitle,
  onSelectPaymentId,
}: PaymentMethodModalProps) {
  const handleSelectMethod = ({
    methodTitle,
    methodId,
  }: {
    methodTitle: string;
    methodId: string;
  }) => {
    onSelectPaymentTitle(methodTitle);
    onSelectPaymentId(methodId);
    onClose();
  };

  return (
    <SwipeableDrawerWrapper
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      maxWidth={384}
      maxHeight="auto"
      borderRadius={16}
    >
      <Box sx={{ pb: 2 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#000",
            mb: 1.5,
          }}
        >
          Choose a payment method
        </Typography>

        <Divider
          sx={{
            p: 0,
          }}
        />

        {/* Payment Methods List */}
        <List sx={{ p: 0 }}>
          {paymentMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <React.Fragment key={method.id}>
                <ListItem
                  disablePadding
                  sx={{
                    py: 1,
                    borderBottom:
                      index < paymentMethods.length - 1
                        ? "1px solid #E5E5E5"
                        : "none",
                  }}
                >
                  <ListItemButton
                    onClick={() =>
                      handleSelectMethod({
                        methodTitle: method.title,
                        methodId: method.id,
                      })
                    }
                    sx={{
                      py: 1,
                      px: 0,
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  >
                    {/* Icon */}
                    <ListItemIcon
                      sx={{
                        minWidth: 56,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: "#F5F5F5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconComponent size={20} color="#666" />
                      </Box>
                    </ListItemIcon>

                    {/* Text */}
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#000",
                            mb: 0.5,
                          }}
                        >
                          {method.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#999",
                          }}
                        >
                          {method.description}
                        </Typography>
                      }
                      sx={{ m: 0 }}
                    />

                    {/* Chevron */}
                    <ChevronRight size={24} color="#999" />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </SwipeableDrawerWrapper>
  );
}
