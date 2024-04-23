const mongoose = require('mongoose');

const CouponSchema = mongoose.Schema(
    {
        // kupon kodu
        code: {
            type: String,
            required: true
        },

        // indirim oranı
        discountPercent: {
            type: Number,
            required: true
        },
    },
    {timestamp: true}
);

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;