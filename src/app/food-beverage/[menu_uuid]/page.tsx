"use client";

import React, { use, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { addMenuToCart } from "@/libs/store/slices/cartSlice";
import { useAppSelector } from "@/libs/hooks/useRedux";
import {
  selectSelectedMenus,
  updateMenuInCart,
} from "@/libs/store/slices/cartSlice";
import MenuHeader from "./_components/MenuHeader";
import ModifierSection from "./_components/ModifierSection";
import NotesInput from "./_components/NotesInput";
import QuantitySelector from "./_components/QuantitySelector";
import ModifierItemSkeleton from "./_components/ModifierItemSkeleton";
import { useRouter } from "nextjs-toploader/app";
import useGetProduct from "@/services/food-beverage/useGetProduct";
import { useSearchParams } from "next/navigation";

export default function ModifierItemPage({
  params,
}: {
  params: Promise<{ menu_uuid: string }>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const selectedMenus = useAppSelector(selectSelectedMenus);

  const { menu_uuid } = use(params);

  const { data: menuData, isLoading } = useGetProduct(menu_uuid);

  const modifierOptions = menuData?.modifiers || [];

  // Initialize state with first option from each modifier group
  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<string, string[]>
  >({});
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Determine if we're editing an existing cart item
  const editIndexParam = searchParams?.get("editIndex");
  const editIndex = editIndexParam ? parseInt(editIndexParam, 10) : undefined;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editGlobalIndex, setEditGlobalIndex] = useState<number | null>(null);

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
    if (isEditMode && editGlobalIndex !== null && editGlobalIndex >= 0) {
      dispatch(updateMenuInCart({ index: editGlobalIndex, menu: menuToAdd }));
    } else {
      dispatch(addMenuToCart(menuToAdd));
    }

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

  // Initialize form when editing
  useEffect(() => {
    if (!menuData) return;
    if (typeof editIndex === "number" && !isNaN(editIndex)) {
      // First, check whether editIndex is a global index into selectedMenus (OrderCard passes global index)
      if (
        editIndex >= 0 &&
        editIndex < selectedMenus.length &&
        selectedMenus[editIndex].uuid === menuData.uuid
      ) {
        const target = selectedMenus[editIndex];

        const initialModifiers: Record<string, string[]> = {};
        target.modifiers.forEach((mod) => {
          initialModifiers[mod.uuid] = mod.modifier_items.map((o) => o.uuid);
        });

        setSelectedModifiers(initialModifiers);
        setNotes(target.notes || "");
        setQuantity(target.quantity || 1);

        setEditGlobalIndex(editIndex);
        setIsEditMode(true);
      } else {
        // Fallback: treat editIndex as local index among items with same uuid (AddMenuButton passes local index)
        const sameMenus = selectedMenus.filter((m) => m.uuid === menuData.uuid);
        if (editIndex >= 0 && editIndex < sameMenus.length) {
          const target = sameMenus[editIndex];

          // Build selectedModifiers from target.modifiers
          const initialModifiers: Record<string, string[]> = {};
          target.modifiers.forEach((mod) => {
            initialModifiers[mod.uuid] = mod.modifier_items.map((o) => o.uuid);
          });

          setSelectedModifiers(initialModifiers);
          setNotes(target.notes || "");
          setQuantity(target.quantity || 1);

          // Compute global index in selectedMenus
          let count = -1;
          let globalIdx: number | null = null;
          for (let i = 0; i < selectedMenus.length; i++) {
            if (selectedMenus[i].uuid === menuData.uuid) {
              count += 1;
              if (count === editIndex) {
                globalIdx = i;
                break;
              }
            }
          }

          if (globalIdx !== null) {
            setEditGlobalIndex(globalIdx);
            setIsEditMode(true);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData, editIndex, selectedMenus]);

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
