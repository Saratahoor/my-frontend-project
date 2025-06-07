import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddComment } from "../../utils/apiCommunity";
import toast from "react-hot-toast";

function useAddComment() {
  const query = useQueryClient();
  const { mutate: addComment, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiAddComment(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["community"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addComment, isLoading };
}

export default useAddComment;
