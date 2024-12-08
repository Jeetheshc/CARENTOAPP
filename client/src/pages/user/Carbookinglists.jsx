import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; // Replace with your axios instance

export const Carbookinglists = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/bookings"); // Replace with your endpoint
        setBookings(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>

      {isLoading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {booking.carId.brand} {booking.carId.model}
                </h3>
                <p className="text-gray-500">{booking.carId.year}</p>
                <p className="text-sm">
                  <strong>Location:</strong> {booking.location}
                </p>
                <p className="text-sm">
                  <strong>From:</strong> {new Date(booking.fromTime).toLocaleString()}
                </p>
                <p className="text-sm">
                  <strong>To:</strong> {new Date(booking.toTime).toLocaleString()}
                </p>
                <p className="text-sm">
                  <strong>Total Price:</strong> ${booking.totalPrice}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
