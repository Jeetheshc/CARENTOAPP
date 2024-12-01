import express from "express";
import { addReview, getReviewsForCar, updateReview, deleteReview } from "../controllers/reviewControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

// Add a new review
router.post("/", userAuth, addReview);

// Get all reviews for a specific car
router.get("/:carId", getReviewsForCar);

// Update a review
router.put("/:reviewId", userAuth, updateReview);

// Delete a review
router.delete("/:reviewId", userAuth, deleteReview);

export { router as reviewRouter };
