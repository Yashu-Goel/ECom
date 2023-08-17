const mongoose = require("mongoose");
// const User = require("./userSchema");

const orderHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  products: [],
  shippingDetails: {},
  rating: {
    type: Number,
    default: 0,
  },
  status: {},
  paymentDetails: {},
});

// Create the OrderHistory model
const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;
