import { useForm } from "react-hook-form";
import useLoginData from "../Auth/useLoginData";
import useAcceptCase from "../Bookings/useAcceptCase";
import Content from "../../components/ui/Content";

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
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <Content>Accept Case</Content>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Content>Party IDs</Content> (<Content>comma separated</Content>)
            </label>
            <input
              type="text"
              {...register("party_ids", {
                required: <Content>Party IDs are required</Content>,
              })}
              placeholder="USER1001, USER1002"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Content>Mediator ID</Content>
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
              <Content>Rate</Content> (₹)
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
              placeholder="Eg: 5000"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Content>Mediation Mode</Content>
            </label>
            <select
              {...register("mediation_mode", {
                required: "Mediation mode is required",
              })}
              className="w-full border p-2 rounded"
            >
              <option value="">
                -- <Content>Select Mode</Content> --
              </option>
              <option value="Online">
                <Content>Online</Content>
              </option>
              <option value="Offline">
                <Content>Offline</Content>
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
              <Content>Submit</Content>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptCaseModal;
