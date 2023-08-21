const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  count: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  customer_address: {
    type: Object,
    required: true,
  },
  paymentDetails: {
    type: Object,
    default: true,
  },
});
orderSchema.pre("save", async function (next) {
  const storeInitials = "PB";

  const count = await this.constructor.countDocuments();

  const sequentialNumber = (count + 1).toString().padStart(6, "0");

  const randomSegment = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  this.orderNumber = `${storeInitials}-${sequentialNumber}-${randomSegment}`;

  next();
});
module.exports = mongoose.model("Order", orderSchema);
