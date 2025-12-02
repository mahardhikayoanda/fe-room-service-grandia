import { PromoType } from "@/types/room.type";

export interface AppliedPromo {
  promo: PromoType;
  discountAmount: number;
}

/**
 * Calculate discount amount for a single promo
 */
export function calculatePromoDiscount(
  promo: PromoType,
  totalPrice: number
): number {
  // Check if total price meets minimum transaction requirement
  const minimumTransaction = parseFloat(promo.minimum_transaction || "0");
  if (totalPrice < minimumTransaction) {
    return 0;
  }

  // Calculate discount based on type
  let discount = 0;

  // Nominal discount
  if (promo.discount_nominal && parseFloat(promo.discount_nominal) > 0) {
    discount = parseFloat(promo.discount_nominal);
  }

  // Percentage discount
  if (promo.discount_percentage && parseFloat(promo.discount_percentage) > 0) {
    const percentageDiscount =
      (totalPrice * parseFloat(promo.discount_percentage)) / 100;
    // Use the larger discount if both exist
    discount = Math.max(discount, percentageDiscount);
  }

  return discount;
}

/**
 * Find and apply the best promo automatically based on total price
 */
export function findBestPromo(
  promos: PromoType[],
  totalPrice: number,
  products?: string[]
): AppliedPromo | null {
  // Filter only menu product promo
  const menuProductPromo = promos.filter(
    (promo) =>
      promo.promo_type === "menu" &&
      promo.is_available &&
      products?.includes(promo.promo_product.uuid)
  );

  // Filter only minimum_transaction type promos that are available
  const minimumTransactionPromo = promos.filter(
    (promo) =>
      promo.promo_type === "minimum_transaction" &&
      promo.is_available &&
      parseFloat(promo.minimum_transaction || "0") <= totalPrice
  );

  if (minimumTransactionPromo.length === 0 && menuProductPromo.length === 0) {
    return null;
  }

  // if menu product promo is available, use it, otherwise use minimum transaction promo
  const promo =
    menuProductPromo?.length > 0 ? menuProductPromo : minimumTransactionPromo;

  // Calculate discount for each eligible promo
  const promosWithDiscount = promo.map((promo) => ({
    promo,
    discountAmount: calculatePromoDiscount(promo, totalPrice),
  }));

  // Find the promo with the highest discount
  const bestPromo = promosWithDiscount.reduce((best, current) => {
    return current.discountAmount > best.discountAmount ? current : best;
  });

  return bestPromo.discountAmount > 0 ? bestPromo : null;
}

/**
 * Calculate final price after applying the best promo
 */
export function calculateFinalPrice(
  totalPrice: number,
  appliedPromo: AppliedPromo | null
): number {
  if (!appliedPromo) {
    return totalPrice;
  }

  const finalPrice = totalPrice - appliedPromo.discountAmount;
  return Math.max(0, finalPrice); // Ensure price doesn't go negative
}
