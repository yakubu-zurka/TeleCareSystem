const express = require("express");
const router = express.Router();
const  caregiversController = require("../controllers/caregivers.controller"); // ✅ Ensure correct import

// ✅ Routes
router.get("/", caregiversController.getCaregivers);
router.post("/", caregiversController.createCaregiver);

module.exports = router;
