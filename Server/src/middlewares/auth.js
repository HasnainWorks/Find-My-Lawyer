import jwt from "jsonwebtoken";
import { Lawyer } from "../models/lawyerSchema.js";
import { User } from "../models/clientSchema.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Not authenticated");
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Try lawyer first
    const lawyer = await Lawyer.findById(decodedToken._id).select("-password");
    if (lawyer) {
      req.lawyer = lawyer;
      return next();
    }

    // Fall back to client/customer
    const user = await User.findById(decodedToken._id).select("-password");
    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401).send("Invalid Access Token!!!");

  } catch (error) {
    console.log(error);
    return res.status(401).send("Token verification failed");
  }
};