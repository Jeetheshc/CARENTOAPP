import { Link } from "react-router-dom";

export const Card = ({ cars, bookingDetails }) => {
  const handleBookingClick = () => {
    if (!bookingDetails.fromDate || !bookingDetails.toDate || !bookingDetails.location) {
      alert("Please select both dates and a location before booking.");
      return false; // Prevent navigation
    }
    return true;
  };

  return (
    <div className="flex-wrap">
      <div className="card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 w-full sm:w-80 md:w-96 mx-auto">
        <figure className="relative overflow-hidden rounded-t-lg">
          <img
            src={cars?.carImages}
            alt="Car"
            className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="text-xl font-bold text-gray-800">{cars?.brand}</h2>
          <h1 className="text-xl font-bold text-gray-800">{cars?.model}</h1>
          <p className="text-lg text-gray-600 font-semibold">
            Rs.{cars?.pricePerDay} / Day
          </p>
          <p className="text-lg text-gray-600 font-semibold">
            Pickup: {cars?.location}
          </p>

          <div className="card-actions mt-4 space-y-2">
            {/* Booking Button */}
            <Link
              to={`/Car/${cars?._id}`}
              state={{ bookingDetails }}
              onClick={(e) => {
                if (!handleBookingClick()) e.preventDefault();
              }}
              className="w-full"
            >
              <button className="btn btn-primary w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                Book
              </button>
            </Link>

            {/* Review Button */}
            <Link
              to={`carreviews/${cars?._id}`}
              className="w-full"
            >
              <button className="btn btn-secondary w-full py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300">
                View Reviews
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
