import React, { useState } from 'react';

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
      priority: "Normal"
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
      priority: "Normal"
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
      priority: "Normal"
    }
  ]
};

function TrackCase() {
  const [searchId, setSearchId] = useState('');
  const [foundCase, setFoundCase] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    const result = caseData.data.find((c) => c._id === searchId.trim());
    if (result) {
      setFoundCase(result);
      setNotFound(false);
    } else {
      setFoundCase(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Track Case Status</h2>
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
          >
            Track
          </button>
        </div>

        {notFound && (
          <p className="text-red-600 text-sm text-center">Case ID not found. Please check and try again.</p>
        )}

        {foundCase && (
          <div className="mt-6 space-y-2">
            <p><strong>Case ID:</strong> {foundCase._id}</p>
            <p><strong>Type:</strong> {foundCase.case_type}</p>
            <p><strong>Language:</strong> {foundCase.language}</p>
            <p><strong>Initiated by:</strong> {foundCase.initiated_by}</p>
            <p><strong>Mediation Mode:</strong> {foundCase.mediation_mode}</p>
            <p><strong>Status:</strong> {foundCase.status}</p>
            <p><strong>Priority:</strong> {foundCase.priority}</p>
            {foundCase.location && <p><strong>Location:</strong> {foundCase.location}</p>}
            {foundCase.rate && <p><strong>Rate:</strong> ₹{foundCase.rate}</p>}
            <p><strong>Parties:</strong> {foundCase.parties.join(', ')}</p>
            <p><strong>Mediator(s):</strong> {foundCase.assigned_mediator.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackCase;
