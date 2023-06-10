const mongoose = require("mongoose");

const order_history = new mongoose.Schema({
  date_of_order: {
    type: Date,
    required: true,
  },
  date_of_delivery: {
    type: Date,
    required: true,
  },
  total_amount: {
    type: String,
    required: true,
  },
  receiver_name: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  order_id:{
    type: String,
  }
});

//Models
const OrderHistory = new mongoose.model("OrderHistory", order_history);

module.exports = OrderHistory;
