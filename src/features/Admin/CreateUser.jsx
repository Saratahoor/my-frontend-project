import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiCreateUser } from "../../utils/apiAdmin";

function CreateUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      full_name: "",
      number: "",
      email: "",
      password: "",
      address: {
        city: "",
        state: "",
        country: "India",
      },
      user_type: "Citizen",
      language_preference: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: apiCreateUser,
    onSuccess: (data) => {
      toast.success("User created successfully!");
      reset(); // Reset form
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });

  const onSubmit = (data) => {
    createUserMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("full_name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("number", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[\d\s-]+$/,
                  message: "Invalid phone number",
                },
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-600">
                {errors.number.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("address.city", { required: "City is required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.address?.city && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              {...register("address.state", {
                required: "State is required",
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.address?.state && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Type
            </label>
            <select
              {...register("user_type")}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Citizen">Citizen</option>
              <option value="Police">Police</option>
              <option value="LegalAid">Legal Aid</option>
              <option value="NGO">NGO</option>
              <option value="Court">Court</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language Preference
            </label>
            <input
              {...register("language_preference", {
                required: "Language preference is required",
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.language_preference && (
              <p className="mt-1 text-sm text-red-600">
                {errors.language_preference.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isSubmitting || createUserMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
          >
            {createUserMutation.isPending ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>

      {createUserMutation.isSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-semibold text-green-800">
            User Created Successfully
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>User ID: {createUserMutation.data._id}</p>
            <p>Auth ID: {createUserMutation.data.auth_id}</p>
            <p>Role: {createUserMutation.data.role}</p>
            <p>Level: {createUserMutation.data.level}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateUser;
