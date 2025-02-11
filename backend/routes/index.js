const express = require("express");
const router = express.Router();

// Diğer routes dosylarını içe aktarıyoruz.
const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");
const productRoute = require("./products.js");
const couponRoute = require("./coupons.js");
const userRoute = require("./users.js");
const paymentRoute = require("./payment.js");

// Her route ilgili yol altında kullanıyoruz.
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);

// Error handling for routes
router.use((err, req, res, next) => {
  console.error("Route Error:", err);
  next(err);
});

module.exports = router;
