import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUserClock,
  FaUserTie,
} from "react-icons/fa";
import useBookingsData from "../Bookings/useBookingsData";
import { getUnverifiedMediators } from "./VerifyMediator";
import { getUnverifiedUsers } from "./VerifyUser";
import { getMediators } from "./CheckMediators";
import { useEffect } from "react";

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value || 0}</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useBookingsData();
  const {
    data: mediators,
    isLoading: mediatorsLoading,
    refetch: refetchMediators,
  } = getMediators();
  const {
    data: unverifiedMediators,
    isLoading: unverifiedMediatorsLoading,
    refetch: refetchUnverifiedMediators,
  } = getUnverifiedMediators();
  const {
    data: unverifiedUsers,
    isLoading: unverifiedUsersLoading,
    refetch: refetchUnverifiedUsers,
  } = getUnverifiedUsers();
  const bookings = bookingsData?.data || [];

  useEffect(() => {
    const fetchAllData = () => {
      refetchBookings();
      refetchMediators();
      refetchUnverifiedMediators();
      refetchUnverifiedUsers();
    };

    fetchAllData();
  }, [
    refetchBookings,
    refetchMediators,
    refetchUnverifiedMediators,
    refetchUnverifiedUsers,
  ]);

  if (
    bookingsLoading ||
    mediatorsLoading ||
    unverifiedMediatorsLoading ||
    unverifiedUsersLoading
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pendingBookings =
    bookings?.filter((b) => b.status === "In Progress").length || 0;
  const bookedBookings =
    bookings?.filter((b) => b.status === "Booked").length || 0;
  const cancelledBookings =
    bookings?.filter((b) => b.status === "Cancelled").length || 0;
  const totalMediators = mediators?.length || 0;
  const totalUnverifiedUsers = unverifiedUsers?.length || 0;
  const totalUnverifiedMediators = unverifiedMediators?.length || 0;

  const cards = [
    {
      title: "Pending Bookings",
      value: pendingBookings,
      icon: FaFileAlt,
      color: "bg-yellow-500",
    },
    {
      title: "Booked Cases",
      value: bookedBookings,
      icon: FaCheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Cancelled Bookings",
      value: cancelledBookings,
      icon: FaTimesCircle,
      color: "bg-red-500",
    },
    {
      title: "Unverified Users",
      value: totalUnverifiedUsers,
      icon: FaUserClock,
      color: "bg-orange-500",
    },
    {
      title: "Unverified Mediators",
      value: totalUnverifiedMediators,
      icon: FaUserClock,
      color: "bg-purple-500",
    },
    {
      title: "Total Mediators",
      value: totalMediators,
      icon: FaUserTie,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
