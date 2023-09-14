import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Product from "../models/productDetailsSchema.js";
import "../db/conn.js";

dotenv.config();
const router = express.Router();

router.use(express.json());
router.use(cors());

router.post("/removeItem", async (req, res) => {
  try {
    const { user, token } = req;
    const { updatedItems } = req.body;

    user.cart = updatedItems;
    await user.save();

    const resp = {
      addresses: user.addresses,
      cart: user.cart,
      email: user.email,
      name: user.name,
      token,
    };

    return res.status(200).json(resp);
  } catch (err) {
    return res.status(403).send("FORBIDDEN");
  }
});

router.post("/additem", async (req, res) => {
  try {
    const { user, token } = req;

    await user.cart.push(req.body);
    await user.save();

    const resp = {
      addresses: user.addresses,
      cart: user.cart,
      email: user.email,
      name: user.name,
      token,
    };
    res.status(200).json(resp);
  } catch (err) {
    console.log(err);
    return res.status(403).send("FORBIDDEN");
  }
});

router.post("/upitem", async (req, res) => {
  try {
    const { user, token } = req;
    const { _id, count } = req.body;
    user.cart.find((e) => {
      if (e._id === _id) {
        e.count = count;
      }
    });
    await user.save();
    const resp = {
      addresses: user.addresses,
      cart: user.cart,
      email: user.email,
      name: user.name,
      token,
    };
    return res.status(200).json(resp);
  } catch (e) {
    return res.status(403).send("FORBIDDEN");
  }
});

router.get("/getCartInfo/:_id", async (req, res) => {
  try {
    await Product.findOne({ _id: req.params._id }).then((response) => {
      return res.json(response);
    });
  } catch (err) {
    return res.status(403).send("FORBIDDEN");
  }
});

export default router;
