import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductSkelton } from "../../components/user/Skelton";

export const Home = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]); // For location list

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 15; // Limit to 15 cars per page

  // Fetch cars and locations on component mount
  useEffect(() => {
    const fetchCarsAndLocations = async () => {
      try {
        const carsResponse = await axiosInstance.get("car/cars");
        const locationsResponse = await axiosInstance.get("car/locations");

        setCars(carsResponse.data.data);
        setLocations(locationsResponse.data.data); // Store locations
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCarsAndLocations();
  }, []);

  // Calculate the range of cars to display based on the current page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  // Calculate total pages
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-blue-100 text-blue-900 dark:bg-base-100 dark:text-base-content min-h-screen py-5 flex flex-col items-center">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to "Carento"</h1>
        <p className="text-lg text-gray-600 mt-2">Your ultimate car rental solution!</p>
      </header>

      {/* Browse Cars Section */}
      <section className="w-full max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Browse Our Cars</h2>

        {/* Loading or error state */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <ProductSkelton />
            <ProductSkelton />
            <ProductSkelton />
            <ProductSkelton />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : currentCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentCars.map((car) => (
                <div key={car._id} className="p-4 border rounded shadow-md">
                  <img
                    src={car.carImages}
                    alt={car.brand}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-sm text-gray-600">{car.location}</p>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>No cars available.</p>
        )}
      </section>
    </div>
  );
};
