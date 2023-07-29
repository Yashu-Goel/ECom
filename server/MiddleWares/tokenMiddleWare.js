const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();
require("../db/conn.js");

const tokenMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const authToken = token.split(" ")[1];
  try {
    const { email } = jwt.verify(authToken, process.env.JWT_Secret);

    const newUser = await User.findOne({ email });

    req.user = newUser;
    req.token = authToken;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = tokenMiddleware;
