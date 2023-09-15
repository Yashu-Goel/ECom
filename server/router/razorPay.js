import express from "express";
import cors from "cors";
import crypto from "crypto";
import Razorpay from "razorpay";

const router = express.Router();

router.use(express.json());
router.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY,
  key_secret: process.env.RAZOR_PAY_PIN,
});

router.post("/", async (req, res) => {
  try {
  
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

export default router;
