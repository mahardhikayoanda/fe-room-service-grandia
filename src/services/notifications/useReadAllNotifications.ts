import { useMutation } from "@tanstack/react-query";

import TAGS from "@/constants/tags";
import useCustomerPhone from "@/lib/hooks/notification/useCustomerPhone";
import useNotificationStore from "@/lib/zustand/notification.store";
import { getQueryCLient } from "@/libs/react-query/providers";
import fetchHelper from "@/libs/react-query/service/fetchHelper";

const useReadAllNotifications = () => {
  const { phoneNumber } = useCustomerPhone();
  const orderUuid = useNotificationStore((s) => s.orderUuid);
  const queryClient = getQueryCLient();

  return useMutation({
    mutationKey: [TAGS.NOTIFICATION, phoneNumber, "read-all"],
    async mutationFn() {
      await fetchHelper("/notification/read-all", "PUT", {
        phone_number: phoneNumber,
        ...(orderUuid ? { order_uuid: orderUuid } : {}),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [TAGS.NOTIFICATION, phoneNumber],
      });
    },
  });
};

export default useReadAllNotifications;
