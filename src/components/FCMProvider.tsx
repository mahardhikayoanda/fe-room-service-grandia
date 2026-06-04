"use client";

import useFCM from "@/lib/hooks/notification/useFCM";

const FCMProvider = () => {
  useFCM();

  return null;
};

export default FCMProvider;
