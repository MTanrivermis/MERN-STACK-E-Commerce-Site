const express = require("express");
const router = express.Router();

// Diğer routes dosylarını içe aktarıyoruz.
const categoryRoute = require("./categories.js");
const productRoute = require("./products.js");


// Her route ilgili yol altında kullanıyoruz.
router.use("/categories", categoryRoute)
router.use("/products", productRoute)

module.exports = router;