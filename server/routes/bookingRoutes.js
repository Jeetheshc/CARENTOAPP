import express from "express";


import { cancelBooking, createBooking, getAvailableCars, getBookingById, getBookings } from "../controllers/bookingControllers.js";
import { carProviderAuth } from "../middlewares/providerAuth.js";

const router = express.Router();

// Routes for booking management
router.post("/create", createBooking); // Create a new booking
router.get("/", getBookings); // Get all bookings
router.get("/:id", getBookingById); // Get a booking by ID
router.patch("/:id", carProviderAuth, cancelBooking); // Cancel a booking (requires authentication)
router.post("/available-cars", getAvailableCars);

export { router as bookingRouter };
