import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../utils/apiAuth";

function useLoginData() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["login"],
    queryFn: fetchUser,
  });
  return { data, isLoading, isError };
}

export default useLoginData;
