import { CheckoutPayload } from "@/app/food-beverage/cart/_utils/checkout-schema";
import TAGS from "@/constants/tags";
import { getQueryCLient } from "@/libs/react-query/providers";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface OrderData {
  order_number: string;
  name: string;
  phone_number: string;
  date: string;
  status: string;
  remark: string | null;
  uuid: string;
  version: number;
}

interface CheckoutResponseData {
  order: OrderData;
  snap_token?: string;
}

interface CheckoutResponse {
  success: boolean;
  message: string;
  data: CheckoutResponseData;
}

const useCreateCheckoutOrder = (
  options?: UseMutationOptions<
    CheckoutResponse,
    unknown,
    CheckoutPayload,
    unknown
  >
) => {
  const queryClient = getQueryCLient();

  return useMutation({
    ...options,
    mutationFn: async (formData: CheckoutPayload) => {
      return fetchHelper("/order", "POST", formData);
    },
    onSuccess(data, variables, onMutateResult, context) {
      options?.onSuccess?.(data, variables, onMutateResult, context);
      queryClient.invalidateQueries({ queryKey: [TAGS.CHECKOUT] });
    },
    onError(error, variables, onMutateResult, context) {
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
};

export default useCreateCheckoutOrder;
