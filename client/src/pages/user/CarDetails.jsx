import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from "../../components/user/Skelton";

export const CarDetails = () => {
  const { id } = useParams();
  const [Cars, isLoading] = useFetch(`car/${id}`);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    const { fromDate, toDate, location } = formData;

    if (!fromDate || !toDate || !location) {
      alert("Please fill in all the details.");
      return;
    }

    navigate("/user/carBookings", {
      state: { carDetails: Cars, bookingDetails: formData },
    });
  };

  return (
    <div className="flex flex-wrap gap-6 p-4">
      {isLoading ? (
        <ProductSkelton />
      ) : (
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
          <img
            src={Cars?.images[0]}
            alt={`${Cars?.brand} ${Cars?.model}`}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">
            {Cars?.brand} {Cars?.model}
          </h2>
          <p className="text-gray-500">{Cars?.year}</p>
          <p className="text-lg text-gray-600 font-semibold my-2">
            Rs.{Cars?.pricePerDay} / Day
          </p>
          <ul className="text-gray-500 text-sm">
            {Cars?.features.map((feature, index) => (
              <li key={index} className="list-disc list-inside">
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <label className="block text-gray-600 text-sm mb-2">From Date:</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              min={new Date().toISOString().split("T")[0]} // Disable past dates
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            <label className="block text-gray-600 text-sm mb-2">To Date:</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              min={
                formData.fromDate
                  ? new Date(new Date(formData.fromDate).getTime() + 86400000)
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            <label className="block text-gray-600 text-sm mb-2">Location:</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Location</option>
              <option value="Manjeshwar">Manjeshwar</option>
              <option value="Kasaragod">Kasaragod</option>
              <option value="Mangalore">Mangalore</option>
            </select>
          </div>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleProceed}
          >
            Proceed to Confirmation
          </button>
        </div>
      )}
    </div>
  );
};
