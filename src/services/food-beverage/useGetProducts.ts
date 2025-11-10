import TAGS from "@/constants/tags";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { CategoryType } from "@/types/category.type";
import { ResponseWrapperType } from "@/types/global";
import { ProductType } from "@/types/product.type";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface Options
  extends Omit<
    UseQueryOptions<ResponseWrapperType<ProductType[]>>,
    "queryKey"
  > {
  params?: Record<string, string>;
}

const useGetProducts = (options?: Options) => {
  return useQuery<ResponseWrapperType<ProductType[]>>({
    ...options,
    async queryFn() {
      const res = await fetchHelper(
        `/fnb/product/order-eligible?${new URLSearchParams(options?.params)}`
      );

      return res;
    },
    queryKey: [TAGS.PRODUCT, options?.params],
  });
};

export default useGetProducts;
