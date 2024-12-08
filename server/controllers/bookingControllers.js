import Booking from "../models/bookingmodel.js";
import Car from "../models/carModel.js"; // Assuming you have a Car model

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { carId, userId, bookingDate, bookingTime, location, fromTime, toTime } = req.body;

        if (!carId || !userId || !bookingDate || !bookingTime || !location || !fromTime || !toTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the car exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Calculate total days and total price
        const fromDate = new Date(fromTime);
        const toDate = new Date(toTime);
        const rentalDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
        const totalPrice = rentalDays * car.pricePerDay;

        // Create booking
        const newBooking = new Booking({
            carId,
            userId,
            bookingDate,
            bookingTime,
            location,
            fromTime,
            toTime,
            totalPrice,
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", data: newBooking });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


// Get all bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("carId userId"); // Populate car and user details
        res.json({ message: "Bookings retrieved successfully", data: bookings });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id).populate("carId userId");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking retrieved successfully", data: booking });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await Booking.findByIdAndDelete(id);
        res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};
