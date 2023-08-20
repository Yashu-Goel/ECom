const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  stars: { type: Number, required: true },
  reviewMessage: { type: String, required: true },
  dateUploaded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
