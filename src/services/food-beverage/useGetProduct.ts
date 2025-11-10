"use client";

import TAGS from "@/constants/tags";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { ProductDetailType } from "@/types/product.type";
import { skipToken, useQuery, UseQueryOptions } from "@tanstack/react-query";

type Options = Omit<UseQueryOptions<ProductDetailType>, "queryKey" | "queryFn">;

const useGetProduct = (uuid?: string, options?: Options) => {
  return useQuery<ProductDetailType>({
    ...options,
    queryFn: uuid
      ? async () => {
          const res = await fetchHelper(
            `/fnb/product/order-eligible/${uuid}/detail`
          );

          return res.data;
        }
      : skipToken,
    queryKey: [TAGS.PRODUCT, uuid],
  });
};

export default useGetProduct;
