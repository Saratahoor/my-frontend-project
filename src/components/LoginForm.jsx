import { useForm } from "react-hook-form";
import useLogin from "../features/Auth/useLogin";
import PageLoader from "./PageLoader";
import Content from "./ui/Content";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { login, isLoading } = useLogin();

  const onSubmit = (data) => {
    login(data, {
      onSettled: () => {
        setValue("email", "");
        setValue("password", "");
      },
    });
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="w-[500px] bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-10 border border-gray-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        <Content>Login Form</Content>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            <Content>
              <Content>Email</Content>
            </Content>
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">
              <Content>{errors.email.message}</Content>
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            <Content>Password</Content>
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
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              <Content>{errors.password.message}</Content>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {isLoading ? (
            <Content>Logging in...</Content>
          ) : (
            <Content>Login</Content>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
