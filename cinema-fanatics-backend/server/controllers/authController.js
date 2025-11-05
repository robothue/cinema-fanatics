const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config(); // 👈 ADD THIS at the top

const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// helpers
const createAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" }); // short-lived
};

const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);


    res.status(201).json({
      message: "User created",
      accessToken,
      refreshToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);


    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ✅ Google Sign-In
exports.googleAuth = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture } = payload; // 👈 picture is here

    let user = await User.findOne({ email });

    if (!user) {
      // create new user with picture
      user = await User.create({ name, email, googleId, picture });
    } else {
      // update Google fields if needed (keep profile pic fresh)
      let changed = false;
      if (!user.googleId) {
        user.googleId = googleId;
        changed = true;
      }
      if (picture && user.picture !== picture) {
        user.picture = picture;
        changed = true;
      }
      if (changed) await user.save();
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);


    res.json({
      message: "Google sign-in successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture, // 👈 return it
      },
    });
  } catch (err) {
    console.error("❌ Google Sign-In Error:", err);
    res.status(401).json({
      message: "Google authentication failed",
      error: err.message,
    });
  }
};

//Automatic logout 
exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = createAccessToken(user._id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};



// ✅ Get Current User
exports.me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // 👇 Correct field name
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } catch (err) {
    console.error("❌ /me error:", err);
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

//Profile updating
exports.updateMe = async (req, res) => {
  try {
    const { name } = req.body;

    // Update fields
    if (name) req.user.name = name;

    // Handle file upload (local or cloudinary)
    if (req.file) {
      if (process.env.UPLOAD_DRIVER === "cloudinary") {
        // Cloudinary already gives a URL
        req.user.picture = req.file.path;
      } else {
        // Local: serve via /uploads route
        req.user.picture = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      }
    }

    await req.user.save();

    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      picture: req.user.picture,
    });
  } catch (err) {
    console.error("❌ Update profile error:", err);
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
};
