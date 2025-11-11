"use client";

import TAGS from "@/constants/tags";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { OrderDetailType } from "@/types/order.type";
import { skipToken, useQuery, UseQueryOptions } from "@tanstack/react-query";

type Options = Omit<UseQueryOptions<OrderDetailType>, "queryKey" | "queryFn">;

const useGetOrder = (uuid?: string, options?: Options) => {
  return useQuery<OrderDetailType>({
    ...options,
    queryFn: uuid
      ? async () => {
          const res = await fetchHelper(`/order/${uuid}/detail`);

          return res.data;
        }
      : skipToken,
    queryKey: [TAGS.ORDER, uuid],
  });
};

export default useGetOrder;
