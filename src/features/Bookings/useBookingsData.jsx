import { useQuery } from "@tanstack/react-query";
import { apiFetchBookings } from "../../utils/apiBookings";

function useBookingsData() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookings"],
    queryFn: apiFetchBookings,
  });
  return { data, isLoading, isError };
}

export default useBookingsData;
