import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { SkeletonLoader } from "../../components/admin/SkeletonLoader";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Adminbooking = () => {
  const [data, isLoading, error] = useFetch("/bookings"); // Fetch bookings data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null); // Track which booking is being cancelled
  const navigate = useNavigate(); // For page refresh/navigation

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to handle cancel booking
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axiosInstance({
        method: "PATCH",
        url: `/admin/bookingcancel/${bookingId}`, // Use bookingId here
      });

      if (response.data.message) {
        // Close modal after successful cancellation
        setIsModalOpen(false);
        alert(response.data.message); // Optionally show a success message
        // Refresh the booking list by re-rendering the component
        navigate(0); // This will refresh the current route (re-render the component)
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel booking.");
    }
  };

  return (
    <div className="container mx-auto min-h-screen py-6">
      <h1 className="text-center text-3xl font-semibold mb-6">Booking List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((booking) => (
          <div
            key={booking?._id}
            className="border rounded-lg shadow-md p-4 flex flex-col"
          >
            {/* Display Car Image and Details */}
            <img
              src={booking?.carId?.carImages[0]} // Assuming carImages is an array
              alt={booking?.carId?.model}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {booking?.carId?.brand} {booking?.carId?.model}
              </h2>
              <p className="text-sm text-gray-600">Car Type: {booking?.carId?.type || "N/A"}</p> {/* Display car type */}
              <p className="text-sm text-gray-600">Car Year: {booking?.carId?.year || "Unknown"}</p> {/* Display car year */}
              <p className="text-sm text-gray-600">
                Booked by: {booking?.userId?.name || "Unknown User"}
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-bold ${
                    booking?.status === "Booked" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {booking?.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">Location: {booking?.location}</p>
              <p className="text-sm text-gray-600">From: {new Date(booking?.fromTime).toLocaleString()}</p>
              <p className="text-sm text-gray-600">To: {new Date(booking?.toTime).toLocaleString()}</p>
              <p className="text-sm text-gray-600">
                Total Amount Paid: ₹{booking.totalAmountPaid}
              </p>
              <p className="text-sm text-gray-600">Payment Mode: {booking?.paymentMode}</p>
              <p className="text-sm text-gray-600">
                Payment Date: {new Date(booking?.paymentDateTime).toLocaleDateString()}
              </p>

              {/* Cancel Booking Button */}
              {booking?.status === "Booked" && (
                <button
                  className="bg-red-600 text-white py-1 px-3 rounded-lg mt-4 hover:bg-red-700"
                  onClick={() => {
                    setBookingToCancel(booking?._id);
                    setIsModalOpen(true); // Open confirmation modal
                  }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold">Are you sure you want to cancel this booking?</h2>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => setIsModalOpen(false)} // Close the modal
              >
                No
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => handleCancelBooking(bookingToCancel)} // Pass the bookingId
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};