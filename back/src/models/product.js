const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: Array,
        required: false
    },
    inStock: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    sizes: {
        type: Array,
    },
    slug: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: false
    },
    category: {
        type: Array,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Product', productSchema);

