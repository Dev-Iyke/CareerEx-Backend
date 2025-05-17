const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {type: String, require: true},
  price: {type: Number, require: true},
  quantity: {type: Number, default: 0},
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)
module.exports = {
  Product
}