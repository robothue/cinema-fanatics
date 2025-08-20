const express = require("express");
const { register, login, googleAuth, me } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);

// ✅ new route for getting logged-in user
router.get("/me", me);

module.exports = router;
