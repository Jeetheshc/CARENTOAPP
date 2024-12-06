import express from "express";


import { cancelBooking, createBooking, getBookingById, getBookings } from "../controllers/bookingControllers.js";
import { carProviderAuth } from "../middlewares/providerAuth.js";

const router = express.Router();

// Routes for booking management
router.post("/book", createBooking); // Create a new booking
router.get("/", getBookings); // Get all bookings
router.get("/:id", getBookingById); // Get a booking by ID
router.delete("/:id", carProviderAuth, cancelBooking); // Cancel a booking (requires authentication)

export { router as bookingRouter };
