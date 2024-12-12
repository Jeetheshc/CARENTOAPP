import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from "../../components/user/Skelton";
import { axiosInstance } from "../../config/axiosInstance";

export const CarDetails = () => {
  const { id } = useParams();
  const locationState = useLocation().state;
  const { bookingDetails } = locationState || {};
  const [Cars, isLoading] = useFetch(`car/${id}`);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fromDate: bookingDetails?.fromDate || "",
    toDate: bookingDetails?.toDate || "",
    location: bookingDetails?.location || "",
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  // Helper function to convert dd/mm/yyyy to a Date object
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${month}/${day}/${year}`);
  };

  // Calculate total price dynamically whenever the dates change
  useEffect(() => {
    if (formData.fromDate && formData.toDate && Cars?.pricePerDay) {
      const from = parseDate(formData.fromDate);
      const to = parseDate(formData.toDate);

      // Ensure valid date range
      if (to >= from) {
        let rentalDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include the start day
        const calculatedPrice = rentalDays * Cars.pricePerDay;

        setTotalDays(rentalDays);
        setTotalPrice(calculatedPrice);
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    } else {
      setTotalDays(0);
      setTotalPrice(0);
    }
  }, [formData.fromDate, formData.toDate, Cars]);

  const handleConfirm = async () => {
    if (!formData.fromDate || !formData.toDate || !formData.location) {
      alert("Please ensure all details are correct before confirming.");
      return;
    }

    try {
      const response = await axiosInstance.post("/bookings", {
        carId: Cars._id,
        userId: "USER_ID", // Replace with actual user ID from authentication
        bookingDate: new Date().toISOString().split("T")[0],
        bookingTime: new Date().toLocaleTimeString(),
        location: formData.location,
        fromTime: formData.fromDate,
        toTime: formData.toDate,
        paymentDateTime: new Date().toISOString(),
        paymentMode: "Credit Card", // Replace with actual selected mode
        totalAmountPaid: totalPrice,
      });

      alert("Booking confirmed!");
      console.log("Response:", response.data);

      navigate("/user/bookings"); // Redirect to bookings page
    } catch (error) {
      console.error("Error confirming booking:", error.message);
      alert("Failed to confirm booking.");
    }
  };

  return (
    <div className="flex flex-wrap gap-6 p-4">
      {isLoading ? (
        <ProductSkelton />
      ) : (
        <>
          <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-4">
            <img
              src={Cars?.carimages[0]}
              alt={`${Cars?.brand} ${Cars?.model}`}
              className="w-full h-48 md:w-1/3 object-cover rounded-md mb-4 w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
            />
            <h2 className="text-xl font-bold text-gray-800">
              {Cars?.brand} {Cars?.model}
            </h2>
            <p className="text-gray-500">{Cars?.year}</p>
            <p className="text-lg text-gray-600 font-semibold my-2">
              Rs.{Cars?.pricePerDay} / Day
            </p>
            <p className="text-lg text-gray-600 font-semibold my-2">
              Car Location: {Cars?.location}
            </p>
            <p className="text-lg text-gray-600 font-semibold my-2">
              Car Registration: {Cars?.carNumber}
            </p>
            <ul className="text-gray-500 text-sm">
              {Cars?.features.map((feature, index) => (
                <li key={index} className="list-disc list-inside">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Booking Details</h3>
              <p>From Date: {formData.fromDate}</p>
              <p>To Date: {formData.toDate}</p>
              <p>Pickup Location: {formData.location}</p>
              <p className="text-lg font-semibold text-blue-500 mt-2">
                Total Days: {totalDays}
              </p>
              <p className="text-lg font-semibold text-blue-500 mt-2">
                Total Price: Rs.{totalPrice.toFixed(2)}
              </p>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>
          </div>

          <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Car Provider Details</h3>
            {Cars?.provider ? (
              <div className="flex flex-col items-center">
                <img
                  src={Cars.provider.profilePic || "https://via.placeholder.com/150"}
                  alt={Cars.provider.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <p className="text-lg font-semibold">{Cars.provider.name}</p>
                <p className="text-sm text-gray-500">{Cars.provider.address}</p>
                <p className="text-sm text-gray-500">Phone: {Cars.provider.phone}</p>
                <p className="text-sm text-gray-500">Email: {Cars.provider.email}</p>
              </div>
            ) : (
              <p>Loading provider details...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
