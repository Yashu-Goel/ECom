const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({
  name: {
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
  MRP: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: null,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  pics: [
    {
      type: String,
      required: true,
    },
  ],
  sellerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
});

module.exports = mongoose.model("Product", productDetailsSchema);
