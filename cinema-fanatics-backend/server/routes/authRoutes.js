const express = require("express");
const { register, login, googleAuth, refreshToken, me, updateMe } = require("../controllers/authController");
const requireAuth = require("../middlewares/authMiddleware"); // ✅ add auth middleware
const upload = require("../middlewares/upload");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);   //Logging in
router.post("/google", googleAuth); //Google authentication
router.post("/refresh", refreshToken); //FOr automatic logout


router.get("/me", requireAuth, me);       // ✅ protected: get user profile
router.put("/me", requireAuth, upload.single("picture"), updateMe); // ✅ profile update (name + picture)


module.exports = router;
