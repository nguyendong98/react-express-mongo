const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    status: Boolean
})

const Product = mongoose.model('products', productSchema);
module.exports = Product