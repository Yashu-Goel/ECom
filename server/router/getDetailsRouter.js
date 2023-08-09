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
    await Product.findOne({ _id: req.params._id }).then((response) => {
      return res.json(response);
    });
  } catch (err) {
    return res.status(403).send("FORBIDDEN");
  }
});

module.exports = router;
