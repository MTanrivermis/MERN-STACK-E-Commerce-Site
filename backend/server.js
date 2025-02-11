const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const mainRoute = require("./routes/index");
const port = process.env.PORT || 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

//middlewares
app.use(logger("dev"));
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mern-stack-e-commerce-site.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle OPTIONS method
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Additional security headers
app.use((req, res, next) => {
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// API routes
app.use(
  "/api",
  (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  },
  mainRoute
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
    path: req.path,
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: "Not Found",
    path: req.path,
    method: req.method,
  });
});

// Start server
const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

startServer();
