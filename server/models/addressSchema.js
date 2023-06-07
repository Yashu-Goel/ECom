const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address_line: {
    type: String,
    required: true,
    minLength: 10,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true
  },
  postal_code: {
    type: String,
    required: true,
  },
});

//Models
const Address = new mongoose.model("Address", addressSchema);

module.exports = Address;
