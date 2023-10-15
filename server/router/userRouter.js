import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import "../db/conn.js";
import tokenMiddleware from "../MiddleWares/tokenMiddleWare.js";
import jwt from "jsonwebtoken";
import multer from "multer";

dotenv.config();
const router = express.Router();

router.use(express.json());
router.use(cors());

const JWT_Secret = process.env.JWT_Secret;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });

// Signup for user
router.post("/usersignup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json("User already exists");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        const token = jwt.sign({ email, password }, JWT_Secret);

        return res.json({
          name,
          email,
          token: token,
          cart: user.cart,
          addresses: user.addresses,
        });
      } else return res.status(400).json("Signup failed");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

// Login for user
router.post("/userlogin", async (req, res) => {
  try {
    const details = req.body;
    const { email, password } = details;
    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = jwt.sign(details, JWT_Secret);

      if (!isMatch) {
        res.status(400).json("Invalid Credential");
        return;
      }

      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

      res.json({
        name: userLogin.name,
        email,
        token: token,
        cart: userLogin.cart,
        addresses: userLogin.addresses,
      });
    } else {
      res.status(400).json("User doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get user ID
router.get("/userid", tokenMiddleware, async (req, res) => {
  const user = req.user;
  const token = req.token;

  try {
    if (user) {
      res.json({
        token,
        email: user.email,
        _id: user._id,
        name: user.name,
        cart: user.cart,
        addresses: user.addresses,
      });
    } else {
      res.status(400).json("User doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Get user details
router.get("/user_details/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
