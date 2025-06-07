import React from "react";

const user = {
  address: {
    city: "Delhi",
    state: "Delhi",
    country: "India",
  },
  _id: "USER1001",
  full_name: "Rahul Sharma",
  number: "+918765432101",
  email: "rahul.sharma@example.com",
  language_preference: "Hindi",
  user_type: "LegalAid",
  cases_involved: ["CASE1001"],
  verification_status: "Pending",
};

const getProfilePic = (email) =>
  `https://i.pravatar.cc/150?u=${email}`;

function VerifyUser() {
  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
        <div className="flex items-center mb-4">
          <img
            src={getProfilePic(user.email)}
            alt={user.full_name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {user.full_name}
            </h2>
            <p className="text-sm text-gray-600">{user.user_type}</p>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p>📍 {user.address.city}, {user.address.state}</p>
          <p>📧 {user.email}</p>
          <p>📞 {user.number}</p>
          <p>🗣️ Language: {user.language_preference}</p>
          <p>📁 Cases: {user.cases_involved.join(", ")}</p>
          <p>
            ✔️ Verification:{" "}
            <span className="text-yellow-600">{user.verification_status}</span>
          </p>
        </div>

        <div className="mt-4 flex justify-around">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">
            Accept
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
