const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("./productDetailsSchema");
const Address = require("./addressSchema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      _id: { type: "ObjectId", ref: "Product" },
      count: {
        type: Number,
        default: 1,
      },
    },
  ],
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
});

//password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
