import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiAcceptCase } from "../../utils/apiBookings";

export default function useAcceptCase() {
  const query = useQueryClient();
  const { mutate: acceptCase, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiAcceptCase(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["bookings"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { acceptCase, isLoading };
}
