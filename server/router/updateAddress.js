const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const OrderHistory = require("../models/order_historySchema.js");
require("../db/conn.js");

dotenv.config();
const router = express.Router();

router.use(express.json());
router.use(cors());

router.post("/add", async (req, res) => {
  try {
    const user = req.user;
    const authToken = req.token;
    const addresses = req.body;

    user.addresses = addresses;
    await user.save();

    const resp = {
      addresses: user.addresses,
      cart: user.cart,
      email: user.email,
      name: user.name,
      token: authToken,
    };

    return res.status(200).json(resp);
  } catch (err) {
    console.log(err);
    return res.status(403).send("FORBIDDEN");
  }
});

router.post("/order-history", async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, shippingDetails, paymentDetails } = req.body;

    const newOrderHistory = new OrderHistory({
      userId: userId,
      products,
      shippingDetails,
      paymentDetails,
    });

    newOrderHistory.userId = userId;
    const savedOrderHistory = await newOrderHistory.save();

    res.status(201).json(savedOrderHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/order-history", async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await OrderHistory.find({ userId: userId });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
