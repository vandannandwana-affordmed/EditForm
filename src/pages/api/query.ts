import { useQuery } from "@tanstack/react-query";
import { getuser } from "./api";

export function useGetUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getuser,
  });
}
