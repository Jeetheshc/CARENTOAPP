import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { SkeletonLoader } from "../../components/admin/SkeletonLoader";

export const Carbookingdetails = () => {
    const { id } = useParams(); // Car ID
    const [data, isLoading, error] = useFetch(`/bookings/${id}/booking`); // Adjust API endpoint
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (data) {
            setBookings(data.bookings); // Populate bookings
        }
    }, [data]);

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return <div className="text-red-600">Error: {error.message}</div>;
    }

    if (bookings.length === 0) {
        return <div className="text-gray-700">No bookings available for this car.</div>;
    }

    // Format Date for display
    const formatDate = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate().toString().padStart(2, "0");
        const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
        const year = newDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
                Booking History for {data.car.brand} {data.car.model}
            </h1>

            {/* Car Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-medium text-indigo-600">Car Details</h2>
                <p><strong>Car ID:</strong> {data.car._id}</p>
                <p><strong>Brand:</strong> {data.car.brand}</p>
                <p><strong>Model:</strong> {data.car.model}</p>
                <p><strong>Year:</strong> {data.car.year}</p>
                <p><strong>Color:</strong> {data.car.color}</p>
                <p><strong>Price per Day:</strong> ₹{data.car.pricePerDay}</p>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <h3 className="text-xl font-medium text-indigo-600">Booking ID: {booking._id}</h3>
                        <p><strong>Booking Date:</strong> {formatDate(booking.bookingDate)}</p>
                        <p><strong>From:</strong> {formatDate(booking.fromDate)}</p>
                        <p><strong>To:</strong> {formatDate(booking.toDate)}</p>
                        <p><strong>Location:</strong> {booking.location}</p>
                        <p><strong>Status:</strong> 
                            <span
                                className={
                                    booking.status === "Completed"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                }
                            >
                                {booking.status}
                            </span>
                        </p>
                        <p><strong>Total Amount Paid:</strong> ₹{booking.totalAmountPaid}</p>
                        <p><strong>Payment Date:</strong> {formatDate(booking.paymentDate)}</p>
                        <p><strong>Payment Mode:</strong> {booking.paymentMode}</p>

                        {/* User Details */}
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-indigo-600">User Details</h4>
                            <p><strong>Name:</strong> {booking.userId.name}</p>
                            <p><strong>Email:</strong> {booking.userId.email}</p>
                            <p><strong>Phone:</strong> {booking.userId.phone}</p>
                            <p><strong>Address:</strong> {booking.userId.address}</p>
                            <img
                                src={booking.userId.profilePic}
                                alt="Profile"
                                className="w-16 h-16 rounded-full mt-2"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
