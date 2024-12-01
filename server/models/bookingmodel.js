// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'CarProvider', required: true },
//   fromDate: { type: Date, required: true }, // Booking start date and time
//   toDate: { type: Date, required: true },   // Booking end date and time
// }, { timestamps: true });

// const Booking = mongoose.model('Booking', bookingSchema);
// export default Booking;

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    location: { type: String, required: true },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
    status: { type: String, default: "Booked", enum: ["Booked", "Cancelled"] },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;