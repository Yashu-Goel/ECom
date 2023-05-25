const express = require("express");
const User = require("../models/userSchema.js");
const Seller = require("../models/sellerSchema.js")
const Product = require("../models/productDetailsSchema.js")
const bcrypt = require("bcryptjs") ;
const dotenv = require("dotenv");
require("../db/conn.js");
const jwt = require("jsonwebtoken");

dotenv.config();
const router = express.Router();
router.use(express.json());
const JWT_Secret = process.env.JWT_Secret;

//Signup for user
router.post("/usersignup", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  console.log(req.body);
  try {
    const UserExists = await User.findOne({ email: email });

    if (UserExists) {
      return res.status(422).json("User already Exists");
    } else if (password != cpassword) {
      return res.status(422).json({
        error: "Password and Confirm Password must be same!",
      });
    } else {
      const user = await User.create({ name, email, password, cpassword });

      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          message: "User registered successfully"
        });
      } else res.status(400).json("Signup failed");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});


//login for user
router.post("/userlogin", async (req, res) => {
  try {
    const details = req.body;
        console.log(req.body);

    const { email, password } = details;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = jwt.sign(details, JWT_Secret);
      res.json({
        token: token,
        message: "Login Success!!",
      });

      if (!isMatch) {
        res.json({ message: "Invalid Credential" });
      } else {
        res.json({ message: "User signin successful" });
      }
    } else {
      res.send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
});

//signup for seller
router.post("/sellersignup", async (req, res) => {
  console.log(req.body);
  const { name, email, mobile, password, cpassword, gst} = req.body;
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
        gst
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

    if (sellerLogin) {
      const isMatch = await bcrypt.compare(password, sellerLogin.password);
        const token = jwt.sign(details, JWT_Secret);
      res.json({
        token: token,
        message: "Login Success!!",
      });

      if (!isMatch) {
        res.json({ message: "Invalid Credential" });
      } else {
        res.json({ message: "User signin successful" });
      }
    } else {
      res.send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
});


//Product Details
router.post("/product", async (req, res) => {
  console.log(req.body);
  const { name, type, description, seller} = req.body;
  if (!name || !type || !description) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  console.log(req.body);
  try {

      const product = await Product.create({
        name,
        type,
        description,
        seller
      });

      if (product) {
        res.status(200).json({
          _id: product._id,
          name: product.name,
          details: product.details,
          type: product.type,
          seller: product.type,
          message: "Product registered successfully",
        });
      } else res.status(400).json("Product unregistered");
    
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

module.exports = router;
