import { apiGetUnverifiedUsers, apiVerifyUser } from "../../utils/apiAdmin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function getUnverifiedUsers() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["unverified-user"],
    queryFn: apiGetUnverifiedUsers,
  });
  return { data, isLoading, isError, refetch };
}

function useVerifyUser() {
  const query = useQueryClient();
  const { mutate: verifyUser, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiVerifyUser(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["unverified-users"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { verifyUser, isLoading };
}

function VerifyUser() {
  const { data, isLoading, isError } = getUnverifiedUsers();
  const { verifyUser, isLoading: verifying } = useVerifyUser();
  const users = data?.data || [];

  function handleClick(data) {
    verifyUser(data);
  }

  if (isLoading || verifying)
    return <h1 className="text-center mt-8">Loading...</h1>;
  if (isError || !users.length)
    return <h1 className="text-center mt-8">No unverified users found.</h1>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-md rounded-lg p-4 w-full"
        >
          <div className="flex items-center mb-4">
            {/* Profile picture logic if needed */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user.full_name}
              </h2>
              <p className="text-sm text-gray-600">{user.user_type}</p>
            </div>
          </div>

          <div className="text-sm text-gray-700 space-y-1">
            <p>
              📍 {user.address?.city}, {user.address?.state}
            </p>
            <p>📧 {user.email}</p>
            <p>📞 {user.number}</p>
            <p>🗣️ Language: {user.language_preference}</p>
            <p>
              ✔️ Verification:{" "}
              <span className="text-yellow-600">
                {user.verification_status}
              </span>
            </p>
          </div>

          <div className="mt-4 flex justify-around">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
              onClick={() =>
                handleClick({ status: "Verified", user_id: user._id })
              }
            >
              Accept
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              onClick={() =>
                handleClick({ status: "Rejected", user_id: user._id })
              }
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VerifyUser;
