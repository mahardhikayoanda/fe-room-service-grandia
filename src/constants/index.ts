export const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
export const xClientVersion = process.env.NEXT_PUBLIC_CLIENT_VERSION;
export const maxFileSize = Number(
  process.env.NEXT_PUBLIC_MAX_FILE_UPLOAD_SIZE || 2
);

export const metadataBaseURL = "";
