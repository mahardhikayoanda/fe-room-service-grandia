"use client";

import { useAppSelector, useAppDispatch } from "@/libs/hooks/useRedux";
import {
  selectCart,
  selectCartItemCount,
  selectCartTotalPrice,
  removeMenuFromCart,
  updateMenuQuantity,
  clearCart,
} from "@/libs/store/slices/cartSlice";

/**
 * Example component showing how to use cart state
 * You can use this as reference in your actual cart page
 */
export default function CartExample() {
  const dispatch = useAppDispatch();

  // Get cart data from Redux
  const cart = useAppSelector(selectCart);
  const totalItems = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleRemoveItem = (index: number) => {
    dispatch(removeMenuFromCart(index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    dispatch(updateMenuQuantity({ index, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="mb-4">
        <p>Room UUID: {cart.room_uuid || "Not set"}</p>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: Rp {totalPrice.toLocaleString("id-ID")}</p>
      </div>

      {cart.selected_menus.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.selected_menus.map((menu, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-bold">{menu.name}</h3>
                <p className="text-sm text-gray-600">
                  Base Price: Rp {menu.basePrice.toLocaleString("id-ID")}
                </p>

                {/* Modifiers */}
                {menu.modifiers.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Modifiers:</p>
                    {menu.modifiers.map((modifier) => (
                      <div key={modifier.uuid} className="ml-4 text-sm">
                        <p className="font-medium">{modifier.name}:</p>
                        <ul className="ml-4 list-disc">
                          {modifier.options.map((option) => (
                            <li key={option.uuid}>{option.name}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes */}
                {menu.notes && (
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Notes:</span> {menu.notes}
                  </p>
                )}

                {/* Quantity and Total */}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(index, menu.quantity - 1)
                      }
                      disabled={menu.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="font-semibold">{menu.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(index, menu.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold">
                    Rp {menu.totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(index)}
                  className="mt-2 text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleClearCart}
            className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
