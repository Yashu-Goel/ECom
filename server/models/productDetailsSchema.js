const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    price: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    special_feature: {
      type: String,
      required: true,
    },
    // seller: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Seller",
    // },
  },
});


module.exports = mongoose.model("Product", productDetailsSchema);
