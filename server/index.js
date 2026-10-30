const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");


const protect = require("./middleware/authMiddleware");
const cors =  require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoute");``
 const healthRoutes = require("./routes/HealthRoutes");
// const dailyLogRoutes = require("./routes/dailyRoutes");
// const healthScoreRoutes = require("./routes/healthScoreRoute");
// const aiRoutes = require("./routes/aiRoute");
// const chatRoutes = require("./routes/chatRoutes");
// const planRoutes = require("./routes/planRoutes");



const app = express();

// Connect to MongoDB
connectDB();

console.log("USER:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS ? "FOUND" : "MISSING");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
 app.use("/api/health", healthRoutes);
// app.use("/api/daily-log", dailyLogRoutes);
// app.use("/api/health-score", healthScoreRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/plans", planRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "server is running"
    });
});

// Start server
app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});