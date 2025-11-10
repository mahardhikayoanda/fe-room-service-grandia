export const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
export const xClientVersion = process.env.NEXT_PUBLIC_CLIENT_VERSION;
export const maxFileSize = Number(
  process.env.NEXT_PUBLIC_MAX_FILE_UPLOAD_SIZE || 2
);

export const IsCheckRadius = process.env.NEXT_PUBLIC_RADIUS_CHECK === "true";
export const radius = Number(process.env.NEXT_PUBLIC_RADIUS);
export const latitude = Number(process.env.NEXT_PUBLIC_LATITUDE);
export const longitude = Number(process.env.NEXT_PUBLIC_LONGITUDE);

export const metadataBaseURL = "";
