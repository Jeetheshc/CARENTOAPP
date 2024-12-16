import Booking from "../models/bookingmodel.js";
import Car from "../models/carModel.js"; // Assuming you have a Car model

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      carId,
      userId,
      bookingDate,
      bookingTime,
      location,
      fromTime,
      toTime,
      paymentDateTime,
      paymentMode,
      totalAmountPaid
    } = req.body;

    // Validate required fields
    if (!carId || !userId || !bookingDate || !bookingTime || !location || !fromTime || !toTime || !paymentDateTime || !paymentMode || !totalAmountPaid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate payment mode
    const validPaymentModes = ["Credit Card", "Debit Card", "UPI", "Cash"];
    if (!validPaymentModes.includes(paymentMode)) {
      return res.status(400).json({ message: "Invalid payment mode" });
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

    if (totalPrice !== totalAmountPaid) {
      return res.status(400).json({ message: "Total amount paid does not match calculated total price" });
    }

    // Create booking
    const newBooking = new Booking({
      carId,
      userId,
      bookingDate,
      bookingTime,
      location,
      fromTime,
      toTime,
      paymentDateTime,
      paymentMode,
      totalAmountPaid,
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
    const bookings = await Booking.find()
      .populate('carId')  // Populate car details
      .populate('userId');  // Populate user details
    res.json({ message: 'Bookings retrieved successfully', data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};


// Get a booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate({
        path: "carId",
        populate: {
          path: "provider", // Populates the provider field in the car document
        },
      })
      .populate("userId"); // Populate user details if needed

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking retrieved successfully", data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


// export const getBookingById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const booking = await Booking.findById(id).populate("carId userId");
//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         res.json({ message: "Booking retrieved successfully", data: booking });
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Internal Server Error" });
//     }
// };

// Cancel a booking
// export const cancelBooking = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const booking = await Booking.findById(id);
//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         await Booking.findByIdAndDelete(id);
//         res.json({ message: "Booking cancelled successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Internal Server Error" });
//     }
// };

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking is within 24 hours
    if (new Date(booking.fromTime) - new Date() <= 24 * 60 * 60 * 1000) {
      return res
        .status(400)
        .json({ message: "Bookings cannot be canceled within 24 hours of the start time." });
    }

    // Update the booking status to 'Cancelled'
    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};





export const getAvailableCars = async (req, res) => {
  try {
    const { fromDate, toDate, location } = req.body;

    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "fromDate and toDate are required" });
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (from > to) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Fetch all booked cars within the given range
    const bookedCarIds = await Booking.find({
      $or: [
        { fromTime: { $lte: to }, toTime: { $gte: from } },
      ],
    }).distinct("carId");

    // Fetch cars that are not booked in the given range and optionally match the location
    const query = {
      _id: { $nin: bookedCarIds },
    };
    if (location) {
      query.location = location;
    }

    const availableCars = await Car.find(query);
    res.json({ message: "Available cars retrieved successfully", data: availableCars });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
