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
    const { user } = req;
    const { itemId, deleteAll } = req.body;

    if (deleteAll) {
      user.cart = [];
    } else {
      user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
    }
    await user.save();

    return res.status(200).json({ message: "Item deleted", cart: user.cart });
  } catch (err) {
    console.log(err);
    return res.status(403).send("FORBIDDEN");
  }
});

// router.post("/additem", async (req, res) => {
//   try {
//     const { user, token } = req;
//     const { itemId, count } = req.body;

//     console.log(itemId, count);

//     await user.cart.push(req.body);
//     await user.save();

//     const resp = {
//       addresses: user.addresses,
//       cart: user.cart,
//       email: user.email,
//       name: user.name,
//       token,
//     };
//     res.status(200).json(resp);
//   } catch (err) {
//     console.log(err);
//     return res.status(403).send("FORBIDDEN");
//   }
// });
router.post("/additem", async (req, res) => {
  try {
    const { user } = req;
    const { itemId, count } = req.body;

    const existingItem = user.cart.find((item) => {
      return item._id.toString() === itemId;
    });
    if (existingItem) {
      if (existingItem.count === count) {
        return res
          .status(200)
          .json({ message: "Item already in the cart", cart: user.cart });
      } else {
        existingItem.count = count;
        await user.save();
        return res
          .status(200)
          .json({ message: "Cart updated", cart: user.cart });
      }
    } else {
      user.cart.push({ _id: itemId, count });
      await user.save();
      return res
        .status(200)
        .json({ message: "Added to cart", cart: user.cart });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err });
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
