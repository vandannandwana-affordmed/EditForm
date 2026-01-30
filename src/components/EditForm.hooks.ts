import { useCreateAccountMutation } from "@/pages/api/mutations";
import { useGetUserQuery } from "@/pages/api/query";
import { User } from "@/types/user";
import { useState } from "react";

export const useEditHook = () => {
  const createAccountMutation = useCreateAccountMutation();

  const handleRegister = (
    values: User,
    setSubmitting: (val: boolean) => void,
  ) => {
    createAccountMutation.mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return { handleRegister };
};

export const useGetUserHook = () => {
  const getUserQuery = useGetUserQuery();
  return { currentUserHook: getUserQuery };
};
