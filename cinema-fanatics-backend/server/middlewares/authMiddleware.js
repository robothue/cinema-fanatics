const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Handle "Bearer <token>" format
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach full user object (without password) to req.user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;//full monoose user
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = requireAuth;
