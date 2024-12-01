import { cloudinaryInstance } from "../config/cloudinary.js";
import Car from "../models/carModel.js";

export const getAllCar = async (req, res, next) => {
  try {
    const carsList = await Car.find();
    res.json({ Message: "Cars Fetched seccessfully", data: carsList });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
}
// Add a new cars
export const addNewCar = async (req, res) => {
  try {
    const { provider, brand, model, year, pricePerDay, carType, features } = req.body;

    if (!provider || !brand || !model || !year || !pricePerDay || !carType || !features) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle case where no files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one car image is required" });
    }

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map((file) =>
        cloudinaryInstance.uploader.upload(file.path).then((result) => result.url)
      )
    );

    const newCar = new Car({
      provider,
      brand,
      model,
      year,
      pricePerDay,
      carType,
      images: uploadedImages,
      features: JSON.parse(features),
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Edit existing car details
export const editCarDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const car = await Car.findByIdAndUpdate(id, updatedData, { new: true });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car updated successfully", data: car });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};


// Deactivate a car (set availability to false)
export const deactivateCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findByIdAndUpdate(carId, { availability: false }, { new: true });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deactivated successfully", car });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Show car details
export const showCarDetails = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findById(carId).populate("provider", "name email"); // Populates provider details
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const updateCarPhotos = async (req, res) => {
  try {
    const { carId } = req.params;

    // Upload new photos
    const uploadedImages = await Promise.all(
      req.files.map((file) =>
        cloudinaryInstance.uploader.upload(file.path).then((result) => result.url)
      )
    );

    const car = await Car.findByIdAndUpdate(
      carId,
      { $push: { images: { $each: uploadedImages } } }, // Add new images to the existing array
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car photos updated successfully", car });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};