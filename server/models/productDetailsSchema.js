const mongoose = require("mongoose");
const Review = require("./reviewSchema");

const productDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  MRP: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
    default: null,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  pics: [
    {
      type: String,
      required: true,
    },
  ],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productDetailsSchema);
