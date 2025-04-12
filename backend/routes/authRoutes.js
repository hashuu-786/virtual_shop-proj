const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");  // ✅ Ensure this path is correct

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;  // ✅ Ensure router is exported
