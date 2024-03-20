const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        img: {
            type: String,
            required: true
        },
    },
    {timestamp: true}
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;