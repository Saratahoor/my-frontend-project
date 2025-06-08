import { useQuery } from "@tanstack/react-query";
import { apiTrackMyCase } from "../../utils/apiUser";
import { useState } from "react";
import useLoginData from "../Auth/useLoginData";
import { useMeetingScheduler } from "../../hooks/useMeetingScheduler";
import Content from "../../components/ui/Content";
import PageLoader from "../../components/PageLoader";

function TrackCase() {
  const [searchId, setSearchId] = useState("");
  const [caseResult, setCaseResult] = useState(null);

  const { data: UserData, isLoading: isDataLoading } = useLoginData();

  useMeetingScheduler(caseResult);

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

  if (isDataLoading || isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          <Content>Track Case Status</Content>
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
            {isFetching ? (
              <Content>Tracking...</Content>
            ) : (
              <Content>Track</Content>
            )}
          </button>
        </div>

        {caseResult && caseResult.error && (
          <p className="text-red-600 text-sm text-center">
            <Content>Case ID not found.Please check and try again</Content>.
          </p>
        )}

        {caseResult && !caseResult.error && (
          <div className="mt-6 space-y-2">
            <p>
              <strong>
                <Content>Case ID</Content>:
              </strong>{" "}
              {caseResult._id}
            </p>
            <p>
              <strong>
                <Content>Type</Content>:
              </strong>{" "}
              <Content>{caseResult.case_type}</Content>
            </p>
            <p>
              <strong>
                <Content>Language</Content>:
              </strong>{" "}
              <Content>{caseResult.language}</Content>
            </p>
            <p>
              <strong>
                <Content>Initiated by</Content>:
              </strong>{" "}
              {caseResult.initiated_by}
            </p>
            <p>
              <strong>
                <Content>Mediation Mode</Content>:
              </strong>{" "}
              <Content>{caseResult.mediation_mode}</Content>
            </p>
            <p>
              <strong>
                <Content>Status</Content>:
              </strong>{" "}
              <Content>{caseResult.status}</Content>
            </p>
            <p>
              <strong>
                <Content>Priority</Content>:
              </strong>{" "}
              <Content>{caseResult.priority}</Content>
            </p>
            {caseResult.scheduled_date && (
              <>
                <p>
                  <strong>
                    <Content>Schedule Date</Content>:
                  </strong>{" "}
                  {new Date(caseResult.scheduled_date).toLocaleString()}
                </p>
                <p>
                  <strong>
                    <Content>Booking Mode</Content>:
                  </strong>{" "}
                  <Content>{caseResult.schedule.booking_mode}</Content>
                </p>
              </>
            )}
            {caseResult.location && (
              <p>
                <strong>
                  <Content>Location</Content>:
                </strong>{" "}
                <Content>{caseResult.location}</Content>
              </p>
            )}
            {caseResult.rate && (
              <p>
                <strong>
                  <Content>Rate</Content>:
                </strong>{" "}
                ₹{caseResult.rate}
              </p>
            )}
            <p>
              <strong>
                <Content>Parties</Content>:
              </strong>{" "}
              {caseResult.parties?.join(", ")}
            </p>
            <p>
              <strong>
                <Content>Mediator(s)</Content>:
              </strong>{" "}
              {caseResult.assigned_mediator}
            </p>
            {caseResult.meet_link && (
              <p className="text-sm">
                <strong>
                  <Content>Meet Link</Content>:
                </strong>{" "}
                {caseResult.is_meeting_active ? (
                  <a
                    href={caseResult.meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    <Content>Join Meeting</Content>
                  </a>
                ) : (
                  <span>
                    <Content>
                      Meeting Link will be displayed 5 mins before scheduled
                      date
                    </Content>
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
