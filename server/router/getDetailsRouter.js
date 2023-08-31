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
    return res.status(200).json(response);
  } catch (err) {
    return res.status(403).send("FORBIDDEN");
  }
});
router.post("/getCategoryDetails", async (req, res) => {
  try {
    const { tags } = req.body;
    const tagsArray = tags && tags.map((tag) => tag.toLowerCase());
    const filteredData = await Product.find({
      $or: [
        { tags: { $in: tagsArray } },
        { categories: { $elemMatch: { $in: tagsArray } } },
      ],
    });
    res.json(filteredData);
  } catch (err) {
    console.log(err);
    return res.status(403).send("FORBIDDEN");
  }
});

module.exports = router;
