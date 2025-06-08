import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiAcceptCase,
  apiFetchMyCases,
  apiRejectCase,
  apiCreateMeeting,
  apiScheduleNewDate,
  apiScheduleVenue,
} from "../../utils/apiMediator";
import useLoginData from "../Auth/useLoginData";
import toast from "react-hot-toast";
import { useState } from "react";

const statusColors = {
  Filed: "bg-yellow-100 text-yellow-800",
  "Mediator Assigned": "bg-blue-100 text-blue-800",
  "Mediator Rejected": "bg-red-100 text-red-800",
  "In progress": "bg-purple-100 text-purple-800",
  Closed: "bg-green-100 text-green-800",
};

export function useGetMyCases(id) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-cases"],
    queryFn: () => apiFetchMyCases(id),
  });
  return { data, isLoading, isError, refetch };
}

const CheckCases = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [meetingAddress, setMeetingAddress] = useState("");
  const { data: UserData, isLoading: isDataLoading } = useLoginData();
  const { data, isLoading } = useGetMyCases(UserData.linked_id);
  const queryClient = useQueryClient();
  const myCases = data?.data;

  const acceptCaseMutation = useMutation({
    mutationFn: ({ mediatorId, caseId }) =>
      apiAcceptCase({ mediatorId, caseId }),
    onSuccess: () => {
      toast.success("Case accepted successfully");
      queryClient.invalidateQueries(["my-cases"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to accept case");
    },
  });

  const rejectCaseMutation = useMutation({
    mutationFn: ({ mediatorId, caseId }) =>
      apiRejectCase({ mediatorId, caseId }),
    onSuccess: () => {
      toast.success("Case rejected successfully");
      queryClient.invalidateQueries(["my-cases"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reject case");
    },
  });

  const scheduleNewDateMutation = useMutation({
    mutationFn: ({ mediatorId, caseId, scheduled_date }) =>
      apiScheduleNewDate({ mediatorId, caseId, scheduled_date }),
    onSuccess: () => {
      toast.success("Meeting rescheduled successfully");
      queryClient.invalidateQueries(["my-cases"]);
      setShowDatePicker(false);
      setSelectedCase(null);
      setSelectedDate(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reschedule meeting");
    },
  });

  const scheduleVenueMutation = useMutation({
    mutationFn: ({ mediatorId, caseId, meeting_address }) =>
      apiScheduleVenue({ mediatorId, caseId, meeting_address }),
    onSuccess: () => {
      toast.success("Venue scheduled successfully");
      queryClient.invalidateQueries(["my-cases"]);
      setShowVenueModal(false);
      setSelectedCase(null);
      setMeetingAddress("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to schedule venue");
    },
  });

  const handleAcceptCase = (caseDetails) => {
    acceptCaseMutation.mutate({
      mediatorId: UserData.linked_id,
      caseId: caseDetails._id,
    });
  };

  const handleRejectCase = (caseDetails) => {
    rejectCaseMutation.mutate({
      mediatorId: UserData.linked_id,
      caseId: caseDetails._id,
    });
  };

  const handleScheduleDate = (caseDetails) => {
    setSelectedCase(caseDetails);
    setShowDatePicker(true);
  };

  const handleScheduleVenue = (caseDetails) => {
    setSelectedCase(caseDetails);
    setShowVenueModal(true);
  };

  // Add handler for form submission
  const handleVenueSubmit = (e) => {
    e.preventDefault();
    if (!meetingAddress.trim()) {
      toast.error("Please enter meeting address");
      return;
    }

    scheduleVenueMutation.mutate({
      mediatorId: UserData.linked_id,
      caseId: selectedCase._id,
      meeting_address: meetingAddress.trim(),
    });
  };

  const handlePrepareVerdict = (caseDetails) => {
    console.log("Preparing verdict for case:", caseDetails);
  };

  const createMeetingMutation = useMutation({
    mutationFn: ({ mediatorId, caseId, scheduled_date }) =>
      apiCreateMeeting({ mediatorId, caseId, scheduled_date }),
    onSuccess: () => {
      toast.success("Meeting created successfully");
      queryClient.invalidateQueries(["my-cases"]);
      setShowDatePicker(false);
      setSelectedCase(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create meeting");
    },
  });

  const handleCreateMeeting = (caseDetails) => {
    setSelectedCase(caseDetails);
    setShowDatePicker(true);
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error("Please select date and time");
      return;
    }

    // If case status is "In Progress", use scheduleNewDate mutation
    if (selectedCase.status === "In Progress") {
      scheduleNewDateMutation.mutate({
        mediatorId: UserData.linked_id,
        caseId: selectedCase._id,
        scheduled_date: selectedDate.toISOString(),
      });
    } else {
      // Otherwise use the existing createMeeting mutation
      createMeetingMutation.mutate({
        mediatorId: UserData.linked_id,
        caseId: selectedCase._id,
        scheduled_date: selectedDate.toISOString(),
      });
    }
  };

  if (isLoading || isDataLoading) return <h1>Loading...</h1>;

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
                <strong>Mediation Mode:</strong> {item.mediation_mode}
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
              {item.status === "In Progress" && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Next Meeting:</strong>{" "}
                    {new Date(item.schedule_date).toLocaleString()}
                  </p>
                  {item.meet_link && (
                    <p className="text-sm  text-gray-700">
                      <strong>Meet Link:</strong>{" "}
                      {item.is_meeting_active ? (
                        <a
                          href={item.meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Join Meeting
                        </a>
                      ) : (
                        <span>
                          Meeting Link will be displayed 5 mins before scheduled
                          date
                        </span>
                      )}
                    </p>
                  )}
                  {item.location && (
                    <p className="text-sm  text-gray-700">
                      <strong>Location: </strong>
                      <span>{item.location}</span>
                    </p>
                  )}
                </div>
              )}
              <div className="mt-4 space-x-3">
                {item.status === "Filed" && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAcceptCase(item)}
                      disabled={acceptCaseMutation.isPending}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                      {acceptCaseMutation.isPending
                        ? "Accepting..."
                        : "Accept Case"}
                    </button>
                    <button
                      onClick={() => handleRejectCase(item)}
                      disabled={rejectCaseMutation.isPending}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                    >
                      {rejectCaseMutation.isPending
                        ? "Rejecting..."
                        : "Reject Case"}
                    </button>
                  </div>
                )}

                {item.status === "Mediator Assigned" &&
                  item.mediation_mode === "Online" && (
                    <button
                      onClick={() => handleCreateMeeting(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Create Meeting
                    </button>
                  )}
                {item.status === "Mediator Assigned" &&
                  item.mediation_mode === "Offline" && (
                    <button
                      onClick={() => handleScheduleVenue(item)}
                      disabled={scheduleVenueMutation.isPending}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {scheduleVenueMutation.isPending
                        ? "Scheduling..."
                        : "Schedule Venue"}
                    </button>
                  )}

                {item.status === "In Progress" && (
                  <>
                    <button
                      onClick={() => handleScheduleDate(item)}
                      disabled={scheduleNewDateMutation.isPending}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {scheduleNewDateMutation.isPending
                        ? "Scheduling..."
                        : "Schedule New Date"}
                    </button>
                    <button
                      onClick={() => handlePrepareVerdict(item)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Prepare Verdict
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showVenueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Schedule Venue</h3>
            <form onSubmit={handleVenueSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Address
                </label>
                <textarea
                  value={meetingAddress}
                  onChange={(e) => setMeetingAddress(e.target.value)}
                  placeholder="Enter complete meeting address"
                  rows={4}
                  className="w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={scheduleVenueMutation.isPending}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {scheduleVenueMutation.isPending
                    ? "Scheduling..."
                    : "Schedule Venue"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowVenueModal(false);
                    setSelectedCase(null);
                    setMeetingAddress("");
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Schedule Meeting</h3>
            <form onSubmit={handleDateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date and Time
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  className="w-full border rounded-md shadow-sm p-2"
                  placeholderText="Click to select date and time"
                  timeCaption="Time"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={
                    createMeetingMutation.isPending ||
                    scheduleNewDateMutation.isPending
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {createMeetingMutation.isPending ||
                  scheduleNewDateMutation.isPending
                    ? "Scheduling..."
                    : selectedCase?.status === "In Progress"
                    ? "Reschedule Meeting"
                    : "Create Meeting"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDatePicker(false);
                    setSelectedCase(null);
                    setSelectedDate(null);
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckCases;
