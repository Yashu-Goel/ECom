import express from "express";
const app = express();
import cors from "cors";

// Routes
import userRouter from "./router/userRouter.js";
import editCart from "./router/editCart.js";
import tokenMiddleware from "./MiddleWares/tokenMiddleWare.js";
import sellerRouter from "./router/sellerRouter.js";
import getDetails from "./router/getDetailsRouter.js";
import updateAddress from "./router/updateAddress.js";
import createOrderId from "./router/razorPay.js";
import verifySign from "./router/verifySign.js";
import reviewRouter from "./router/reviewRouter.js";

// Middlewares
app.use(cors());
app.use("/user", userRouter);
app.use("/cart", tokenMiddleware, editCart);
app.use("/seller", sellerRouter);
app.use("/get", getDetails);
app.use("/updateAddress", tokenMiddleware, updateAddress);
app.use("/create-razorpay-order", tokenMiddleware, createOrderId);
app.use("/verify-payment", verifySign);
app.use("/api/review", reviewRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
