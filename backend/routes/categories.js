const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// Yeni bir kategori oluşturma (Create)
router.post("/", async (req, res) => {
    try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });

    await newCategory.save();

    res.status(201).json(newCategory);
    } catch (error) {
    console.log(error);
    }
});

// Tüm kategorileri getirme (Read-All)
router.get("/", async (req, res) => {
    try {
    const categories = await Category.find();
    res.status(200).json(categories);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
    }
});

// Belirli bir kategoriyi getirme (Read - Single)
router.get("/:categoryId", async (req, res) => {
    try {
    const categoryId = req.params.categoryId;

        try {
            const category = await Category.findById(categoryId);
            res.status(200).json(category);
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: "Category not found" });
        }
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
    }
});

// Kategori Güncelleme (Update)
router.put("/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const updates = req.body;

        const exsitingCategory = await Category.findById(categoryId);

        if(!exsitingCategory){
            return res.status(404).json({ error: "Category not found"})
        }



        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updates, {new: true});
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
})

// Kategori Silme (Delete)

router.delete("/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if(!deletedCategory){
            return res.status(404).json({ error: "Category not found" })
        }
        res.status(200).json (deletedCategory)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error." })
    } 
})

module.exports = router;
