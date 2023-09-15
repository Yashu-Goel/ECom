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

<<<<<<< HEAD
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
=======
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
>>>>>>> 20b8eb6 (reset changes)
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

<<<<<<< HEAD
export default router;
=======
module.exports = router;
>>>>>>> 20b8eb6 (reset changes)
