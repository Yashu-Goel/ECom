const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({
  name: {
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
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
    default: null,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  quantity: {
    type: Number,
    required: true,
  },
  imageName: [
    {
      type: String,
      required: true,
    },
  ],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
});

module.exports = mongoose.model("Product", productDetailsSchema);
