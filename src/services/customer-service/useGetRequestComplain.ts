"use client";

import TAGS from "@/constants/tags";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { ComplaintRequestType } from "@/types/complaint-request.type";
import { skipToken, useQuery, UseQueryOptions } from "@tanstack/react-query";

type Options = Omit<
  UseQueryOptions<ComplaintRequestType>,
  "queryKey" | "queryFn"
>;

const useGetComplaintRequest = (uuid?: string, options?: Options) => {
  return useQuery<ComplaintRequestType>({
    ...options,
    queryFn: uuid
      ? async () => {
          const res = await fetchHelper(
            `/customer-service/complaint-and-request/${uuid}/detail`
          );

          return res.data;
        }
      : skipToken,
    queryKey: [TAGS.CUSTOMER_SERVICE, uuid],
  });
};

export default useGetComplaintRequest;
