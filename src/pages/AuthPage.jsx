import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Content from "../components/ui/Content";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();

  if (
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register"
  )
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
            <Content>Login</Content>
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "register"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => {
              setActiveTab("register");
              navigate("/auth/register");
            }}
          >
            <Content>Register</Content>
          </button>
        </div>

        {/* Form */}
        <Outlet />
      </div>
    );
  else return <Outlet />;
};

export default AuthPage;
