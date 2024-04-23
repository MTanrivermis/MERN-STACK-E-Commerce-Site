const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

//! Product Data Example
/*
{
    "name": "Ürün Adı",
    "img": [
        "http://localhost:5173/img/products/product1/1.png",
        "http://localhost:5173/img/products/product1/2.png",
        "http://localhost:5173/img/products/product1/3.png",
        "http://localhost:5173/img/products/product1/2.png"
    ],
    "reviews": [
        {
            "text": "Bu ürün harika",
            "rating": 5,
            "user": "66258e06b8c974f38b91f10a",
            "_id": "6626576f40b7152e4aa4a843"
        },
        {
            "text": "Fiyatı çok yüksek",
            "rating": 2,
            "user": "66258e06b8c974f38b91f10a",
            "_id": "6626576f40b7152e4aa4a844"
        }
    ],
    "description": "Ürün açıklaması",
    "colors": [
        "Mavi",
        "Kırmızı",
        "Yeşil"
    ],
    "sizes": [
        "S",
        "M",
        "L"
    ],
    "price": {
        "current": 50,
        "discount": 40
    },
    "category": "6626574440b7152e4aa4a840",
    "_id": "6626576f40b7152e4aa4a842",
    "__v": 0
}
*/

// Yeni bir ürün oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
});

// Tüm ürünleri getirme (Read-All)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir ürünü getirme (Read - Single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kategori Güncelleme (Update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const exsitingProduct = await Product.findById(productId);

    if (!exsitingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kategori Silme (Delete)

router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error." });
  }
});

module.exports = router;
