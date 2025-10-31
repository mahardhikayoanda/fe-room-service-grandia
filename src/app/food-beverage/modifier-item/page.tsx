"use client";

import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import MenuHeader from "./_components/MenuHeader";
import ModifierSection from "./_components/ModifierSection";
import NotesInput from "./_components/NotesInput";
import QuantitySelector from "./_components/QuantitySelector";

// Mock data - sesuaikan dengan data real Anda
const menuData = {
  title: "Avocado Toast with egg",
  subtitle:
    "Avocado Toast with Egg: Begin by toasting your favorite bread, then top it with creamy avocado and a perfectly...",
  image: "/images/f_and_b/food.png",
  price: 24000,
  isRecommended: true,
  isBestSeller: false,
};

const modifierOptions = [
  {
    uuid: "01",
    name: "Pilihan Telor",
    is_required: true,
    can_choose_multiple: false,
    options: [
      {
        uuid: "001",
        name: "Matang",
      },
      {
        uuid: "002",
        name: "Setengah Matang",
      },
    ],
  },
  {
    uuid: "02",
    name: "Pilihan Saus",
    is_required: false,
    can_choose_multiple: true,
    options: [
      {
        uuid: "001",
        name: "Saus mentai",
      },
      {
        uuid: "002",
        name: "Saus ABC",
      },
      {
        uuid: "003",
        name: "Mayonase",
      },
    ],
  },
];

export default function ModifierItemPage() {
  // Initialize state with first option from each modifier group
  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<string, string[]>
  >({});
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleModifierChange = (
    modifierUuid: string,
    optionUuids: string[]
  ) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [modifierUuid]: optionUuids,
    }));
  };

  const handleAddToCart = () => {
    const orderData = {
      menu: menuData.title,
      modifiers: selectedModifiers,
      notes,
      quantity,
      totalPrice: menuData.price * quantity,
    };

    console.log("Order data:", orderData);
    // Implementasi add to cart di sini
    // Misalnya: dispatch(addToCart(orderData)) atau API call
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Box className="min-h-screen bg-[#F2F2F2] pb-0 relative">
      {/* Header with Image */}
      <MenuHeader
        title={menuData.title}
        subtitle={menuData.subtitle}
        image={menuData.image}
        isRecommended={menuData.isRecommended}
        price={menuData.price}
        isBestSeller={menuData.isBestSeller}
      />

      {/* Main Content */}
      <div className="pb-[120px]">
        {/* Modifier Sections */}
        {modifierOptions.map((modifier) => (
          <ModifierSection
            key={modifier.uuid}
            modifierUuid={modifier.uuid}
            title={modifier.name}
            required={modifier.is_required}
            canChooseMultiple={modifier.can_choose_multiple}
            options={modifier.options}
            selectedValues={selectedModifiers[modifier.uuid] || []}
            onChange={(optionUuids) =>
              handleModifierChange(modifier.uuid, optionUuids)
            }
          />
        ))}

        {/* Notes Input */}
        <NotesInput value={notes} onChange={setNotes} />

        {/* Quantity Selector */}
      </div>

      {/* Add to Cart Button (Fixed Bottom) */}
      {/* <AddToCartButton
        price={menuData.price * quantity}
        onClick={handleAddToCart}
      /> */}
      <div className="fixed bottom-0 left-0 w-full px-6 pb-4 pt-3 bg-white border-t border-gray-200">
        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#4F3534",
            color: "white",
            py: 1,
            borderRadius: "99px",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#333" },
          }}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </Box>
  );
}
