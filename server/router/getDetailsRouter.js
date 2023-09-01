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
    const { categories, tags } = req.body;
    const query = {};

    if (categories && categories.length > 0) {
      query.categories = {
        $in: categories.map((category) => category.toLowerCase()),
      };
    }

    if (tags && tags.length > 0) {
      const tagsArray = tags.map((tag) => tag.toLowerCase());
      query.$or = [
        { tags: { $in: tagsArray } },
        { categories: { $elemMatch: { $in: tagsArray } } },
      ];
    }

    const filteredData = await Product.find(query);
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
