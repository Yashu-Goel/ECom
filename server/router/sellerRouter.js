const express = require("express");
const app = require("express");
// const cookieParser = require("cookie-parser");
const Seller = require("../models/sellerSchema.js");
const Address = require("../models/addressSchema.js");
const Product = require("../models/productDetailsSchema.js");
const uniqueFilename = require("unique-filename");
const Order = require("../models/orderSchema.js");
// const OrderHistory = require("../models/order_historySchema.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
require("../db/conn.js");
const jwt = require("jsonwebtoken");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();
const router = express.Router();

router.use(express.json());
router.use(cors());
// router.use(cookieParser());
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});


const JWT_Secret = process.env.JWT_Secret;
const path = require("path");
//mutler configuration

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const absolutePath = path.join(__dirname, "../../client/public/uploads");
//     cb(null, absolutePath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
//   },
// });

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

//get seller details
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

//Product Details

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
    sellerId    
  } = req.body;
console.log(req.body);
res.status(200);
  try {
    const imageNamesArray = JSON.parse(req.body.imageName);
    const imageName = imageNamesArray.map(
      (imageObject) => imageObject.type
    );


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


//get product details
router.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
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



// post order_details
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

//update status of order
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

//get order status from orderId
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
// get order status from userId
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

// Update product count
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
        message: "Address registered successfully",
      });
    } else res.status(400).json("Address unregistered");
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});
//get address
// router.get("/address", async (req, res) => {
//   try {
//     const address = await Address.find();
//     res.send(address);
//   } catch (error) {
//     res.status(422).json(`${error}`);
//   }
// });

// //get single address
// router.get("/address/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     console.log(_id);
//     const address = await Address.findById(_id);
//     res.send(address);
//   } catch (error) {
//     res.send(error);
//   }
// });

// //delete address
// router.delete("/address/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     if (!_id) {
//       res.send("Invalid ID");
//     }
//     const deleteAddress = await Address.findByIdAndDelete(_id);

//     res.send(deleteAddress);
//     console.log(_id);
//   } catch (error) {
//     res.status(422).json(`${error}`);
//   }
// });

// //update address
// router.patch("/address/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const updateAddress = await Address.findByIdAndUpdate(_id, req.body, {
//       new: true,
//     });
//     res.send(updateAddress);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

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
// // get order_address
// router.get("/order_history", async (req, res) => {
//   try {
//     const order_history = await OrderHistory.find();
//     res.send(order_history);
//   } catch (error) {
//     res.status(422).json(`${error}`);
//   }
// });

module.exports = router;
