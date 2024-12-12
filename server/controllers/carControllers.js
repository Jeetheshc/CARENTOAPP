import Car from "../models/carModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// Get all cars
export const getAllCar = async (req, res) => {
  try {
    const carsList = await Car.find();
    res.json({ message: "Cars fetched successfully", data: carsList });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Add a new car

export const addNewCar = async (req, res) => {
  try {
    const { admin, brand, model, year, pricePerDay, carType, features, location, carNumber, ownerDetails } = req.body;

    // Validate required fields
    if (!admin || !brand || !model || !year || !pricePerDay || !carType || !features || !location || !carNumber || !ownerDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if carNumber is unique
    const existingCar = await Car.findOne({ carNumber });
    if (existingCar) {
      return res.status(400).json({ message: "Car number already exists" });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Car image is required" });
    }

    // Upload the image to Cloudinary
    let carImages;
    try {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadResult = await cloudinaryInstance.uploader.upload(base64Image, {
        folder: "car_images", // Define a folder for car images in Cloudinary
      });
      carImages = uploadResult.secure_url; // Get the secure URL of the uploaded image
    } catch (error) {
      return res.status(500).json({ message: "Failed to upload car image", error: error.message });
    }

    // Parse features if sent as a JSON string
    const parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;

    // Create a new car document
    const newCar = new Car({
      admin,
      brand,
      model,
      year,
      pricePerDay,
      carType,
      carImages, // Save the single Cloudinary URL
      features: parsedFeatures,
      location,
      carNumber,
      ownerDetails,
    });

    // Save the new car in the database
    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};




// Edit car details
export const editCarDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { carNumber, features, ...rest } = req.body;

    // Check for duplicate car number
    if (carNumber) {
      const existingCar = await Car.findOne({ carNumber, _id: { $ne: id } });
      if (existingCar) {
        return res.status(400).json({ message: "Car number already exists" });
      }
    }

    // Handle feature parsing
    const parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;

    // Handle image upload
    let updatedCarImages;
    if (req.file) {
      try {
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const uploadResult = await cloudinaryInstance.uploader.upload(base64Image, {
          folder: "car_images",
        });
        updatedCarImages = uploadResult.secure_url;
      } catch (error) {
        return res.status(500).json({ message: "Failed to upload car image", error: error.message });
      }
    }

    // Prepare the updated data
    const updatedData = {
      ...rest,
      features: parsedFeatures,
      ...(updatedCarImages && { carImages: updatedCarImages }), // Update image if provided
    };

    // Update car data in the database
    const car = await Car.findByIdAndUpdate(id, updatedData, { new: true });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car updated successfully", data: car });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
// Deactivate car
export const deactivateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByIdAndUpdate(id, { availability: false }, { new: true });
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
    const { id } = req.params;

    // Check if ID is valid
    if (!id) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    // Fetch car data by ID
    const car = await Car.findById(id).exec();

    // Check if car exists
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Log the car object to check for ownerDetails
    console.log('Fetched Car Data:', car);

    // Send car data in the response
    res.status(200).json({ data: car });
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};


// Update car photos
export const updateCarPhotos = async (req, res) => {
  try {
    const { carId } = req.params;

    const uploadedImages = await Promise.all(
      req.files.map((file) =>
        cloudinaryInstance.uploader.upload(file.path).then((result) => result.url)
      )
    );

    const car = await Car.findByIdAndUpdate(
      carId,
      { $push: { carimages: { $each: uploadedImages } } }, // Add new images to the existing array
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

// Fetch distinct car locations
export const getCarLocations = async (req, res) => {
  try {
    const locations = await Car.distinct("location");
    res.status(200).json({ message: "Locations retrieved successfully", data: locations });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
