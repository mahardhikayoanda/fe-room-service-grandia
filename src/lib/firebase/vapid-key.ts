const stripQuotes = (value: string) => value.replace(/^["']|["']$/g, "");

export const sanitizeVapidKey = (key?: string) => {
  if (!key) return undefined;

  const sanitized = stripQuotes(key.trim());

  return sanitized || undefined;
};

export const isValidVapidKey = (key: string) => {
  if (!/^[A-Za-z0-9_-]+$/.test(key)) return false;
  if (key.length < 80 || key.length > 100) return false;

  try {
    const padding = "=".repeat((4 - (key.length % 4)) % 4);
    const base64 = key.replace(/-/g, "+").replace(/_/g, "/") + padding;
    const binary = atob(base64);

    return binary.length === 65 && binary.charCodeAt(0) === 0x04;
  } catch {
    return false;
  }
};

export const getSanitizedVapidKey = (key?: string) => {
  const sanitized = sanitizeVapidKey(key);

  if (!sanitized) return undefined;

  return isValidVapidKey(sanitized) ? sanitized : undefined;
};
