import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";

export function useGetUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
