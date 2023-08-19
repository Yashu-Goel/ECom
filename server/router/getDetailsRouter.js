const express = require("express");
const Product = require("../models/productDetailsSchema.js");
const dotenv = require("dotenv");
const cors = require("cors");
require("../db/conn.js");

dotenv.config();
const router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/getProductDetails/:_id", async (req, res) => {
  try {
    const response = await Product.findOne({ _id: req.params._id }).populate(
      "sellerId",
      "name"
    );
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(403).send("FORBIDDEN");
  }
});

module.exports = router;
