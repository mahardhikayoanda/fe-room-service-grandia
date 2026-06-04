export const CUSTOMER_PHONE_KEY = "customer_phone_number";
export const FCM_TOKEN_STORAGE_KEY = "fcm_token";

export function saveCustomerPhone(phone: string) {
  if (typeof window === "undefined" || !phone.trim()) return;

  sessionStorage.setItem(CUSTOMER_PHONE_KEY, phone.trim());
}

export function getCustomerPhone(): string {
  if (typeof window === "undefined") return "";

  return sessionStorage.getItem(CUSTOMER_PHONE_KEY) || "";
}
