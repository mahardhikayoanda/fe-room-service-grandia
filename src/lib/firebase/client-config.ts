import type { FirebaseClientConfig } from "./types";

let clientConfig: FirebaseClientConfig | null = null;

export const setFirebaseClientConfig = (config: FirebaseClientConfig) => {
  clientConfig = config;
};

export const loadFirebaseClientConfig =
  async (): Promise<FirebaseClientConfig | null> => {
    if (typeof window === "undefined") return null;

    return clientConfig;
  };

export const isFirebaseConfigured = async () => {
  const config = await loadFirebaseClientConfig();

  return Boolean(config?.configured);
};
