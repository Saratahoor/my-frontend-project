import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiLogout } from "../../utils/apiAuth";
import toast from "react-hot-toast";

function useLogout() {
  const query = useQueryClient();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiLogout(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["community"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logout, isLoading };
}

function LogOut() {
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    >
      🔓 Logout
    </button>
  );
}

export default LogOut;
