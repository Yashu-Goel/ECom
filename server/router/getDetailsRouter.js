const express = require("express");
const app = require("express");
// const cookieParser = require("cookie-parser");
const Seller = require("../models/sellerSchema.js");
const Address = require("../models/addressSchema.js");
const Product = require("../models/productDetailsSchema.js");
// const OrderHistory = require("../models/order_historySchema.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
require("../db/conn.js");
const jwt = require("jsonwebtoken");

dotenv.config();
const router = express.Router();
const multer = require("multer");
router.use(express.json());
router.use(cors());
// router.use(cookieParser());
const JWT_Secret = process.env.JWT_Secret;
const path = require("path");
//mutler configuration
router.get("/getProductDetails/:_id", async (req, res) => {
  console.log("Call tho mar rha hey na");
  try {
    await Product.findOne({ _id: req.params._id }).then((response) => {
      console.log(response);
      return res.json(response);
    });
  } catch (err) {
    return res.status(403).send("FORBIDDEN");
  }
});

module.exports = router;
