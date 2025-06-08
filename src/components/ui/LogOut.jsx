import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiLogout } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import Content from "./Content";
import PageLoader from "../PageLoader";

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
    navigate("/");
  };

  if (isLoading) return <PageLoader />;

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    >
      🔓 <Content>Logout</Content>
    </button>
  );
}

export default LogOut;
