const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

// Yeni bir kupon oluşturma (Create)
router.post("/", async (req, res) => {
    try {
    const {code}= req.body

    const existingCoupon = await Coupon.findOne({ code });

    if(existingCoupon){
        return res.status(400).json({error: "This Coupon is already exists"})
    }

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).json(newCoupon);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
    }
});

// Tüm kuponları getirme (Read-All)
router.get("/", async (req, res) => {
    try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
    }
});

// Belirli bir kuponu getirme (Read - Single by Coupon ID)
router.get("/:couponId", async (req, res) => {
    try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId);
    
    if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
    }

    res.status(200).json(coupon)
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
    }
});

// Belirli bir kuponu getirme (Read - Single by Coupon Code)
router.get("/:code/:couponCode", async (req, res) => {
    try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({ code: couponCode});
    
    if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
    }

    const {discountPercent} = coupon; // Do you want just send discount percent use with destructing 

    res.status(200).json({discountPercent}) 
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
    }
});

// Kupon Güncelleme (Update)
router.put("/:couponId", async (req, res) => {
    try {
        const couponId = req.params.couponId;
        const updates = req.body;

        const exsitingCoupon = await Coupon.findById(couponId);

        if(!exsitingCoupon){
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
