const express = require("express");
const { register, login, googleAuth, me, updateMe } = require("../controllers/authController");
const requireAuth = require("../middlewares/authMiddleware"); // ✅ add auth middleware
const upload = require("../middlewares/upload");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);

router.get("/me", requireAuth, me);       // ✅ protected: get user profile
router.put("/me", requireAuth, upload.single("picture"), updateMe); // ✅ profile update (name + picture)


module.exports = router;
