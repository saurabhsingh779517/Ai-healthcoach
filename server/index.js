const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const protect = require("./middleware/authMiddleware");
const cors =  require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoute");``
const healthRoutes = require("./routes/HealthRoutes");
const dailyLogRoutes = require("./routes/dailyRoutes");
const healthScoreRoutes = require("./routes/healthScoreRoute");
const aiRoutes = require("./routes/aiRoute");
const chatRoutes = require("./routes/chatRoutes");
const planRoutes = require("./routes/planRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB



const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/daily-log", dailyLogRoutes);
app.use("/api/health-score", healthScoreRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/plans", planRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "server is running"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});