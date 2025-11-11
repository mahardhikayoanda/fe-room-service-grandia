"use client";

import React, { use, useState } from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { addMenuToCart } from "@/libs/store/slices/cartSlice";
import MenuHeader from "./_components/MenuHeader";
import ModifierSection from "./_components/ModifierSection";
import NotesInput from "./_components/NotesInput";
import QuantitySelector from "./_components/QuantitySelector";
import ModifierItemSkeleton from "./_components/ModifierItemSkeleton";
import { useRouter } from "nextjs-toploader/app";
import useGetProduct from "@/services/food-beverage/useGetProduct";

// Mock data - sesuaikan dengan data real Anda
// const menuData = {
//   uuid: "1",
//   name: "Avocado Toast with egg",
//   description:
//     "Avocado Toast with Egg: Begin by toasting your favorite bread, then top it with creamy avocado and a perfectly...",
//   price: 24000,
//   is_available: true,
//   is_recommended: true,
//   is_best_seller: false,
//   sold_count: 150,
//   image: {
//     uuid: "img1",
//     url: "https://indomie.wangun.co/storage/file/2025-11-06/kgZoCKKDXjIurrlnXHRhxBGyL.jpg",
//   },
// };

// const modifierOptions = [
//   {
//     uuid: "01",
//     name: "Pilihan Telor",
//     is_required: true,
//     can_choose_multiple: false,
//     modifier_items: [
//       {
//         uuid: "001",
//         name: "Matang",
//       },
//       {
//         uuid: "002",
//         name: "Setengah Matang",
//       },
//     ],
//   },
//   {
//     uuid: "02",
//     name: "Pilihan Saus",
//     is_required: false,
//     can_choose_multiple: true,
//     modifier_items: [
//       {
//         uuid: "001",
//         name: "Saus mentai",
//       },
//       {
//         uuid: "002",
//         name: "Saus ABC",
//       },
//       {
//         uuid: "003",
//         name: "Mayonase",
//       },
//     ],
//   },
// ];

export default function ModifierItemPage({
  params,
}: {
  params: Promise<{ menu_uuid: string }>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { menu_uuid } = use(params);

  const { data: menuData, isLoading } = useGetProduct(menu_uuid);

  const modifierOptions = menuData?.modifiers || [];

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
    // Guard clause: ensure menuData exists
    if (!menuData) return;

    // Transform selectedModifiers to match the expected structure
    const modifiers = modifierOptions
      .filter((modifier) => selectedModifiers[modifier.uuid]?.length > 0)
      .map((modifier) => ({
        uuid: modifier.uuid,
        name: modifier.name,
        modifier_items: modifier.modifier_items.filter((option) =>
          selectedModifiers[modifier.uuid].includes(option.uuid)
        ),
      }));

    const menuToAdd = {
      uuid: menuData.uuid,
      name: menuData.name,
      image: menuData.image.url,
      modifiers,
      notes,
      quantity,
      basePrice: menuData.selling_price,
      totalPrice: menuData.selling_price * quantity,
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

  // Show loading skeleton while data is being fetched
  if (isLoading || !menuData) {
    return <ModifierItemSkeleton />;
  }

  return (
    <Box className="max-w-sm min-h-screen bg-[#F2F2F2] pb-0 relative">
      {/* Header with Image */}
      <MenuHeader
        title={menuData.name}
        subtitle={menuData.description}
        image={menuData.image.url}
        isRecommended={menuData.is_recommended}
        price={menuData.selling_price}
        isBestSeller={menuData.is_best_seller}
      />

      {/* Modifier Sections */}
      {modifierOptions.map((modifier) => (
        <ModifierSection
          key={modifier.uuid}
          modifierUuid={modifier.uuid}
          title={modifier.name}
          required={modifier.is_required}
          canChooseMultiple={modifier.can_choose_multiple}
          options={modifier.modifier_items}
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
