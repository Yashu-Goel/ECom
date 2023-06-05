const express = require("express");
const User = require("../models/userSchema.js");
const Seller = require("../models/sellerSchema.js")
const Address = require("../models/addressSchema.js")
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

//post address

router.post("/address", async(req,res)=>{
  console.log(req.body);
  const { address_line, city, state, postal_code } = req.body;
  if(!address_line || !city || !state || !postal_code)
  {
        return res.status(422).json({ error: "Pls fill all the fields" });
  }
  try {
    const address = await Address.create({
        address_line,
        city,
        state,
        postal_code
      });

     if (address) {
       res.status(200).json({
         message: "Product registered successfully",
       });
     } else res.status(400).json("Product unregistered");
  } catch (error) {
        res.status(422).json(`${error}`);
  }
})
//get address
router.get("/address", async(req,res)=>{
  try {
    const address= await Address.find();
    res.send(address)
  } catch (error) {
        res.status(422).json(`${error}`);
  }
})

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
module.exports = router;
