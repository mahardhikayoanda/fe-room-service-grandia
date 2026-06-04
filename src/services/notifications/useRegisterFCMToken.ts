import { useMutation } from "@tanstack/react-query";

import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { RegisterFCMTokenBody } from "@/types/fcm.type";

const useRegisterFCMToken = () => {
  return useMutation({
    mutationFn: (data: RegisterFCMTokenBody) =>
      fetchHelper("/notification/device-token", "PUT", data),
  });
};

export default useRegisterFCMToken;
