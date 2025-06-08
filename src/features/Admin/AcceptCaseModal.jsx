import { useForm } from "react-hook-form";
import useLoginData from "../Auth/useLoginData";
import useAcceptCase from "../Bookings/useAcceptCase";

const AcceptCaseModal = ({ bookingId, onClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      party_ids: "",
      mediator_id: "",
      mediation_mode: "",
      rate: "", // Add default value for rate
    },
  });
  const { data: UserData, isLoading } = useLoginData();
  const { acceptCase, isLoading: accepting } = useAcceptCase();

  const onSubmit = (data) => {
    const submission = {
      booking_id: bookingId,
      admin_id: UserData.linked_id,
      ...data,
      party_ids: data.party_ids.split(",").map((id) => id.trim()),
      rate: parseFloat(data.rate), // Convert rate to number
    };
    acceptCase(submission);
    reset();
    onClose();
  };

  if (isLoading || accepting) return <h1>Loading...</h1>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Accept Case</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Party IDs (comma separated)
            </label>
            <input
              type="text"
              {...register("party_ids", { required: "Party IDs are required" })}
              placeholder="USER1001, USER1002"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mediator ID
            </label>
            <input
              type="text"
              {...register("mediator_id", {
                required: "Mediator ID is required",
              })}
              placeholder="MED1001"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Add new Rate field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate (₹)
            </label>
            <input
              type="number"
              {...register("rate", {
                required: "Rate is required",
                min: {
                  value: 0,
                  message: "Rate must be positive",
                },
                validate: (value) =>
                  !isNaN(value) || "Please enter a valid number",
              })}
              placeholder="Enter rate amount"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mediation Mode
            </label>
            <select
              {...register("mediation_mode", {
                required: "Mediation mode is required",
              })}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Select Mode --</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptCaseModal;
