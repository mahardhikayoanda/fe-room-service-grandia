import { useMutation } from "@tanstack/react-query";

import TAGS from "@/constants/tags";
import useCustomerPhone from "@/lib/hooks/notification/useCustomerPhone";
import { getQueryCLient } from "@/libs/react-query/providers";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { ResponseWrapperType } from "@/types/global";
import { NotificationType } from "@/types/notification.type";

type MutationContext = {
  previousData?: ResponseWrapperType<NotificationType[]>;
};

const useReadNotification = () => {
  const { phoneNumber } = useCustomerPhone();
  const queryClient = getQueryCLient();

  return useMutation<void, Error, string, MutationContext>({
    mutationKey: [TAGS.NOTIFICATION, phoneNumber],
    async mutationFn(uuid: string) {
      await fetchHelper(`/notification/${uuid}/read`, "PUT", {
        phone_number: phoneNumber,
      });
    },
    async onMutate(uuid) {
      await queryClient.cancelQueries({
        queryKey: [TAGS.NOTIFICATION, phoneNumber],
      });

      const queries = queryClient.getQueriesData<
        ResponseWrapperType<NotificationType[]>
      >({ queryKey: [TAGS.NOTIFICATION, phoneNumber] });

      const previousData = queries[0]?.[1];

      queries.forEach(([queryKey, data]) => {
        if (!data?.data) return;

        queryClient.setQueryData<ResponseWrapperType<NotificationType[]>>(
          queryKey,
          {
            ...data,
            data: data.data.map((item) =>
              item.uuid === uuid ? { ...item, is_read: true } : item,
            ),
          },
        );
      });

      return { previousData };
    },
    onError(_err, _uuid, context) {
      if (!context?.previousData) return;

      queryClient.setQueriesData(
        { queryKey: [TAGS.NOTIFICATION, phoneNumber] },
        context.previousData,
      );
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [TAGS.NOTIFICATION, phoneNumber],
      });
    },
  });
};

export default useReadNotification;
