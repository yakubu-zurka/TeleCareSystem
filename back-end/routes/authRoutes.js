const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
 
const authenticate = require("../middlewares/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getCurrentUser); // 👈 New Route

module.exports = router;
