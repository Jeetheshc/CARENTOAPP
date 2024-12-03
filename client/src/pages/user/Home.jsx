import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Carosal from '../../components/user/carosal';
import { Card } from '../../components/user/Card'
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from '../../components/user/Skelton';

export const Home = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [location, setLocation] = useState('');
  
  const [Cars, isLoading, error] = useFetch("car/cars");

  // List of Indian locations
  const indianLocations = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Ahmedabad",
    "Lucknow",
    "Chandigarh",
    "Kochi",
    "Mysuru",
    "Coimbatore",
    "Goa",
    "Agra",
    "Varanasi",
    "Bhubaneswar",
    "Indore",
    "Guwahati",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for cars from ${fromDate} to ${toDate} in ${location}`);
    setResults([
      { id: 1, brand: 'Toyota', model: 'Camry', year: 2022, price: 50, photo: 'https://via.placeholder.com/150' },
      { id: 2, brand: 'Tesla', model: 'Model 3', year: 2023, price: 100, photo: 'https://via.placeholder.com/150' },
    ]);
  };

  return (
    <div className="bg-blue-100 text-blue-900 dark:bg-base-100 dark:text-base-content min-h-1000 py-5 flex flex-col items-center">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to "Carento"</h1>
        <p className="text-lg text-gray-600 mt-2">Your ultimate car rental solution!</p>
      </header>

      {/* Carousel Section */}
      <section>
        <Carosal />
      </section>

      {/* Search Section */}
      <div className="flex flex-col items-center justify-center h-64 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search for Cars</h2>
        <form className="flex flex-wrap gap-4 items-center" onSubmit={handleSearch}>
          {/* From Date */}
          <div className="flex flex-col">
            <label htmlFor="fromDate" className="text-sm font-medium text-blue-600 mb-1">From Date</label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()} // Disable past dates
              className="p-2 border border-blue-600 rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-blue-500"
              placeholderText="Select From Date"
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col">
            <label htmlFor="toDate" className="text-sm font-medium text-blue-600 mb-1">To Date</label>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={fromDate || new Date()} // Ensure To Date is after From Date
              className="p-2 bg-white border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select To Date"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium text-blue-600 mb-1">Location</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border bg-white border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select location
              </option>
              {indianLocations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Result Section */}
      <div className='flex flex-wrap gap-6 p-4'>
            { isLoading ? (
                <ProductSkelton />
            ) : (
                <>
                    {Cars?.map((value) => (
                        <Card key={value._id} cars={value} />
                    ))}
                </>
            )}
        </div>
      
      </div>
    
  );
};
