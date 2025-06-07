import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDeleteComment } from "../../utils/apiCommunity";

function useDeleteComment() {
  const query = useQueryClient();
  const { mutate: deleteComment, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiDeleteComment(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["community"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteComment, isLoading };
}

export default useDeleteComment;
