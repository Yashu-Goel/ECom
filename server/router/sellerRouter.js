import express from "express";
import Seller from "../models/sellerSchema.js";
import Address from "../models/addressSchema.js";
import Product from "../models/productDetailsSchema.js";
import uniqueFilename from "unique-filename";
import Order from "../models/orderSchema.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();
const router = express.Router();
const JWT_Secret = process.env.JWT_Secret;

router.use(express.json());
router.use(cors());

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Signup for seller
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
        error: "Password and Confirm Password must be the same!",
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

// Login for seller
router.post("/sellerlogin", async (req, res) => {
  try {
    const details = req.body;
    console.log(req.body);

    const { email, password } = details;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const sellerLogin = await Seller.findOne({ email });
    console.log("sellerLogin: " + sellerLogin);
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

// Get seller details
router.get("/seller_details/:id", async (req, res) => {
  try {
    const sellerId = req.params.id;
    const seller = await Seller.findById(sellerId);
    console.log("okok");
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

// Product Details
router.post("/product", async (req, res) => {
  const {
    name,
    category,
    price,
    MRP,
    model,
    description,
    brand,
    quantity,
    imageName,
    sellerId,
  } = req.body;
  console.log(req.body);
  res.status(200);
  try {
    const imageNamesArray = JSON.parse(req.body.imageName);
    const imageName = imageNamesArray.map((imageObject) => imageObject.type);

    const product = await Product.create({
      name,
      category,
      price,
      MRP,
      model,
      description,
      brand,
      quantity,
      imageName,
      sellerId,
    });
    console.log(product);

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
    res.status(422).json("Error: " + error);
  }
});

async function putObject(key, contentType) {
  const command = new PutObjectCommand({
    Bucket: "demo-test-v1",
    Key: key,
    ContentType: contentType,
  });

  try {
    const url = await getSignedUrl(client, command);
    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw error;
  }
}

// Get product details
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

router.post("/get-upload-url", async (req, res) => {
  try {
    const uniqueImageName = uniqueFilename("", "image");
    const signedUrl = await putObject(uniqueImageName, "image/jpg/png");
    console.log("Generated unique image name:", uniqueImageName); // Log the unique image name
    // console.log("Generated signed URL:", signedUrl); // Log the signed URL
    res.status(200).json({ signedUrl, uniqueFilename: uniqueImageName });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Unable to generate signed URL" });
  }
});

// Post order_details
router.post("/order_details", async (req, res) => {
  try {
    const order = await Order.create(req.body);

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
    console.log(error);
    res.status(422).json("Error: " + error);
  }
});

// Update status of order
router.patch("/order_details", async (req, res) => {
  const newStatus = req.body.status;
  const id = req.body.id;
  try {
    const updatedOrder = await Order.findOne({ _id: id });

    if (!updatedOrder) {
      return res.status(404).json("Order not found");
    }

    if (updatedOrder) {
      switch (newStatus) {
        case "cancelled":
          updatedOrder.currentStatus = "cancelled";
          updatedOrder.cancelled = true;
          updatedOrder.cancelledDate = new Date();
          break;
        case "shipped":
          updatedOrder.currentStatus = "shipped";
          updatedOrder.shipped = true;
          updatedOrder.shippedDate = new Date();
          break;
        case "out_for_delivery":
          updatedOrder.currentStatus = "out_for_delivery";
          updatedOrder.outForDelivery = true;
          updatedOrder.outForDeliveryDate = new Date();
          break;
        case "delivered":
          updatedOrder.currentStatus = "delivered";
          updatedOrder.delivered = true;
          updatedOrder.deliveredDate = new Date();
          break;
        default:
          console.log("It's something else.");
      }
    }
    await updatedOrder.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// Get order status from orderId
router.get("/order_status", async (req, res) => {
  const orderId = req.body.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json("Order not found");
    }

    res.status(200).json({ status: order.status });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// Get order status from userId
router.get("/OrderStatus", async (req, res) => {
  const userId = req.query.id;
  try {
    const orders = await Order.find({ customerId: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    const orderStatuses = orders.map((order) => ({
      orderId: order._id,
      status: order.status,
    }));

    res.status(200).json(orderStatuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//get order_details
router.get("/order_details/:id", async (req, res) => {
  const sellerId = req.params.id;
  try {
    const order = await Order.find({ sellerId: sellerId })
      .populate("customerId", "name")
      .populate("productId", "name brand model category price pics price");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//
router.put("/update_count", async (req, res) => {
  const count = req.body.count;
  const id = req.body.id;
  console.log(req.body);
  try {
    const updatedProduct = await Product.findOne({ _id: id });

    if (updatedProduct) {
      const updatedQuantity = updatedProduct.quantity - count;

      if (updatedQuantity >= 0) {
        updatedProduct.quantity = updatedQuantity;
        const response = await updatedProduct.save();

        if (response) {
          res.status(200).json({
            message: "Quantity Updated Successfully",
          });
        } else {
          res.status(500).json({
            message: "Quantity not updated",
          });
        }
      } else {
        console.log("OKOK");
        res.status(400).json({
          message: "Insufficient quantity",
        });
      }
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
//update product quantity
router.put("/update_quantity", async (req, res) => {
  try {
    const { count, id } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { quantity: count } },
      { new: true }
    );

    if (updatedProduct) {
      if (count >= 0) {
        return res.status(200).json({
          message: "Quantity Updated Successfully",
          updatedQuantity: updatedProduct.quantity,
        });
      } else {
        return res.status(400).json({
          message: "Quantity can not be less than or equal to 0",
        });
      }
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Post address
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
        message: "Address registered successfully",
      });
    } else res.status(400).json("Address unregistered");
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

export default router;
