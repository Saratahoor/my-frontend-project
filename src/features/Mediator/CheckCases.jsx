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
import { useMeetingScheduler } from "../../hooks/useMeetingScheduler";
import Content from "../../components/ui/Content";
import VerdictForm from "../../components/VerdictFrom";

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
  const [showVerdictForm, setShowVerdictForm] = useState(false);
  const { data: UserData, isLoading: isDataLoading } = useLoginData();
  const { data, isLoading } = useGetMyCases(UserData.linked_id);
  const queryClient = useQueryClient();
  const myCases = data?.data;

  useMeetingScheduler(myCases);

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
    setSelectedCase(caseDetails);
    setShowVerdictForm(true);
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
    <div className="p-10 max-w-[1400px]">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          <Content>My Cases</Content>
        </h2>
        <p className="text-lg text-gray-700">
          <Content>
            Here you can view and manage the cases assigned to you.
          </Content>
        </p>
      </div>

      {myCases?.length === 0 ? (
        <p className="text-center text-gray-600">
          <Content>No cases assigned yet.</Content>
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {myCases?.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  <Content>{item.case_type}</Content>
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusColors[item.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  <Content>{item.status}</Content>
                </span>
              </div>
              <p>
                <strong>
                  <Content>Case ID</Content>:
                </strong>{" "}
                {item._id}
              </p>
              <p>
                <strong>
                  <Content>Mediation Mode</Content>:
                </strong>{" "}
                <Content>{item.mediation_mode}</Content>
              </p>
              <p>
                <strong>
                  <Content>Language</Content>:
                </strong>{" "}
                <Content>{item.language}</Content>
              </p>
              <p>
                <strong>
                  <Content>Priority</Content>:
                </strong>{" "}
                <Content>{item.priority}</Content>
              </p>
              {item.location && (
                <p>
                  <strong>
                    <Content>Location</Content>:
                  </strong>{" "}
                  <Content>{item.location}</Content>
                </p>
              )}
              {item.rate && (
                <p>
                  <strong>
                    <Content>Rate</Content>:
                  </strong>{" "}
                  ₹{item.rate}
                </p>
              )}
              <p>
                <strong>
                  <Content>Parties</Content>:
                </strong>{" "}
                {item.parties.join(", ")}
              </p>
              {item.status === "In Progress" && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Next Meeting:</strong>{" "}
                    {new Date(item.schedule_date).toLocaleString()}
                  </p>
                  {item.meet_link && (
                    <p className="text-sm  text-gray-700">
                      <strong>
                        <Content>Meet Link</Content>:
                      </strong>{" "}
                      {item.is_meeting_active ? (
                        <a
                          href={item.meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          <Content>Join Meeting</Content>
                        </a>
                      ) : (
                        <span>
                          <Content>
                            Meeting Link will be displayed 5 mins before
                            scheduled date
                          </Content>
                        </span>
                      )}
                    </p>
                  )}
                  {item.location && (
                    <p className="text-sm  text-gray-700">
                      <strong>
                        <Content>Location</Content>:{" "}
                      </strong>
                      <span>
                        <Content>{item.location}</Content>
                      </span>
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
                      {acceptCaseMutation.isPending ? (
                        <Content>Accepting...</Content>
                      ) : (
                        <Content>Accept Case</Content>
                      )}
                    </button>
                    <button
                      onClick={() => handleRejectCase(item)}
                      disabled={rejectCaseMutation.isPending}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                    >
                      {rejectCaseMutation.isPending ? (
                        <Content>Rejecting...</Content>
                      ) : (
                        <Content>Reject Case</Content>
                      )}
                    </button>
                  </div>
                )}

                {item.status === "Mediator Assigned" &&
                  item.mediation_mode === "Online" && (
                    <button
                      onClick={() => handleCreateMeeting(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Content>Create Meeting</Content>
                    </button>
                  )}
                {item.status === "Mediator Assigned" &&
                  item.mediation_mode === "Offline" && (
                    <button
                      onClick={() => handleScheduleVenue(item)}
                      disabled={scheduleVenueMutation.isPending}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {scheduleVenueMutation.isPending ? (
                        <Content>Scheduling...</Content>
                      ) : (
                        <Content>Schedule Venue</Content>
                      )}
                    </button>
                  )}

                {item.status === "In Progress" && (
                  <>
                    <button
                      onClick={() => handleScheduleDate(item)}
                      disabled={scheduleNewDateMutation.isPending}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {scheduleNewDateMutation.isPending ? (
                        <Content>Scheduling...</Content>
                      ) : (
                        <Content>Schedule New Date</Content>
                      )}
                    </button>
                    <button
                      onClick={() => handlePrepareVerdict(item)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <Content>Prepare Verdict</Content>
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
            <h3 className="text-lg font-semibold mb-4">
              <Content>Schedule Venue</Content>
            </h3>
            <form onSubmit={handleVenueSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Content>Meeting Address</Content>
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
                  {scheduleVenueMutation.isPending ? (
                    <Content>Scheduling...</Content>
                  ) : (
                    <Content>Schedule Venue</Content>
                  )}
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
            <h3 className="text-lg font-semibold mb-4">
              <Content>Schedule Meeting</Content>
            </h3>
            <form onSubmit={handleDateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Content>Select Date and Time</Content>
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
                  scheduleNewDateMutation.isPending ? (
                    <Content>Scheduling...</Content>
                  ) : selectedCase?.status === "In Progress" ? (
                    <Content>Reschedule Meeting</Content>
                  ) : (
                    <Content>Create Meeting</Content>
                  )}
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
                  <Content>Cancel</Content>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVerdictForm && selectedCase && (
        <VerdictForm
          caseDetails={selectedCase}
          onClose={() => {
            setShowVerdictForm(false);
            setSelectedCase(null);
          }}
        />
      )}
    </div>
  );
};

export default CheckCases;
