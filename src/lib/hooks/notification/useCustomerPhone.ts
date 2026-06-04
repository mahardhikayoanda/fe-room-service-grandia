"use client";

import { useEffect, useMemo } from "react";

import { useAppSelector } from "@/libs/hooks/useRedux";
import { selectCartPersonalInfo } from "@/libs/store/slices/cartSlice";
import { getCustomerPhone, saveCustomerPhone } from "@/utils/customerPhone";
import { isQRVerified } from "@/utils/geolocation";

const useCustomerPhone = () => {
  const cartPersonalInfo = useAppSelector(selectCartPersonalInfo);

  const phoneNumber = useMemo(() => {
    const fromCart = cartPersonalInfo?.phone_number?.trim();
    if (fromCart) return fromCart;

    return getCustomerPhone();
  }, [cartPersonalInfo?.phone_number]);

  useEffect(() => {
    if (cartPersonalInfo?.phone_number?.trim()) {
      saveCustomerPhone(cartPersonalInfo.phone_number);
    }
  }, [cartPersonalInfo?.phone_number]);

  const isReady = Boolean(phoneNumber && isQRVerified());

  return { phoneNumber, isReady };
};

export default useCustomerPhone;
