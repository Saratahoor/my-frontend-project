import { useState } from "react";
import useBookingsData from "../Bookings/useBookingsData";
import AcceptCaseModal from "./AcceptCaseModal";
import useDissmissBooking from "../Bookings/useDissmissBooking";
import useLoginData from "../Auth/useLoginData";

function CheckBookings() {
  const [activeTab, setActiveTab] = useState("In Progress");
  const [openModalId, setOpenModalId] = useState(null);
  const { data: UserData, isLoading: dataLoading } = useLoginData();
  const { data, isLoading } = useBookingsData();
  const { dismissBooking, isLoading: dismissing } = useDissmissBooking();
  const bookings = data?.data;

  const tabs = ["In Progress", "Booked", "Cancelled"];
  const filteredBookings = bookings?.filter(
    (b) => b.status.toLowerCase() === activeTab.toLowerCase()
  );

  function handleRejectCase(id) {
    dismissBooking({ admin_id: UserData.linked_id, booking_id: id });
  }

  if (isLoading || dataLoading || dismissing) return <h1>Loading...</h1>;

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

      {filteredBookings?.length === 0 ? (
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
              <p className="text-sm text-gray-700">
                Case ID: {booking.case_id}
              </p>
              <p className="text-sm text-gray-700">
                Created By: {booking.created_by}
              </p>
              <p className="text-sm text-gray-700">
                Case Type: {booking.case_type}
              </p>
              <p className="text-sm text-gray-700">
                Language: {booking.language}
              </p>
              <p className="text-sm text-gray-700">
                Booked At: {new Date(booking.booked_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                Booking Mode: {booking.booking_mode}
              </p>
              <p
                className={`text-sm font-medium underline ${
                  booking.status === "In Progress"
                    ? "text-blue-600"
                    : booking.status === "Booked"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {booking.status}
              </p>

              {booking.status === "In Progress" && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setOpenModalId(booking._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Accept Case
                  </button>
                  <button
                    onClick={() => handleRejectCase(booking._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Dismiss Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {openModalId && (
        <AcceptCaseModal
          bookingId={openModalId}
          onClose={() => setOpenModalId(null)}
        />
      )}
    </div>
  );
}

export default CheckBookings;
