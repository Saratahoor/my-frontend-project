import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDismissBooking } from "../../utils/apiBookings";

export default function useDissmissBooking() {
  const query = useQueryClient();
  const { mutate: dismissBooking, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiDismissBooking(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["bookings"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { dismissBooking, isLoading };
}
