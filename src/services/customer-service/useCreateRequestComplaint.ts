import { useRouter } from "nextjs-toploader/app";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getQueryCLient } from "@/libs/react-query/providers";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import TAGS from "@/constants/tags";
import { CustomerServiceFormType } from "@/app/customer-service/_utils/customer-service-schema";
import parseObjectRequest from "@/utils/parseObjectRequest";

const useCreateRequestComplaint = (
  options?: UseMutationOptions<any, unknown, CustomerServiceFormType, unknown>
) => {
  const queryClient = getQueryCLient();
  const router = useRouter();

  return useMutation({
    ...options,
    mutationFn: async (formData: CustomerServiceFormType) => {
      // const payload: CustomerServicePayload =
      //   await transformFormDataToPayload(formData);

      return fetchHelper(
        "/customer-service/complaint-and-request",
        "POST",
        await parseObjectRequest(formData)
      );
    },
    onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: [TAGS.CUSTOMER_SERVICE] });

      router.push(`/customer-service/complaint`);
      toast("Request created successfully", { type: "success" });
    },
    onError(error, variables, context) {
      options?.onError?.(error, variables, context);
      toast("Failed to create request", { type: "error" });
    },
  });
};

export default useCreateRequestComplaint;
