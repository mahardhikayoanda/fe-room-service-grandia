"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { addMenuToCart } from "@/libs/store/slices/cartSlice";
import MenuHeader from "./_components/MenuHeader";
import ModifierSection from "./_components/ModifierSection";
import NotesInput from "./_components/NotesInput";
import QuantitySelector from "./_components/QuantitySelector";
import { useRouter } from "nextjs-toploader/app";

// Mock data - sesuaikan dengan data real Anda
const menuData = {
  uuid: "1",
  name: "Avocado Toast with egg",
  description:
    "Avocado Toast with Egg: Begin by toasting your favorite bread, then top it with creamy avocado and a perfectly...",
  image: "/images/f_and_b/food.png",
  basePrice: 24000,
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
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    // Transform selectedModifiers to match the expected structure
    const modifiers = modifierOptions
      .filter((modifier) => selectedModifiers[modifier.uuid]?.length > 0)
      .map((modifier) => ({
        uuid: modifier.uuid,
        name: modifier.name,
        options: modifier.options.filter((option) =>
          selectedModifiers[modifier.uuid].includes(option.uuid)
        ),
      }));

    const menuToAdd = {
      uuid: menuData.uuid,
      name: menuData.name,
      image: menuData.image,
      modifiers,
      notes,
      quantity,
      basePrice: menuData.basePrice,
      totalPrice: menuData.basePrice * quantity,
    };

    // Dispatch to Redux store
    dispatch(addMenuToCart(menuToAdd));

    // Optional: Reset form or navigate to cart
    router.back();
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
    <Box className="max-w-sm min-h-screen bg-[#F2F2F2] pb-0 relative">
      {/* Header with Image */}
      <MenuHeader
        title={menuData.name}
        subtitle={menuData.description}
        image={menuData.image}
        isRecommended={menuData.isRecommended}
        price={menuData.basePrice}
        isBestSeller={menuData.isBestSeller}
      />

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

      {/* Add to Cart Button (Fixed Bottom) */}
      <div className="max-w-sm w-full sticky bottom-0 px-6 pb-4 pt-3 mt-1 bg-white border-t border-gray-200">
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
            textTransform: "none",
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
