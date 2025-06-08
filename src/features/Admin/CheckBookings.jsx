import { useState } from "react";
import useBookingsData from "../Bookings/useBookingsData";
import AcceptCaseModal from "./AcceptCaseModal";
import useDissmissBooking from "../Bookings/useDissmissBooking";
import useLoginData from "../Auth/useLoginData";
import PageLoader from "../../components/PageLoader";
import Content from "../../components/ui/Content";

function CheckBookings() {
  const [activeTab, setActiveTab] = useState("In Progress");
  const [openModalId, setOpenModalId] = useState(null);
  const { data: UserData, isFetching: dataLoading } = useLoginData();
  const { data, isFetching } = useBookingsData();
  const { dismissBooking, isLoading: dismissing } = useDissmissBooking();
  const bookings = data?.data;

  const tabs = ["In Progress", "Booked", "Cancelled"];
  const filteredBookings = bookings?.filter(
    (b) => b.status.toLowerCase() === activeTab.toLowerCase()
  );

  function handleRejectCase(id) {
    dismissBooking({ admin_id: UserData.linked_id, booking_id: id });
  }

  if (isFetching || dismissing) return <PageLoader />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6 text-gray-800">
        <Content>Check Bookings</Content>
      </h1>

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
            <Content>{tab}</Content>
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
                <Content>Booking ID</Content>: {booking._id}
              </h2>
              <p className="text-sm text-gray-700">
                <Content>Created By</Content>: {booking.created_by}
              </p>
              <p className="text-sm text-gray-700">
                <Content>Case Type</Content>:{" "}
                <Content>{booking.case_type}</Content>
              </p>
              <p className="text-sm text-gray-700">
                <Content>Language</Content>:{" "}
                <Content>{booking.language}</Content>
              </p>
              <p className="text-sm text-gray-700">
                <Content>Booked At</Content>:{" "}
                {new Date(booking.booked_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                <Content>Booking Mode</Content>:{" "}
                <Content>{booking.booking_mode}</Content>
              </p>
              <p>
                <strong>
                  <Content>Contact Numbers</Content>:
                </strong>
              </p>
              <ul className="list-disc pl-5">
                {booking.phone_number?.map((phone, index) => (
                  <li key={index} className="text-gray-700">
                    {phone}
                  </li>
                ))}
              </ul>
              <p
                className={`text-sm font-medium ${
                  booking.status === "In Progress"
                    ? "text-blue-600"
                    : booking.status === "Booked"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <Content>Status</Content>: <Content>{booking.status}</Content>
              </p>

              {booking.status === "In Progress" && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setOpenModalId(booking._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    <Content>Accept Case</Content>
                  </button>
                  <button
                    onClick={() => handleRejectCase(booking._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    <Content>Dismiss Booking</Content>
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
