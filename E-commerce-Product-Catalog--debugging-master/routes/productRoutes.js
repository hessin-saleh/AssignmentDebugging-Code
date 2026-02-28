const express = require("express");
const router = express.Router();
const createProduct = require("../controllers/productController");
const { getAllProducts } = require("../controllers/productController");


// convert mathed from get to post createProduct
router.post("/products", createProduct);
// router.get("/products", createProduct);
router.get("/products/all", getAllProducts);

module.exports = router;
