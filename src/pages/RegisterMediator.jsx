import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiCreateMediator } from "../utils/apiAdmin";

const languages = [
  "English",
  "Malayalam",
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu",
];

const specializations = [
  "Family Disputes",
  "Property Disputes",
  "Commercial Disputes",
  "Civil Disputes",
  "Community Disputes",
];

const mediationTypes = ["Private", "Court-Referred", "Community", "Online"];

const qualifications = [
  "LLB",
  "LLM",
  "Mediation Training Certification",
  "Bar Council Certification",
];

const modes = ["Online", "Offline", "Hybrid"];
const levels = ["Basic", "Intermediate", "Advanced"];

function RegisterMediator() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "Available",
      verification_status: "Pending",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => apiCreateMediator(data),
    onSuccess: () => {
      toast.success("Registration successful! Awaiting verification.");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
      navigate("/auth/register/mediator");
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
      years_of_experience: parseInt(data.years_of_experience),
      price: parseInt(data.price),
      languages_spoken: Array.isArray(data.languages_spoken)
        ? data.languages_spoken
        : [data.languages_spoken],
      specializations: Array.isArray(data.specializations)
        ? data.specializations
        : [data.specializations],
      mediation_type: Array.isArray(data.mediation_type)
        ? data.mediation_type
        : [data.mediation_type],
      education_qualification: Array.isArray(data.education_qualification)
        ? data.education_qualification
        : [data.education_qualification],
      status: "Available",
      verification_status: "Pending",
      created_at: new Date(),
      updated_at: new Date(),
    };
    mutation.mutate(formattedData);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-500 via-white to-green-500 py-12">
      <div className="max-w-2xl mx-auto bg-white/30 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Mediator Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                {...register("full_name", { required: "Name is required" })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <span className="text-red-500 text-sm">
                  {errors.full_name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                {...register("DOB", { required: "Date of Birth is required" })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              />
              {errors.DOB && (
                <span className="text-red-500 text-sm">
                  {errors.DOB.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                {...register("number", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+\d{12}$/,
                    message:
                      "Enter valid phone number with country code (+919XXXXXXXXX)",
                  },
                })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
                placeholder="+919XXXXXXXXX"
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
                placeholder="email@example.com"
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
                placeholder="Min. 8 characters"
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
                placeholder="Your city"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">State</label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
                placeholder="Your state"
              />
              {errors.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Languages Spoken
              </label>
              <select
                multiple
                {...register("languages_spoken", {
                  required: "Select at least one language",
                })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Hold Ctrl/Cmd to select multiple
              </p>
              {errors.languages_spoken && (
                <span className="text-red-500 text-sm">
                  {errors.languages_spoken.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Specializations
              </label>
              <select
                multiple
                {...register("specializations", {
                  required: "Select at least one specialization",
                })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Hold Ctrl/Cmd to select multiple
              </p>
              {errors.specializations && (
                <span className="text-red-500 text-sm">
                  {errors.specializations.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Mediation Types
              </label>
              <select
                multiple
                {...register("mediation_type", {
                  required: "Select at least one type",
                })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              >
                {mediationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Hold Ctrl/Cmd to select multiple
              </p>
              {errors.mediation_type && (
                <span className="text-red-500 text-sm">
                  {errors.mediation_type.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Qualifications</label>
              <select
                multiple
                {...register("education_qualification", {
                  required: "Select at least one qualification",
                })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              >
                {qualifications.map((qual) => (
                  <option key={qual} value={qual}>
                    {qual}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Hold Ctrl/Cmd to select multiple
              </p>
              {errors.education_qualification && (
                <span className="text-red-500 text-sm">
                  {errors.education_qualification.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                {...register("years_of_experience", {
                  required: "Experience is required",
                  min: { value: 0, message: "Cannot be negative" },
                })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
                placeholder="Years of experience"
              />
              {errors.years_of_experience && (
                <span className="text-red-500 text-sm">
                  {errors.years_of_experience.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Cannot be negative" },
                })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
                placeholder="Session price in ₹"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Mode</label>
              <select
                {...register("mode", { required: "Mode is required" })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              >
                <option value="">Select Mode</option>
                {modes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
              {errors.mode && (
                <span className="text-red-500 text-sm">
                  {errors.mode.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Level</label>
              <select
                {...register("level", { required: "Level is required" })}
                className="w-full px-4 py-2 rounded-lg border bg-white/50"
              >
                <option value="">Select Level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.level && (
                <span className="text-red-500 text-sm">
                  {errors.level.message}
                </span>
              )}
            </div>
          </div>

          <div className="bg-yellow-50/50 p-4 rounded-lg mt-6">
            <p className="text-sm text-yellow-700">
              Note: Your registration will be reviewed by our team. You will be
              notified once your account is verified.
            </p>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {mutation.isPending ? "Submitting..." : "Submit for Verification"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterMediator;
