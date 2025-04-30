const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const caregiverRoutes = require("./routes/caregiverRoutes");
const errorHandler = require("./middlewares/errorHandler");
const bookingRoutes =require("./routes/bookingRoutes");
 

dotenv.config();
const app = express();
app.use(cors());


app.use(express.json()); // ✅ REQUIRED to parse JSON body
app.use(errorHandler);

// ✅ Use  routes
app.use("/api/auth", authRoutes);
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/book-appointment", bookingRoutes);
 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
