import { useQuery } from "@tanstack/react-query";
import { apiFetchCommunityForumns } from "../../utils/apiCommunity";

function useLoginData() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["community"],
    queryFn: apiFetchCommunityForumns,
  });
  return { data, isLoading, isError };
}

export default useLoginData;
