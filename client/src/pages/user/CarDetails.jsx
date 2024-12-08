import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from '../../components/user/Skelton';

export const CarDetails = () => {
  const { id } = useParams();
  const [Cars, isLoading] = useFetch(`car/${id}`);
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${id}`); // Navigate to booking page with car ID
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
            ${Cars?.pricePerDay} / Day
          </p>
          <ul className="text-gray-500 text-sm">
            {Cars?.features.map((feature, index) => (
              <li key={index} className="list-disc list-inside">
                {feature}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};
