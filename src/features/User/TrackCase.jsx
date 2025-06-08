import { useQuery } from "@tanstack/react-query";
import { apiTrackMyCase } from "../../utils/apiUser";
import { useState } from "react";
import useLoginData from "../Auth/useLoginData";
import { set } from "react-hook-form";

function TrackCase() {
  const [searchId, setSearchId] = useState("");
  const [caseResult, setCaseResult] = useState(null);

  const { data: UserData, isLoading: isDataLoading } = useLoginData();

  const {
    data: caseData,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["track-my-case"],
    queryFn: () =>
      apiTrackMyCase({
        user_id: UserData.linked_id,
        case_id: searchId.trim(),
      }),
    enabled: false,
    staleTime: Infinity,
    cacheTime: 0,
  });

  const handleTrack = async () => {
    setCaseResult(null);
    if (!searchId.trim()) return;

    const { data } = await refetch();
    if (data.error) setCaseResult({ error: data.message });
    if (data.data) setCaseResult(data.data);
    setSearchId("");
  };

  if (isDataLoading || isLoading) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Track Case Status
        </h2>
        <div className="flex mb-4 space-x-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Case ID"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            onClick={handleTrack}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isFetching}
          >
            {isFetching ? "Tracking..." : "Track"}
          </button>
        </div>

        {caseResult && caseResult.error && (
          <p className="text-red-600 text-sm text-center">
            Case ID not found. Please check and try again.
          </p>
        )}

        {caseResult && !caseResult.error && (
          <div className="mt-6 space-y-2">
            <p>
              <strong>Case ID:</strong> {caseResult._id}
            </p>
            <p>
              <strong>Type:</strong> {caseResult.case_type}
            </p>
            <p>
              <strong>Language:</strong> {caseResult.language}
            </p>
            <p>
              <strong>Initiated by:</strong> {caseResult.initiated_by}
            </p>
            <p>
              <strong>Mediation Mode:</strong> {caseResult.mediation_mode}
            </p>
            <p>
              <strong>Status:</strong> {caseResult.status}
            </p>
            <p>
              <strong>Priority:</strong> {caseResult.priority}
            </p>
            {caseResult.scheduled_date && (
              <>
                <p>
                  <strong>Schedule Date:</strong>{" "}
                  {new Date(caseResult.scheduled_date).toLocaleString()}
                </p>
                <p>
                  <strong>Booking Mode:</strong>{" "}
                  {caseResult.schedule.booking_mode}
                </p>
              </>
            )}
            {caseResult.location && (
              <p>
                <strong>Location:</strong> {caseResult.location}
              </p>
            )}
            {caseResult.rate && (
              <p>
                <strong>Rate:</strong> ₹{caseResult.rate}
              </p>
            )}
            <p>
              <strong>Parties:</strong> {caseResult.parties?.join(", ")}
            </p>
            <p>
              <strong>Mediator(s):</strong> {caseResult.assigned_mediator}
            </p>
            {caseResult.meet_link && (
              <p className="text-sm">
                <strong>Meet Link:</strong>{" "}
                {caseResult.is_meeting_active ? (
                  <a
                    href={caseResult.meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Join Meeting
                  </a>
                ) : (
                  <span>
                    Meeting Link will be displayed 5 mins before scheduled date
                  </span>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackCase;
