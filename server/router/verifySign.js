const express = require("express");
const cors = require("cors");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
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
      console.log("Verify");
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
    console.log(req.params.id);
    console.log(req.body.amount);
    const resp = await razorpay.payments.capture(
      req.params.id,
      req.body.amount,
      "INR"
    );
    console.log(resp);
    res.status(200).send({resp});
    // const options = {
    //   amount: amount * 100, // Amount in paise (convert to smallest currency unit)
    //   currency: "INR",
    //   receipt: "order_receipt_" + Date.now(),
    // };
    // const order = await razorpay.orders.create(options);
    // res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

module.exports = router;