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
    const payload =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_PIN)
      .update(payload)
      .digest("hex");

    const clientSignature = req.body.razorpay_signature;

    if (clientSignature === expectedSignature) {
      res.status(200).send("Payment signature is valid");
    } else {
      res.status(400).send("Invalid payment signature");
    }
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Error verifying Razorpay order" });
  }
});

router.post("/capture/:id", async (req, res) => {
  try {
    const resp = await razorpay.payments.capture(
      req.params.id,
      req.body.amount,
      "INR"
    );
    res.status(200).send({ resp });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

export default router;
