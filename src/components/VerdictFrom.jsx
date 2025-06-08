import { useState } from "react";
import Content from "./ui/Content";
import VerdictManager from "./VerdictManager";

export default function VerdictForm({ caseDetails, onClose }) {
  const [showVerdictManager, setShowVerdictManager] = useState(false);
  const [verdictDetails, setVerdictDetails] = useState({
    summary: "",
    resolution: "",
    remarks: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowVerdictManager(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
        {!showVerdictManager ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                <Content>Prepare Verdict</Content>
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Case ID:</strong> {caseDetails._id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Case Type:</strong> {caseDetails.case_type}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Content>Summary</Content>
                </label>
                <textarea
                  value={verdictDetails.summary}
                  onChange={(e) =>
                    setVerdictDetails((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Content>Resolution</Content>
                </label>
                <textarea
                  value={verdictDetails.resolution}
                  onChange={(e) =>
                    setVerdictDetails((prev) => ({
                      ...prev,
                      resolution: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Content>Additional Remarks</Content>
                </label>
                <textarea
                  value={verdictDetails.remarks}
                  onChange={(e) =>
                    setVerdictDetails((prev) => ({
                      ...prev,
                      remarks: e.target.value,
                    }))
                  }
                  rows={2}
                  className="w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Content>Cancel</Content>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Content>Proceed to Upload</Content>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="space-y-4">
            <VerdictManager
              caseId={caseDetails._id}
              verdictDetails={verdictDetails}
            />
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
              >
                <Content>Close</Content>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
