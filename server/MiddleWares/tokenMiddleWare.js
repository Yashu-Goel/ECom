import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
import "../db/conn.js";

dotenv.config();

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

export default tokenMiddleware;
