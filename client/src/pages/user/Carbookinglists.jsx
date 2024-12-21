import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Carbookinglists = () => {
  const [bookings, isLoading, error] = useFetch("/user/user-bookings");
  const [isModalOpen, setIsModalOpen] = useState(false); // For confirmation modal
  const [bookingToCancel, setBookingToCancel] = useState(null); // For storing booking to be cancelled
  const navigate = useNavigate(); // For page refresh/navigation

  console.log("book:", bookings, "load:", isLoading);

  // Check if the data is still loading or if there's an error
  if (isLoading) {
    return <div className="text-center py-4">Loading your bookings.....</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  // Ensure bookings is an array before checking its length
  const safeBookings = bookings || [];

  // Function to format date to dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  // Function to check if the booking is eligible for review
  const isReviewEligible = (toDate) => {
    const currentDate = new Date();
    const bookingEndDate = new Date(toDate);
    return bookingEndDate <= currentDate; // Booking end date is today or in the past
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axiosInstance({
        method: "PATCH",
        url: `/user/bookingcancel/${bookingId}`, // Use bookingId here
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

  // Open the confirmation modal
  const openCancelModal = (bookingId) => {
    setBookingToCancel(bookingId);
    setIsModalOpen(true);
  };

  // Get the status color based on the booking status
  const getStatusColor = (status) => {
    if (status === 'cancelled') return 'text-red-600'; // Red for cancelled
    if (status === 'booked') return 'text-green-600'; // Green for booked
    return 'text-gray-500'; // Default gray for other statuses
  };

  const navigateToReviewPage = (bookingId, carId) => {
    if (!carId || !bookingId) {
      console.error("Missing bookingId or carId", { bookingId, carId });
      return;
    }
    navigate(`/user/reviewentry/${bookingId}/${carId}`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Your Bookings</h1>
      {safeBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              {/* Car Image */}
              {booking.carId?.carImages && booking.carId.carImages.length > 0 && (
                <img
                  src={booking.carId.carImages[0]}
                  alt={`${booking.carId.brand} ${booking.carId.model}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              {/* Car Details */}
              <h2 className="text-lg font-semibold">
                {booking.carId?.brand} {booking.carId?.model}
              </h2>
              <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>

              {/* Additional Booking Information */}
              <p>
                From: {formatDate(booking.fromDate)} - To: {formatDate(booking.toDate)}
              </p>
              <p>Location: {booking.carId?.location}</p>
              <p>Total Paid: Rs.{booking.totalAmountPaid}</p>

              {/* Status with conditional color */}
              <p className={`font-semibold ${getStatusColor(booking.status)}`}>
                Status: {booking.status}
              </p>

              <p>Payment Mode: {booking.paymentMode}</p>

              {/* Car Additional Details */}
              <div className="mt-4">
                <h3 className="font-semibold">Car Details</h3>
                <p>Year: {booking.carId?.year}</p>
                <p>Price per Day: Rs.{booking.carId?.pricePerDay}</p>
                <p>Car Type: {booking.carId?.carType}</p>
                <p>Availability: {booking.carId?.availability ? "Available" : "Not Available"}</p>
                <p>Car Number: {booking.carId?.carNumber}</p>
                <p>Features: {booking.carId?.features.join(", ")}</p>
              </div>

              {/* Car Owner Details */}
              <div className="mt-4">
                <h3 className="font-semibold">Car Owner Details</h3>
                <p>Owner Name: {booking.carId?.ownerDetails?.name || "N/A"}</p>
                <p>Owner Mobile: {booking.carId?.ownerDetails?.mobileNumber}</p>
                <p>Owner Email: {booking.carId?.ownerDetails?.email}</p>
                <p>Owner Address: {booking.carId?.ownerDetails?.address}</p>
                <p>Owner Aadhar: {booking.carId?.ownerDetails?.aadharNumber}</p>
              </div>

              {/* Hide Cancel Button if Status is 'Cancelled' or the booking date has passed */}
              {booking.status !== 'cancelled' && new Date(booking.toDate) >= new Date() && (
                <button
                  onClick={() => openCancelModal(booking._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Booking
                </button>
              )}

              {/* Show Review Button only after the booking date */}
              {new Date(booking.toDate) >= new Date() && booking.status !== 'cancelled' && (
                <button
                  onClick={() => navigateToReviewPage(booking._id, booking.carId?._id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}

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
