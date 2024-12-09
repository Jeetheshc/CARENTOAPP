import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; // Ensure this points to your Axios instance
import { Link } from "react-router-dom";

export const Carbookinglists = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/bookings"); // Replace with your actual endpoint
        setBookings(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handleCancel = async (bookingId, fromTime) => {
    const isWithin24Hours =
      new Date(fromTime) - new Date() <= 24 * 60 * 60 * 1000;

    if (isWithin24Hours) {
      alert("Bookings cannot be canceled within 24 hours of the start time.");
      return;
    }

    const confirmCancellation = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (confirmCancellation) {
      try {
        await axiosInstance.patch(`/bookings/${bookingId}`); // Replace with your cancellation endpoint
        alert("Booking canceled successfully.");

        // Update bookings list
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "Cancelled" }
              : booking
          )
        );
      } catch (err) {
        alert(err.response?.data?.message || "Failed to cancel booking.");
      }
    }
  };

  const handleShowDetails = (bookingId) => {
    // Navigate to booking details page
    history.push(`/booking-details/${bookingId}`);
  };

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-center"
            >
              {/* Booking details */}
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">
                  {booking.carId?.brand} {booking.carId?.model}
                </h3>
                <p className="text-gray-500">{booking.carId?.year}</p>
                <p className="text-sm">
                  <strong>Location:</strong> {booking.location}
                </p>
                <p className="text-sm">
                  <strong>From:</strong> {formatDate(booking.fromTime)}
                </p>
                <p className="text-sm">
                  <strong>To:</strong> {formatDate(booking.toTime)}
                </p>
                <p className="text-sm">
                  <strong>Total Price:</strong> Rs.{booking.totalPrice}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      booking.status === "Cancelled"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {booking.status}
                  </span>
                </p>
                <p className="text-sm">
                  <strong>Payment Mode:</strong> {booking.paymentMode}
                </p>
                <p className="text-sm">
                  <strong>Payment Date:</strong> {formatDate(booking.paymentDateTime)}
                </p>
                <p className="text-sm">
                  <strong>Total Amount Paid:</strong> Rs.{booking.totalAmountPaid}
                </p>
              </div>

              {/* Buttons placed at the bottom */}
              <div className="flex flex-col gap-2 mt-4 w-full md:w-auto">
                {/* Show Details Button */}
              
                <Link to={`/bookings/${booking?._id}`} className="w-full">
                        <button className="btn btn-primary w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                            Show Details
                        </button>
                    </Link>

                {/* Cancel Button (if not already cancelled) */}
                {booking.status !== "Cancelled" && (
                  <button
                    className="btn btn-primary w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                    onClick={() => handleCancel(booking._id, booking.fromTime)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
