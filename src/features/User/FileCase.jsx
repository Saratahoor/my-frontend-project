import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLoginData from "../Auth/useLoginData";
import { useForm, useFieldArray } from "react-hook-form";
import { apiFileCase } from "../../utils/apiUser";
import toast from "react-hot-toast";
import Content from "../../components/ui/Content";

function useFileCase() {
  const query = useQueryClient();
  const { mutate: bookCase, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiFileCase(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { bookCase, isLoading };
}

function FileCase() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "",
      case_type: "",
      language: "",
      phone_numbers: [{ number: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone_numbers",
  });

  const { data: UserData, isLoading } = useLoginData();
  const { bookCase, isLoading: booking } = useFileCase();

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      phone_numbers: data.phone_numbers.map((item) => item.number),
    };
    bookCase(
      { user_id: UserData.linked_id, ...formattedData },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  const indianLanguages = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punjabi",
    "Assamese",
    "Maithili",
    "Santali",
    "Kashmiri",
    "Nepali",
    "Konkani",
    "Sindhi",
    "Dogri",
  ];

  if (isLoading || booking) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          <Content>File a Case</Content>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Mode Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Content>Mode</Content>
            </label>
            <select
              {...register("mode", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">
                <Content>Select Mode</Content>
              </option>
              <option value="Online">
                <Content>Online</Content>
              </option>
              <option value="Offline">
                <Content>Offline</Content>
              </option>
            </select>
            {errors.mode && (
              <p className="text-red-500 text-sm mt-1">
                <Content>Mode is required.</Content>
              </p>
            )}
          </div>

          {/* Case Type Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Content>Case Type</Content>
            </label>
            <input
              type="text"
              placeholder="e.g., Property Dispute"
              {...register("case_type", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.case_type && (
              <p className="text-red-500 text-sm mt-1">
                <Content>Case type is required.</Content>
              </p>
            )}
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Content>Language</Content>
            </label>
            <select
              {...register("language", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">
                <Content>Select Language</Content>
              </option>
              {indianLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  <Content>{lang}</Content>
                </option>
              ))}
            </select>
            {errors.language && (
              <p className="text-red-500 text-sm mt-1">
                <Content>Language is required.</Content>
              </p>
            )}
          </div>

          {/* Phone Numbers Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Content>Party Phone Numbers</Content>
            </label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    type="tel"
                    {...register(`phone_numbers.${index}.number`, {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[\d\s-]+$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    placeholder="Enter phone number"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {errors.phone_numbers?.[index]?.number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_numbers[index].number.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => append({ number: "" })}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <Content>Add Another Phone Number</Content>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FileCase;
