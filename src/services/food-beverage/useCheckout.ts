import { CheckoutPayload } from "@/app/food-beverage/cart/_utils/checkout-schema";
import TAGS from "@/constants/tags";
import { getQueryCLient } from "@/libs/react-query/providers";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";

// interface CheckoutResponse {
//   order_uuid: string;
//   order_number: string;
//   status: string;
//   message: string;
// }

// interface Options
//   extends Omit<
//     UseMutationOptions<
//       ResponseWrapperType<CheckoutResponse>,
//       Error,
//       CheckoutPayload
//     >,
//     "mutationFn"
//   > {}

// const useCheckout = (options?: Options) => {
//   return useMutation<
//     ResponseWrapperType<CheckoutResponse>,
//     Error,
//     CheckoutPayload
//   >({
//     ...options,
//     async mutationFn(payload: CheckoutPayload) {
//       const res = await fetchHelper("/fnb/order", "POST", payload);

//       return res;
//     },
//   });
// };

// export default useCheckout;

const useCreateCheckout = (
  options?: UseMutationOptions<any, unknown, CheckoutPayload, unknown>
) => {
  const queryClient = getQueryCLient();
  const router = useRouter();

  return useMutation({
    ...options,
    mutationFn: async (formData: CheckoutPayload) => {
      return fetchHelper("/order", "POST", formData);
    },
    onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: [TAGS.CHECKOUT] });

      //   router.push(`/customer-service/complaint`);
      toast("Request created successfully", { type: "success" });
    },
    onError(error, variables, context) {
      options?.onError?.(error, variables, context);
      toast("Failed to create request", { type: "error" });
    },
  });
};

export default useCreateCheckout;
