import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 ${activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "register" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
