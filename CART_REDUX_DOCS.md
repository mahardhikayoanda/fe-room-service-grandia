# Cart Redux Documentation

## Overview

Redux state management untuk shopping cart dengan struktur data yang siap dikirim ke backend.

## Struktur Data

```typescript
{
  "room_uuid": "string",
  "selected_menus": [
    {
      "uuid": "1",
      "name": "Avocado Toast with egg",
      "modifiers": [
        {
          "uuid": "01",
          "name": "Pilihan Telur",
          "options": [
            {
              "uuid": "001",
              "name": "Matang"
            }
          ]
        }
      ],
      "notes": "lorem",
      "quantity": 2,
      "basePrice": 24000,
      "totalPrice": 48000
    }
  ]
}
```

## Files Created

1. **`src/libs/store/slices/cartSlice.ts`** - Redux slice untuk cart
2. **`src/libs/types/cart/cart.ts`** - TypeScript types
3. **`src/libs/hooks/useRedux.ts`** - Typed hooks
4. **`src/app/food-beverage/cart/_components/CartExample.tsx`** - Contoh penggunaan

## Actions Available

### 1. Set Room UUID

```typescript
import { setRoomUuid } from "@/libs/store/slices/cartSlice";

dispatch(setRoomUuid("room-123"));
```

### 2. Add Menu to Cart

```typescript
import { addMenuToCart } from "@/libs/store/slices/cartSlice";

dispatch(addMenuToCart({
  uuid: "1",
  name: "Avocado Toast",
  modifiers: [...],
  notes: "No onions",
  quantity: 2,
  basePrice: 24000,
  totalPrice: 48000
}));
```

### 3. Update Menu in Cart

```typescript
import { updateMenuInCart } from "@/libs/store/slices/cartSlice";

dispatch(
  updateMenuInCart({
    index: 0,
    menu: { ...updatedMenuData },
  })
);
```

### 4. Remove Menu from Cart

```typescript
import { removeMenuFromCart } from "@/libs/store/slices/cartSlice";

dispatch(removeMenuFromCart(0)); // index
```

### 5. Update Menu Quantity

```typescript
import { updateMenuQuantity } from "@/libs/store/slices/cartSlice";

dispatch(
  updateMenuQuantity({
    index: 0,
    quantity: 3,
  })
);
```

### 6. Clear Cart (Keep room_uuid)

```typescript
import { clearCart } from "@/libs/store/slices/cartSlice";

dispatch(clearCart());
```

### 7. Reset Cart (Clear everything)

```typescript
import { resetCart } from "@/libs/store/slices/cartSlice";

dispatch(resetCart());
```

## Selectors Available

### Get Full Cart

```typescript
import { selectCart } from "@/libs/store/slices/cartSlice";

const cart = useAppSelector(selectCart);
// Returns: { room_uuid: string, selected_menus: [...] }
```

### Get Room UUID

```typescript
import { selectRoomUuid } from "@/libs/store/slices/cartSlice";

const roomUuid = useAppSelector(selectRoomUuid);
```

### Get Selected Menus

```typescript
import { selectSelectedMenus } from "@/libs/store/slices/cartSlice";

const menus = useAppSelector(selectSelectedMenus);
```

### Get Total Item Count

```typescript
import { selectCartItemCount } from "@/libs/store/slices/cartSlice";

const totalItems = useAppSelector(selectCartItemCount);
// Returns: 5 (if total quantity of all menus = 5)
```

### Get Total Price

```typescript
import { selectCartTotalPrice } from "@/libs/store/slices/cartSlice";

const totalPrice = useAppSelector(selectCartTotalPrice);
// Returns: 120000 (sum of all totalPrice)
```

## Usage Example in Component

```typescript
"use client";

import { useAppSelector, useAppDispatch } from "@/libs/hooks/useRedux";
import {
  addMenuToCart,
  selectCart,
  selectCartItemCount,
  selectCartTotalPrice,
} from "@/libs/store/slices/cartSlice";

export default function MyComponent() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const totalItems = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleAddToCart = () => {
    dispatch(addMenuToCart({
      uuid: "1",
      name: "Menu Name",
      modifiers: [],
      notes: "",
      quantity: 1,
      basePrice: 25000,
      totalPrice: 25000,
    }));
  };

  return (
    <div>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: Rp {totalPrice.toLocaleString("id-ID")}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

## Sending to Backend

```typescript
import { useAppSelector } from "@/libs/hooks/useRedux";
import { selectCart } from "@/libs/store/slices/cartSlice";

export default function CheckoutPage() {
  const cart = useAppSelector(selectCart);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart), // Send entire cart state
      });

      if (response.ok) {
        // Success - clear cart
        dispatch(resetCart());
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Checkout
    </button>
  );
}
```

## Notes

- Data disimpan sementara di Redux store (in-memory)
- Data akan hilang saat refresh page (kecuali menggunakan Redux Persist)
- Struktur data sudah sesuai dengan format yang diharapkan BE
- Total price otomatis dihitung saat update quantity
