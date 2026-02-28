const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    // convert type from str to num
    type: Number,
    required: true,
  },
  category: {
    
    type: String,
    default: "General",
  },
});

module.exports = mongoose.model("Product", productSchema);
