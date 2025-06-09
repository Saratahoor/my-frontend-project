import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiCreateUser } from "../utils/apiAdmin";

const userTypes = ["Citizen", "Police", "LegalAid", "NGO", "Court", "Other"];
const languages = ["English", "Kannada", "Hindi", "Telugu", "Tamil"];
const states = [
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Kerala",
  "Andhra Pradesh",
];

function RegisterUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => apiCreateUser(data),
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
      navigate("/auth/register/user");
    },
    onSettled: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      address: {
        city: data.city,
        state: data.state,
        country: "India",
      },
    };
    mutation.mutate(formattedData);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-500 via-white to-green-500 py-12">
      <div className="max-w-md mx-auto bg-white/30 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          User Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              {...register("full_name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
            />
            {errors.full_name && (
              <span className="text-red-500 text-sm">
                {errors.full_name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              {...register("number", {
                required: "Phone number is required",
              })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
              placeholder="9XXXXXXXXX"
            />
            {errors.number && (
              <span className="text-red-500 text-sm">
                {errors.number.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">
                {errors.city.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">State</label>
            <select
              {...register("state", { required: "State is required" })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="text-red-500 text-sm">
                {errors.state.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">User Type</label>
            <select
              {...register("user_type", { required: "User type is required" })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
            >
              <option value="">Select Type</option>
              {userTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.user_type && (
              <span className="text-red-500 text-sm">
                {errors.user_type.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Preferred Language
            </label>
            <select
              {...register("language_preference", {
                required: "Language is required",
              })}
              className="w-full px-4 py-2 rounded-lg border bg-white/50"
            >
              <option value="">Select Language</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            {errors.language_preference && (
              <span className="text-red-500 text-sm">
                {errors.language_preference.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
