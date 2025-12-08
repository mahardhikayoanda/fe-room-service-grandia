import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getQueryCLient } from "@/libs/react-query/providers";
import fetchHelper from "@/libs/react-query/service/fetchHelper";
import TAGS from "@/constants/tags";
import { RoomLoginRequest, RoomLoginResponse } from "@/types/room.type";

const useCreateRoomLogin = (
  options?: UseMutationOptions<
    RoomLoginResponse,
    unknown,
    RoomLoginRequest,
    unknown
  >
) => {
  const queryClient = getQueryCLient();

  return useMutation({
    ...options,
    mutationFn: async (formData: RoomLoginRequest) => {
      return fetchHelper<RoomLoginResponse>("/room/login", "POST", formData);
    },
    onSuccess(data, variables, onMutateResult, context) {
      options?.onSuccess?.(data, variables, onMutateResult, context);
      queryClient.invalidateQueries({ queryKey: [TAGS.ROOM_QR] });
    },
    onError(error: any, variables, onMutateResult, context) {
      options?.onError?.(error, variables, onMutateResult, context);
      const errorMessage =
        error?.response?.data?.message || "Failed to verify room QR code";
      toast(errorMessage, { type: "error" });
    },
  });
};

export default useCreateRoomLogin;
