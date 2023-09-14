import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Review from "../models/reviewSchema.js";
import Product from "../models/productDetailsSchema.js";
import tokenMiddleware from "../MiddleWares/tokenMiddleWare.js";
import "../db/conn.js";

dotenv.config();
const router = express.Router();

router.use(express.json());
router.use(cors());

router.get(
  "/getPreviousRating/:productId",
  tokenMiddleware,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const previousRating = await Review.findOne({
        product: req.params.productId,
        user: userId,
      });
      return res.status(200).json(previousRating);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/submitRating", tokenMiddleware, async (req, res) => {
  try {
    const { productId, stars, reviewMessage } = req.body;
    const userId = req.user._id;

    let existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });
    if (existingReview) {
      existingReview.stars = stars;
      existingReview.reviewMessage = reviewMessage;
    } else {
      existingReview = new Review({
        user: userId,
        product: productId,
        stars,
        reviewMessage,
      });
    }
    await existingReview.save();

    const allReviews = await Review.find({ product: productId });

    let totalStars = 0;
    allReviews.forEach((review) => {
      totalStars += review.stars;
    });
    const newOverallRating = totalStars / allReviews.length;

    const productToUpdate = await Product.findById(productId);
    productToUpdate.ratings = newOverallRating;
    await productToUpdate.save();
    return res.status(201).json({ message: "Review submitted successfully." });
  } catch (error) {
    console.error("Error submitting review:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
