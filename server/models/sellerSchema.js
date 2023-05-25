const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile:{
    type:String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  gst:{
    type: String,
    unique: true
  }
});

//password hashing
sellerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("Seller", sellerSchema);
