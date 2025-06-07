import React from "react";

const mediator = {
  address: {
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
  },
  _id: "MED1003",
  full_name: "Amit Trivedi",
  DOB: "1985-09-10T00:00:00.000Z",
  gender: "Male",
  number: "+918765432203",
  email: "amit.trivedi@example.com",
  languages_spoken: ["Gujarati", "Hindi", "English"],
  specializations: ["Business Disputes", "Banking Disputes"],
  mediation_type: ["Court-Referred"],
  education_qualification: ["LLB", "Diploma in ADR"],
  years_of_experience: 10,
  profile_pic: "",
  cases: ["CASE1003", "CASE1011"],
  price: 6000,
  status: "Available",
  mode: "Offline",
  level: "Intermediate",
  verification_status: "Pending",
};

const getProfilePic = (gender, email) => {
  if (gender === "Male") {
    return "https://randomuser.me/api/portraits/men/32.jpg";
  } else if (gender === "Female") {
    return "https://randomuser.me/api/portraits/women/44.jpg";
  }
  return `https://i.pravatar.cc/150?u=${email}`;
};

function VerifyMediator() {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-4">
          <img
            src={getProfilePic(mediator.gender, mediator.email)}
            alt={mediator.full_name}
            className="w-20 h-20 rounded-full object-cover shadow-sm mb-2"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            {mediator.full_name}
          </h2>
          <p className="text-sm text-gray-600">
            {mediator.gender}, Age{" "}
            {new Date().getFullYear() -
              new Date(mediator.DOB).getFullYear()}
          </p>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p>📍 {mediator.address.city}, {mediator.address.state}</p>
          <p>📧 {mediator.email}</p>
          <p>📞 {mediator.number}</p>
          <p>🗣️ {mediator.languages_spoken.join(", ")}</p>
          <p>⚖️ {mediator.specializations.join(", ")}</p>
          <p>💼 {mediator.years_of_experience} yrs | ₹{mediator.price}</p>
          <p>🎯 {mediator.level} | {mediator.mode}</p>
          <p>✔️ <span className="text-yellow-600">{mediator.verification_status}</span></p>
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

export default VerifyMediator;
