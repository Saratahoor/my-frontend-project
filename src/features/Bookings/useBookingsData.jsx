import { useQuery } from "@tanstack/react-query";
import { apiFetchBookings } from "../../utils/apiBookings";

function useBookingsData() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: apiFetchBookings,
  });
  return { data, isLoading, isError, refetch };
}

export default useBookingsData;
