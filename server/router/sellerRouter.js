const express = require("express");
const app = require("express");
// const cookieParser = require("cookie-parser");
const Seller = require("../models/sellerSchema.js");
const Address = require("../models/addressSchema.js");
const Product = require("../models/productDetailsSchema.js");
const Order = require("../models/orderSchema.js")
// const OrderHistory = require("../models/order_historySchema.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
require("../db/conn.js");
const jwt = require("jsonwebtoken");

dotenv.config();
const router = express.Router();
const multer = require("multer");
router.use(express.json());
router.use(cors());
// router.use(cookieParser());
const JWT_Secret = process.env.JWT_Secret;
const path = require("path");
//mutler configuration


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
const absolutePath = path.join(__dirname, "../../client/public/uploads");
cb(null, absolutePath);  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });



//signup for seller
router.post("/sellersignup", async (req, res) => {
  console.log(req.body);
  const { name, email, mobile, password, cpassword, gst } = req.body;
  if (!name || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  console.log(req.body);
  try {
    const SellerExists = await Seller.findOne({ email: email });

    if (SellerExists) {
      return res.status(422).json("Seller already Exists");
    } else if (password != cpassword) {
      return res.status(422).json({
        error: "Password and Confirm Password must be same!",
      });
    } else {
      const user = await Seller.create({
        name,
        email,
        mobile,
        password,
        cpassword,
        gst,
      });

      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          message: "User registered successfully",
        });
      } else res.status(400).json("Signup failed");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

//login for seller
router.post("/sellerlogin", async (req, res) => {
  try {
    const details = req.body;
    console.log(req.body);

    const { email, password } = details;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const sellerLogin = await Seller.findOne({ email });
    console.log("sellerLogin: "+ sellerLogin );
   if (sellerLogin) {
     const isMatch = await bcrypt.compare(password, sellerLogin.password);
     if (!isMatch) {
       res.json({ message: "Invalid Credential" });
     } else {
       const token = jwt.sign({ _id: sellerLogin._id }, JWT_Secret);
       res.json({
         token: token,
         _id: sellerLogin._id,
         message: "Login Success!!",
       });
     }
   } else {
     res.status(400).send("Invalid Credentials");
   }
  } catch (error) {
    console.log("error: " + error);
  }
});

//get seller details
router.get("/seller_details/:id", async (req, res) => {
  try {
    const sellerId = req.params.id;
    const seller = await Seller.findById(sellerId);
    console.log('okok');
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.status(200).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      mobile: seller.mobile,
      gst: seller.gst,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Product Details

router.post("/product", upload.array("productImages", 5), async (req, res) => {
  console.log(req.body);
  const {
    name,
    category,
    price,
    MRP,
    model,
    description,
    brand,
    rating,
    reviews,
    quantity,
    sellerId: sellerId,
  } = req.body;
  const productImages = req.files.map((file) => file.path);
  console.log('OK');
  console.log(req.body);


  try {
    const product = await Product.create({
      name,
      category,
      price,
      MRP,
      model,
      description,
      brand,
      rating,
      reviews,
      pics: productImages, // Save the array of image paths in the database
      quantity,
      sellerId: sellerId,
    });

    if (product) {
      res.status(200).json({
        _id: product._id,
        type: product.type,
        sellerId: product.sellerId,
        message: "Product registered successfully",
      });
    } else {
      res.status(400).json("Product unregistered");
    }
  } catch (error) {
    res.status(422).json("Error: "+error);
  }
});

//get product details
router.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/products", async (req, res) => {
  try {
    const sellerId = req.query.sellerId; // Get seller ID from query parameter
    if (!sellerId) {
      return res
        .status(400)
        .json({ error: "Seller ID is required in the query parameters" });
    }
    const products = await Product.find({ sellerId: sellerId }); // Find all products with the given seller ID
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// router.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find(); // Fetch all products from the database
//     res.status(200).json(products); // Return the array of products as the response
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// post order_details
router.post("/order_details",async (req, res) => {
  console.log(req.body);
  const {
    sellerId: sellerId,
    customerId: customerId,
    productId: productId,
    count, 
    amount,
    date
  } = req.body;
  console.log(req.body);

  try {
    const order = await Order.create({
      sellerId: sellerId,
      customerId: customerId,
      productId: productId,
      count,
      amount,
      date
    });

    if (order) {
      res.status(200).json({
        _id: order._id,
        type: order.type,
        orderId: order.orderId,
        message: "order details success",
      });
    } else {
      res.status(400).json("order details unsuccess");
    }
  } catch (error) {
    res.status(422).json("Error: " + error);
  }
});
//update status of order
router.patch("/order_details", async (req, res) => {
  const newStatus = req.body.status;
  const id = req.body.id;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { status: newStatus },
      { new: true } // This returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json("Order not found");
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

//get order status
router.get("/order_status", async (req, res) => {
  const orderId = req.body.id;

  try {
    const order = await Order.findById(orderId);
    console.log(order);
    if (!order) {
      return res.status(404).json("Order not found");
    }

    res.status(200).json({ status: order.status });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

//get order_details
router.get("/order_details/:id", async (req, res) => {
  const sellerId = req.params.id;
  console.log(sellerId);
  try {
    const order = await Order.find({ sellerId: sellerId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//post address

router.post("/address", async (req, res) => {
  console.log(req.body);
  const { address_line, city, state, postal_code } = req.body;
  if (!address_line || !city || !state || !postal_code) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  try {
    const address = await Address.create({
      address_line,
      city,
      state,
      postal_code,
    });

    if (address) {
      res.status(200).json({
        message: "Product registered successfully",
      });
    } else res.status(400).json("Product unregistered");
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});
//get address
router.get("/address", async (req, res) => {
  try {
    const address = await Address.find();
    res.send(address);
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

//get single address
router.get("/address/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const address = await Address.findById(_id);
    res.send(address);
  } catch (error) {
    res.send(error);
  }
});

//delete address
router.delete("/address/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      res.send("Invalid ID");
    }
    const deleteAddress = await Address.findByIdAndDelete(_id);

    res.send(deleteAddress);
    console.log(_id);
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

//update address
router.patch("/address/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateAddress = await Address.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateAddress);
  } catch (error) {
    res.status(404).send(error);
  }
});

//post order_history
router.post("/order_history", async (req, res) => {
  const {
    date_of_order,
    date_of_delivery,
    total_amount,
    receiver_name,
    product_name,
    product_image,
    order_id,
  } = req.body;
  console.log(req.body);
  if (
    !date_of_order ||
    !date_of_delivery ||
    !total_amount ||
    !receiver_name ||
    !product_name ||
    !product_image
  ) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  try {
    const order_history = await OrderHistory.create({
      date_of_order,
      date_of_delivery,
      total_amount,
      receiver_name,
      product_name,
      product_image,
      order_id,
    });

    if (order_history) {
      res.status(200).json({
        message: "order_history registered successfully",
      });
    } else res.status(400).json("order_history unregistered");
  } catch (error) {
    res.status(422).json(`error: ${error}`);
  }
});
// get order_address
router.get("/order_history", async (req, res) => {
  try {
    const order_history = await OrderHistory.find();
    res.send(order_history);
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

module.exports = router;
