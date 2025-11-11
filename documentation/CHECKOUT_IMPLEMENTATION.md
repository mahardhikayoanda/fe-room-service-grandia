# Checkout Implementation Guide

## Overview

Implementasi checkout untuk Food & Beverage ordering system dengan payload yang sesuai dengan API backend. Menggunakan **Zod** untuk schema validation dan **React Hook Form** untuk form management.

## File Structure

### Types

- **`src/types/checkout.type.ts`** - TypeScript interfaces untuk checkout payload

### Validation Schema

- **`src/app/food-beverage/cart/_utils/checkout-schema.ts`** - Zod schema untuk validasi form checkout

### Services

- **`src/services/food-beverage/useCheckout.ts`** - React Query mutation hook untuk API checkout

### Components

- **`src/app/food-beverage/cart/page.tsx`** - Halaman cart dengan React Hook Form dan logic checkout
- **`src/app/food-beverage/cart/_components/CheckoutButton.tsx`** - Tombol checkout dengan payment method selection
- **`src/app/food-beverage/cart/_components/PersonalInfoForm.tsx`** - Form input nama dan nomor HP dengan validasi

### Utils

- **`src/utils/index.ts`** - Added `roundToThousand()` function untuk pembulatan harga

## Checkout Payload Structure

```typescript
{
  room_uuid: string;           // UUID dari room (required)
  promo_uuid: string;           // UUID dari promo (optional, saat ini string kosong)
  name: string;                 // Nama user (required)
  phone_number: string;         // No. HP user (required)
  remark?: string;              // Catatan tambahan (optional)
  payment_method: "cash" | "charge_to_room" | null;  // null untuk Midtrans
  order_items: [
    {
      item_uuid: string;        // UUID menu (required)
      name: string;             // Nama menu (required)
      price: number;            // Harga satuan (required)
      quantity: number;         // Jumlah (required)
      total_price: number;      // price × quantity (required)
      remark?: string;          // Catatan untuk item ini (optional)
      modifiers: [              // Modifier yang dipilih
        {
          name: string;         // Nama modifier group
          modifier_items: [
            { name: string }    // Nama pilihan modifier
          ]
        }
      ]
    }
  ],
  grand_total: number;          // Total sebelum pembulatan (required)
  rounded_grand_total: number;  // Total setelah pembulatan ke ribuan (required)
  total_discount: number;       // Total diskon (saat ini 0)
}
```

## Payment Methods

| ID          | Label            | payment_method value    |
| ----------- | ---------------- | ----------------------- |
| `non-tunai` | Metode Non-Tunai | `null` (untuk Midtrans) |
| `cod`       | Cash on Delivery | `"cash"`                |
| `checkout`  | Charge to Room   | `"charge_to_room"`      |

## Form Validation with Zod

### Schema Definition (`checkout-schema.ts`)

```typescript
export const CheckoutFormSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must not exceed 100 characters"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
});
```

### Validation Rules

#### Full Name

- ✅ Required (minimum 1 character)
- ✅ Minimum 3 characters
- ✅ Maximum 100 characters

#### Phone Number

- ✅ Required (minimum 1 character)
- ✅ Minimum 10 digits
- ✅ Maximum 15 digits
- ✅ Only numeric characters allowed (regex: `/^[0-9]+$/`)

## How to Use

### 1. Form Setup with React Hook Form

```typescript
const {
  control,
  watch,
  formState: { isValid },
} = useForm<CheckoutFormType>({
  defaultValues: defaultCheckoutForm,
  resolver: zodResolver(CheckoutFormSchema),
  mode: "onChange",
  reValidateMode: "onChange",
});

// Watch form values for payload building
const formValues = watch();
```

### 2. Cart Page (`page.tsx`)

Function `buildCheckoutPayload()` akan:

- Mengambil data dari Redux store (selectedMenus, totalPrice)
- Mengambil data dari React Hook Form (`formValues.name`, `formValues.phone_number`)
- Mengambil room_uuid dari RoomProvider
- Transform data ke format API
- Menghitung `rounded_grand_total` dengan `roundToThousand()`

### 3. Personal Info Form

Komponen `PersonalInfoForm` menggunakan `control` dari React Hook Form:

```typescript
<PersonalInfoForm control={control} />
```

Form fields otomatis ter-validasi dengan Zod schema dan menampilkan error message.

### 4. Checkout Button

Komponen menerima 2 props:

- `onBuildPayload`: Function untuk build payload berdasarkan payment method
- `isFormValid`: Boolean dari `formState.isValid` (otomatis dari Zod validation)

### 5. Form Validation Status

Form valid jika:

- ✅ Nama lengkap memenuhi kriteria (min 3 char, max 100 char)
- ✅ Nomor HP memenuhi kriteria (10-15 digit, hanya angka)
- ✅ Payment method sudah dipilih

### 6. Testing

Saat ini API belum ready, jadi:

```typescript
// Uncomment this when API is ready
// checkoutMutation.mutate(payload);

// For now, just navigate (for testing)
router.push("/food-beverage/cart/tracking-order");
```

## Important Notes

1. **Promo UUID**: Saat ini diset sebagai string kosong (`""`) sesuai permintaan
2. **Mock Data**: Menu detail masih menggunakan `menuData` karena API belum ready
3. **Pembulatan**: Menggunakan `roundToThousand()` untuk membulatkan ke ribuan terdekat
4. **Validation**: Form harus valid sebelum bisa checkout
5. **Toast Notification**: Menggunakan `react-toastify` untuk feedback ke user

## Next Steps

1. ✅ Implementasi payload checkout
2. ✅ Validasi form
3. ✅ Payment method selection
4. ⏳ Integrasi dengan API (uncomment mutation saat API ready)
5. ⏳ Implementasi Midtrans payment gateway
6. ⏳ Implementasi promo/discount logic

## Example Console Log

Saat checkout, payload akan di-log ke console:

```javascript
console.log("Checkout payload:", payload);
```

Pastikan untuk check console dan verify bahwa semua data sudah sesuai dengan struktur API.
