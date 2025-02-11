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
    throw error;
  }
};

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://mern-stack-e-commerce-site.vercel.app",
            "https://e-commerce-frontend-nine.vercel.app",
          ]
        : ["http://localhost:5173"],
    credentials: true,
  })
);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// API routes
app.use("/api", mainRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
