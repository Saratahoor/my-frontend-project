import { useQuery } from "@tanstack/react-query";
import {
  FaFileAlt,
  FaUserCheck,
  FaUserTimes,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import useLoginData from "../Auth/useLoginData";
import { useGetMyCases } from "./CheckCases";
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

const MediatorDashboard = () => {
  const { data: UserData, isLoading: isDataLoading } = useLoginData();
  const { data, isLoading, refetch } = useGetMyCases(UserData?.linked_id);
  const myCases = data?.data;

  useEffect(() => {
    if (UserData?.linked_id) {
      refetch();
    }
  }, [UserData?.linked_id, refetch]);

  if (isLoading || isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filedCases = myCases?.filter((c) => c.status === "Filed").length;
  const assignedCases = myCases?.filter(
    (c) => c.status === "Mediator Assigned"
  ).length;
  const rejectedCases = myCases?.filter(
    (c) => c.status === "Mediator Rejected"
  ).length;
  const inProgressCases = myCases?.filter(
    (c) => c.status === "In Progress"
  ).length;
  const closedCases = myCases?.filter((c) => c.status === "Closed").length;

  const cards = [
    {
      title: "Filed Cases",
      value: filedCases,
      icon: FaFileAlt,
      color: "bg-yellow-500",
    },
    {
      title: "Assigned Cases",
      value: assignedCases,
      icon: FaUserCheck,
      color: "bg-blue-500",
    },
    {
      title: "Rejected Cases",
      value: rejectedCases,
      icon: FaUserTimes,
      color: "bg-red-500",
    },
    {
      title: "In Progress Cases",
      value: inProgressCases,
      icon: FaSpinner,
      color: "bg-purple-500",
    },
    {
      title: "Closed Cases",
      value: closedCases,
      icon: FaCheckCircle,
      color: "bg-green-500",
    },
  ];

  if (isDataLoading || isLoading) return <h1>Loading...</h1>;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mediator Dashboard
          </h2>
          <p className="text-lg text-gray-700">
            Welcome! You can check your assigned cases and manage hearings from
            here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediatorDashboard;
