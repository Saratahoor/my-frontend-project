import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDeleteCommunityPost } from "../../utils/apiCommunity";

function useDeletePost() {
  const query = useQueryClient();
  const { mutate: deletePost, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiDeleteCommunityPost(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["community"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deletePost, isLoading };
}

export default useDeletePost;
