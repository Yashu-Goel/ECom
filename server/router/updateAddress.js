import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OrderSchema from "../models/orderSchema.js";
import moment from "moment";
import "../db/conn.js";

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

router.get("/order-history", async (req, res) => {
  try {
    const userId = req.user._id;
    const filter = req.query.tillDate;
    const status = req.query.status;

    const sevenDaysAgo = moment().subtract(`${filter}`, "days").toDate();

    const query = {
      customerId: userId,
      date: { $gte: sevenDaysAgo },
    };

    if (status && status !== "all") {
      query.currentStatus = status;
    }

    const data = await OrderSchema.find(query).populate("productId");

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
