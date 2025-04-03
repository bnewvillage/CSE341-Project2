const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    stock: {type: Number, required: true, min: 0},
    category: {type: String, required: true},
    description: {type: String},
    brand: {type: String, required: true},
    rating: {type: Boolean},
    color: {type: String}
})

module.exports  = mongoose.model('Product', schema);