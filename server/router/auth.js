const express = require("express");
const User = require("../models/userSchema.js");
const bcrypt = require("bcryptjs") ;
const dotenv = require("dotenv");
require("../db/conn.js");
const jwt = require("jsonwebtoken");

dotenv.config();
const router = express.Router();
router.use(express.json());
const JWT_Secret = process.env.JWT_Secret;

//Signup
router.post("/Signup", async (req, res) => {
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


//login
router.post("/login", async (req, res) => {
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


module.exports = router;
