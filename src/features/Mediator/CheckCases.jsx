// pages/CheckCases.jsx
import { useQuery } from "@tanstack/react-query";
import { apiFetchMyCases } from "../../utils/apiMediator";
import useLoginData from "../Auth/useLoginData";

const mediatorId = "MED1001"; // this could come from auth in a real app

const caseData = {
  data: [
    {
      _id: "CASE1001",
      case_type: "Family Dispute",
      language: "Hindi",
      parties: ["USER1001", "USER1002"],
      initiated_by: "USER1001",
      location: "Delhi",
      mediation_mode: "Online",
      assigned_mediator: ["MED1001"],
      status: "Mediator Assigned",
      result: null,
      rate: 5000,
      priority: "Normal",
    },
    {
      _id: "CASE-c854bd40-1b38-4787-9c29-5f3954882b6d",
      case_type: "Personal",
      language: "English",
      parties: ["USER1001", "USER1002", "USER1003"],
      initiated_by: "USER1001",
      mediation_mode: "Online",
      assigned_mediator: ["MED1001"],
      status: "Filed",
      priority: "Normal",
    },
    {
      _id: "CASE-6919d523-46ae-4adf-b24d-07b8451f4503",
      case_type: "Personal",
      language: "English",
      parties: ["USER1001", "USER1002", "USER1003"],
      initiated_by: "USER1001",
      mediation_mode: "Online",
      assigned_mediator: ["MED1001"],
      status: "Filed",
      priority: "Normal",
    },
  ],
};

const statusColors = {
  Filed: "bg-yellow-100 text-yellow-800",
  "Mediator Assigned": "bg-blue-100 text-blue-800",
  "Mediator Rejected": "bg-red-100 text-red-800",
  "In progress": "bg-purple-100 text-purple-800",
  Closed: "bg-green-100 text-green-800",
};

function useGetMyCases(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-cases"],
    queryFn: () => apiFetchMyCases(id),
  });
  return { data, isLoading, isError };
}

const CheckCases = () => {
  const { data: UserData, isLoading: isDataLoading } = useLoginData();
  const { data, isLoading } = useGetMyCases(UserData.linked_id);
  const myCases = data?.data;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="p-10">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">My Cases</h2>
        <p className="text-lg text-gray-700">
          Here you can view and manage the cases assigned to you.
        </p>
      </div>

      {myCases?.length === 0 ? (
        <p className="text-center text-gray-600">No cases assigned yet.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {myCases?.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.case_type}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusColors[item.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p>
                <strong>Case ID:</strong> {item._id}
              </p>
              <p>
                <strong>Language:</strong> {item.language}
              </p>
              <p>
                <strong>Priority:</strong> {item.priority}
              </p>
              {item.location && (
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
              )}
              {item.rate && (
                <p>
                  <strong>Rate:</strong> ₹{item.rate}
                </p>
              )}
              <p>
                <strong>Parties:</strong> {item.parties.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckCases;
