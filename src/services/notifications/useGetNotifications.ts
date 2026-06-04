import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import TAGS from "@/constants/tags";
import useCustomerPhone from "@/lib/hooks/notification/useCustomerPhone";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { ResponseWrapperType } from "@/types/global";
import { NotificationType } from "@/types/notification.type";

const useGetNotifications = (
  params?: Record<string, string>,
  options?: Omit<
    UseQueryOptions<ResponseWrapperType<NotificationType[]>>,
    "queryKey" | "queryFn"
  >,
) => {
  const { phoneNumber, isReady } = useCustomerPhone();

  return useQuery<ResponseWrapperType<NotificationType[]>>({
    queryKey: [TAGS.NOTIFICATION, phoneNumber, params],
    async queryFn() {
      const searchParams = new URLSearchParams({
        phone_number: phoneNumber,
        ...params,
      });

      return fetchHelper(`/notification?${searchParams.toString()}`);
    },
    enabled: isReady && (options?.enabled ?? true),
    ...options,
  });
};

export default useGetNotifications;
