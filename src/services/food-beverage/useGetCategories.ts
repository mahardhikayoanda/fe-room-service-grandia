import TAGS from "@/constants/tags";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { CategoryType } from "@/types/category.type";
import { ResponseWrapperType } from "@/types/global";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface Options
  extends Omit<
    UseQueryOptions<ResponseWrapperType<CategoryType[]>>,
    "queryKey"
  > {
  params?: Record<string, string>;
}

const useGetCategories = (options?: Options) => {
  return useQuery<ResponseWrapperType<CategoryType[]>>({
    ...options,
    async queryFn() {
      const res = await fetchHelper(
        `/fnb/product/category?${new URLSearchParams(options?.params)}`
      );

      return res;
    },
    queryKey: [TAGS.CATEGORY, options?.params],
  });
};

export default useGetCategories;
