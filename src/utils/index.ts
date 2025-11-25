import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Get value of object by dynamic path
 * @param {Record<string, any>} object - The object to get the value from.
 * @param {string} path - The path to the value.
 * @returns {any} The value.
 * @example
 * getValueByPath({ a: { b: { c: 1 } } }, 'a.b.c') // 1
 */
export function getValueByPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;

  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result === undefined || result === null) return undefined;
    result = result[key];
  }

  return result;
}

/**
 * Combines class names using clsx and merges them with Tailwind classes.
 * @param {...ClassValue} inputs The class values to be combined.
 * @returns {string} The combined class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export function formatRupiah(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined || value === "") return "Rp0";

  const numberValue = typeof value === "string" ? Number(value) : value;

  if (isNaN(numberValue)) return "Rp0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numberValue);
}

/**
 * Rounds a number to the nearest thousand (e.g., 15500 -> 16000, 15400 -> 15000)
 * @param {number} value - The value to be rounded.
 * @returns {number} The rounded value.
 */
export function roundToThousand(value: number): number {
  return Math.ceil(value);
}
