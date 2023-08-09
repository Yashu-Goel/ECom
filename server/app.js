const express = require("express");
const app = express();
const cors = require("cors");

//routes...
const userRouter = require("./router/userRouter.js");
const editCart = require("./router/editCart.js");
const tokenMiddleware = require("./MiddleWares/tokenMiddleWare.js");
const sellerRouter = require("./router/sellerRouter.js");
const getDetails = require("./router/getDetailsRouter.js");
const updateAddress = require("./router/updateAddress");
const createOrderId = require("./router/razorPay.js");
//middle wares
app.use(cors());
app.use("/user", userRouter);
app.use("/cart", tokenMiddleware, editCart);
app.use("/seller", sellerRouter);
app.use("/get", getDetails);
app.use("/updateAddress", tokenMiddleware, updateAddress);
app.use("/create-razorpay-order", tokenMiddleware, createOrderId);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
