const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("../db/conn.js");

dotenv.config();
const router = express.Router();

router.use(express.json());
router.use(cors());

router.post("/removeItem", async (req, res) => {
  const user = req.user;
  const { updatedItems } = req.body;
  const authToken = req.token;

  Object.assign(user.cart, updatedItems);
  await user.save();

  const resp = {
    addresses: user.addresses,
    cart: user.cart,
    email: user.email,
    name: user.name,
    token: authToken,
  };

  res.status(200).json(resp);
});

router.post("/additem", async (req, res) => {
  const user = req.user;
  const { updatedItems } = req.body;
  const authToken = req.token;

  await user.cart.push(updatedItems);
  await user.save();

  const resp = {
    addresses: user.addresses,
    cart: user.cart,
    email: user.email,
    name: user.name,
    token: authToken,
  };
  res.status(200).json(resp);
});

router.post("/upitem", async (req, res) => {
  const user = req.user;
  const { product_id, count } = req.body;
  const authToken = req.token;

  try {
    user.cart.find((e) => {
      if (e.product_id === product_id) {
        e.count = count;
      }
    });
  } catch (e) {
    console.log(e);
  }
  await user.save();
  const resp = {
    addresses: user.addresses,
    cart: user.cart,
    email: user.email,
    name: user.name,
    token: authToken,
  };
  res.status(200).json(resp);
});

module.exports = router;
