import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { apiLogin } from "../../utils/apiAuth";

export default function useLogin() {
  const query = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiLogin(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/user/dashboard");
      query.setQueryData(["login"], data);
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/auth/login");
    },
  });

  return { login, isLoading };
}
