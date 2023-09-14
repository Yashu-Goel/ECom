import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Product from "./productDetailsSchema.js";
import Address from "./addressSchema.js";

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
      _id: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: {
        type: Number,
        default: 1,
      },
    },
  ],
  addresses: [
    {
      name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default mongoose.model("User", userSchema);
