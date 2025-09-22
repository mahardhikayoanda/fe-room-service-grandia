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
