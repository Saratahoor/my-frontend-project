// ✅ RegistrationForm.js — Place this in your pages or components folder:

import { useState } from "react";

const RegistrationForm = () => {
  const [role, setRole] = useState("user");

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-8 border border-gray-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Registraion Form ({role})
      </h2>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-3 w-full rounded-md bg-white shadow-sm"
        >
          <option value="user">User</option>
          <option value="mediator">Mediator</option>
        </select>
      </div>

      {role === "user" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>
              <input
                className="border p-3 w-full rounded-md"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                className="border p-3 w-full rounded-md"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                className="border p-3 w-full rounded-md"
                type="email"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>
              <input
                className="border p-3 w-full rounded-md"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Location
              </label>
              <select className="border p-3 w-full rounded-md bg-white">
                <option>Bangalore</option>
                <option>Hyderabad</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Language Preference
              </label>
              <select className="border p-3 w-full rounded-md bg-white">
                <option>English</option>
                <option>Kannada</option>
                <option>Hindi</option>
                <option>Telugu</option>
                <option>Malayalam</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <>{/* Add mediator-specific fields here */}</>
      )}

      <button className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-md w-full hover:bg-blue-700 transition">
        Register
      </button>
    </div>
  );
};

export default RegistrationForm;
