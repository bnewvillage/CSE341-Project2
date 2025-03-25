const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    stock: {type: Number, required: true, min: 0},
    category: {type: String, required: true}
})

module.exports  = mongoose.model('Product', schema);