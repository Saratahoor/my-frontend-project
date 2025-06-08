import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useLoginData from "../Auth/useLoginData";
import { apiAddCommunityForum } from "../../utils/apiCommunity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Content from "../../components/ui/Content";

function useAddForum() {
  const query = useQueryClient();
  const { mutate: addForum, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiAddCommunityForum(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["community"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addForum, isLoading };
}

const AddForumModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: UserData, isLoading } = useLoginData();
  const navigate = useNavigate();
  const { addForum, isLoading: isCreating } = useAddForum();

  const handleCreateForum = (data) => {
    if (UserData?.error) navigate("/auth/login");
    const forumData = {
      user_id: UserData.linked_id,
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags.split(",").map((tag) => tag.trim()),
    };
    addForum(forumData);
    reset();
    onClose();
  };

  if (isLoading || isCreating) return <h1>Loading...</h1>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          <Content>Add New Forum</Content>
        </h2>

        <form onSubmit={handleSubmit(handleCreateForum)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Content>Title</Content>
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Forum Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">
                <Content>Title is required.</Content>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Content>Description</Content>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Forum Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                <Content>Description is required.</Content>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              <Content>Category</Content>
            </label>
            <select
              id="category"
              {...register("category", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">
                <Content>Select a category</Content>
              </option>
              <option value="Legal">
                <Content>Legal</Content>
              </option>
              <option value="General">
                <Content>General</Content>
              </option>
              <option value="Dispute">
                <Content>Dispute</Content>
              </option>
              <option value="Mediation">
                <Content>Mediation</Content>
              </option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">
                <Content>Category is required.</Content>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Content>Tags</Content> (<Content>comma separated</Content>)
            </label>
            <input
              {...register("tags")}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="tag1, tag2, tag3"
            />
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
              <Content>Create Forum</Content>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForumModal;
