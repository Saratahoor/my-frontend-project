import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useLoginData from "../Auth/useLoginData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiAddCommunityPost } from "../../utils/apiCommunity";
import Content from "../../components/ui/Content";
import PageLoader from "../../components/PageLoader";

function useAddPost() {
  const query = useQueryClient();
  const { mutate: addPost, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiAddCommunityPost(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["community"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addPost, isLoading };
}

const AddPostModal = ({ onClose, forumId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: UserData, isLoading } = useLoginData();
  const navigate = useNavigate();
  const { addPost, isLoading: isCreating } = useAddPost();

  const handleCreateForum = (data) => {
    if (UserData?.error) navigate("/auth/login");
    const postData = {
      user_id: UserData.linked_id,
      forumId,
      content: data.title,
    };
    addPost(postData);
    reset();
    onClose();
  };

  if (isLoading || isCreating) return <PageLoader />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          <Content>Add New Post</Content>
        </h2>

        <form onSubmit={handleSubmit(handleCreateForum)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Content>Title</Content>
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Post Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">
                <Content>Title is required.</Content>
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              <Content>Cancel</Content>
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Content>Create Post</Content>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
