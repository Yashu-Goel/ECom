const express = require("express");
const app = require("express");
// const cookieParser = require("cookie-parser");
const Seller = require("../models/sellerSchema.js");
const Address = require("../models/addressSchema.js");
const Product = require("../models/productDetailsSchema.js");
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

//Product Details

router.post("/product", upload.array("productImages", 5), async (req, res) => {
  console.log(req.body);
  const { name, type, price, model, special_feature, sellerId } = req.body;
  const productImages = req.files.map((file) => file.path);
  console.log(req.body);

  if (
    !name ||
    !type ||
    !price ||
    !model ||
    !special_feature ||
    !sellerId||
    productImages.length === 0
  ) {
    return res
      .status(422)
      .json({
        error: "Please fill all the fields and add at least one product image",
      });
  }

  try {
    const product = await Product.create({
      name,
      type,
      price,
      model,
      special_feature,
      productImages: productImages, // Save the array of image paths in the database
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

// router.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find(); // Fetch all products from the database
//     res.status(200).json(products); // Return the array of products as the response
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

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

// //get single address
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
