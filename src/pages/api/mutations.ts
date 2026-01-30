import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "./api";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

export function useCreateAccountMutation() {
  return useMutation({
    mutationFn: (data: User) => createAccount(data),
    onSuccess: () => {
      toast.success("Account updated successfully!");
    },

    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error));
    },

    retry: false,
  });
}
