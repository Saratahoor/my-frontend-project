import React, { useState } from "react";

const bookings = [
  {
    _id: "BOOK1001",
    case_id: "CASE1001",
    created_by: "USER1001",
    scheduled_date: "2025-06-07T13:47:53.059Z",
    booking_mode: "Online",
    status: "Booked",
    booked_at: "2025-06-07T13:47:53.059Z",
  },
  {
    _id: "BOOK1002",
    case_id: "CASE1002",
    created_by: "USER1002",
    scheduled_date: "2025-06-08T11:30:00.000Z",
    booking_mode: "Offline",
    status: "In Progress",
    booked_at: "2025-06-05T10:00:00.000Z",
  },
  {
    _id: "BOOK1003",
    case_id: "CASE1003",
    created_by: "USER1003",
    scheduled_date: "2025-06-09T14:15:00.000Z",
    booking_mode: "Online",
    status: "Cancelled",
    booked_at: "2025-06-06T09:45:00.000Z",
  },
];

function formatDateTime(date) {
  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CheckBookings() {
  const [activeTab, setActiveTab] = useState("Booked");

  const filteredBookings = bookings.filter(
    (b) => b.status.toLowerCase() === activeTab.toLowerCase()
  );

  const tabs = ["Booked", "In Progress", "Cancelled"];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Check Bookings</h1>

      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No {activeTab.toLowerCase()} bookings.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-blue-700">
                Booking ID: {booking._id}
              </h2>
              <p className="text-sm text-gray-700">Case ID: {booking.case_id}</p>
              <p className="text-sm text-gray-700">User ID: {booking.created_by}</p>
              <p className="text-sm text-gray-700">
                Scheduled: {formatDateTime(booking.scheduled_date)}
              </p>
              <p className="text-sm text-gray-700">
                Booked At: {formatDateTime(booking.booked_at)}
              </p>
              <p className="text-sm text-gray-700">
                Mode: {booking.booking_mode}
              </p>
              <p className="text-sm text-green-600 font-medium">
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CheckBookings;
