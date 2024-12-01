
import Car from "../models/carModel.js";
import Review from "../models/reviewmodel.js";

// Add a new review
export const addReview = async (req, res) => {
    try {
        const { carId, rating, comment } = req.body;
        const userId = req.user.id; // Assume user ID is added by auth middleware

        if (!carId || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const carExists = await Car.findById(carId);
        if (!carExists) {
            return res.status(404).json({ message: "Car not found" });
        }

        const review = new Review({ carId, userId, rating, comment });
        await review.save();

        res.status(201).json({ message: "Review added successfully", data: review });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Get all reviews for a specific car
export const getReviewsForCar = async (req, res) => {
    try {
        const { carId } = req.params;

        const reviews = await Review.find({ carId }).populate("userId", "name");
        res.json({ message: "Reviews retrieved successfully", data: reviews });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        const review = await Review.findOne({ _id: reviewId, userId });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();

        res.json({ message: "Review updated successfully", data: review });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};
