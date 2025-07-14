import jwt from "jsonwebtoken";
import User from "../api/auth/auth.model.js";

const protect = async (req, res, next) => {
  let token;

  console.log("=== Auth Middleware ===");
  console.log("Authorization header:", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted token:", token.substring(0, 20) + "...");

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded successfully, user ID:", decoded.id);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      console.log("User found:", req.user ? req.user.email : "No user found");

      if (!req.user) {
        console.log("User not found in database");
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      console.log("Auth middleware passed successfully");
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    console.log("No authorization header or doesn't start with Bearer");
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

export { protect };
