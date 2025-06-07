import { useQuery } from "@tanstack/react-query";
import React from "react";
import { apiGetMediators } from "../../utils/apiAdmin";

const mediators2 = [
  {
    address: { city: "Delhi", state: "Delhi", country: "India" },
    _id: "MED1001",
    full_name: "Rajesh Khanna",
    DOB: "1980-05-15T00:00:00.000Z",
    gender: "Male",
    number: "+918765432201",
    email: "rajesh.khanna@example.com",
    languages_spoken: ["Hindi", "English"],
    specializations: ["Family Disputes", "Property Disputes"],
    mediation_type: ["Pre-Litigation", "Court-Referred"],
    education_qualification: ["LLB", "Mediation Training Certification"],
    years_of_experience: 12,
    profile_pic: "https://i.pravatar.cc/150?u=rajesh.khanna@example.com",
    cases: ["CASE1001"],
    price: 5000,
    status: "Available",
    mode: "Online",
    level: "Advanced",
    verification_status: "Verified",
  },
  {
    address: { city: "Mumbai", state: "Maharashtra", country: "India" },
    _id: "MED1002",
    full_name: "Sita Verma",
    DOB: "1975-09-10T00:00:00.000Z",
    gender: "Female",
    number: "+919876543210",
    email: "sita.verma@example.com",
    languages_spoken: ["Marathi", "English", "Hindi"],
    specializations: ["Property Disputes", "Business Disputes"],
    mediation_type: ["Court-Referred"],
    education_qualification: ["LLB", "Certified Mediator"],
    years_of_experience: 18,
    profile_pic: "https://i.pravatar.cc/150?u=sita.verma@example.com",
    cases: ["CASE1002"],
    price: 7000,
    status: "Available",
    mode: "Offline",
    level: "Expert",
    verification_status: "Verified",
  },
];

function getMediators() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mediators"],
    queryFn: apiGetMediators,
  });
  return { data, isLoading, isError };
}

function CheckMediators() {
  const { data: mediators, isLoading } = getMediators();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mediators.map((mediator) => (
        <div
          key={mediator._id}
          className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-6 hover:shadow-2xl transition"
        >
          <div className="flex flex-col items-center mb-4">
            {/* <img
              src={
                mediator.profile_pic || "https://i.pravatar.cc/150?u=fallback"
              }
              alt={mediator.full_name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.pravatar.cc/150?u=fallback";
              }}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            /> */}
            <h2 className="text-xl font-bold text-gray-900 mt-3">
              {mediator.full_name}
            </h2>
            <p className="text-sm text-gray-500">
              {mediator.gender}, Age{" "}
              {new Date().getFullYear() - new Date(mediator.DOB).getFullYear()}
            </p>
          </div>

          <div className="text-sm text-gray-700 space-y-1 w-full">
            <p>
              📍 {mediator.address.city}, {mediator.address.state}
            </p>
            <p>📞 {mediator.number}</p>
            <p>📧 {mediator.email}</p>
            <p>🗣️ Languages: {mediator.languages_spoken.join(", ")}</p>
            <p>⚖️ Specializations: {mediator.specializations.join(", ")}</p>
            <p>🎓 {mediator.education_qualification.join(", ")}</p>
            <p>💼 {mediator.years_of_experience} yrs experience</p>
            <p>💰 ₹{mediator.price} per case</p>
            <p>
              🧭 Mode: {mediator.mode} | Level: {mediator.level}
            </p>
            <p>
              📌 Status:{" "}
              <span className="text-blue-600 font-medium">
                {mediator.status}
              </span>
            </p>
            <p>
              ✔{" "}
              <span className="text-green-600">
                {mediator.verification_status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckMediators;
