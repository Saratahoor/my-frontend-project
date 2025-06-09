import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function RegistrationSelector() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname !== "/auth/register") return <Outlet />;

  return (
    <div className=" w-screen bg-gradient-to-r from-orange-500 via-white to-green-500 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Register as</h2>
          <p className="mt-2 text-gray-600">Choose your registration type</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              navigate("/auth/register/user");
            }}
            className="w-full bg-blue-600 backdrop-blur-sm hover:bg-blue-700 text-gray-100 font-semibold py-3 px-6 rounded-lg border border-white/50 shadow-sm transition-colors"
          >
            User
          </button>

          <button
            onClick={() => {
              navigate("/auth/register/mediator");
            }}
            className="w-full bg-blue-600 backdrop-blur-sm hover:bg-blue-700 text-gray-100 font-semibold py-3 px-6 rounded-lg border border-white/50 shadow-sm transition-colors"
          >
            Mediator
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSelector;
