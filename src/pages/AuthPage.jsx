import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Toggle Buttons */}
      <div className="mb-8 flex gap-4 bg-white p-2 rounded-full shadow-lg">
        <button
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "login"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => {
            setActiveTab("login");
            navigate("/auth/login");
          }}
        >
          Login
        </button>
        <button
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "register"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => {
            setActiveTab("register");
            navigate("/auth/register");
          }}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <Outlet />
    </div>
  );
};

export default AuthPage;
