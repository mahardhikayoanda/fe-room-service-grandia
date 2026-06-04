"use client";

import type { ReactNode } from "react";

import { setFirebaseClientConfig } from "./client-config";
import type { FirebaseClientConfig } from "./types";

interface FirebaseConfigProviderProps {
  config: FirebaseClientConfig;
  children: ReactNode;
}

const FirebaseConfigProvider = ({
  config,
  children,
}: FirebaseConfigProviderProps) => {
  setFirebaseClientConfig(config);

  return children;
};

export default FirebaseConfigProvider;
