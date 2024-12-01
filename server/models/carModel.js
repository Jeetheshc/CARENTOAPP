import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "CarProvider", required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    carType: { type: String, required: true },
    images: [{ type: String, required: true }], // Array of strings to store image URLs
    features: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
