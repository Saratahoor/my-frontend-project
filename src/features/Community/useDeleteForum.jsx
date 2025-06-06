import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDeleteCommunityForum } from "../../utils/apiCommunity";

function useDeleteForum() {
  const query = useQueryClient();
  const { mutate: deleteForum, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiDeleteCommunityForum(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["community"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteForum, isLoading };
}

export default useDeleteForum;
