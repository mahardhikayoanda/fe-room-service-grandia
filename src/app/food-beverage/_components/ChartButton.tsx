"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks/useRedux";
import {
  selectCartItemCount,
  selectCartTotalPrice,
} from "@/libs/store/slices/cartSlice";

export default function ChartButton() {
  const router = useRouter();
  const totalItems = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  // Don't show the button if cart is empty
  if (totalItems === 0) {
    return null;
  }

  const handleViewCart = () => {
    router.push("/food-beverage/cart");
  };

  return (
    <section className="shadow-lg">
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm mx-auto">
          <div className="flex flex-row justify-between items-center bg-[#4F3534] my-6 mx-4 p-4 rounded-2xl text-white">
            <div>
              <p className="font-semibold">Your Cart</p>
              <p className="text-sm">
                {totalItems} {totalItems === 1 ? "item" : "items"} - Rp{" "}
                {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>

            <div
              className="flex flex-row items-center gap-2 px-3 py-2 bg-black rounded-lg cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={handleViewCart}
            >
              <Image src="/icons/Cart.svg" alt="Cart" width={16} height={16} />
              <p className="text-sm font-medium">View Cart</p>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
