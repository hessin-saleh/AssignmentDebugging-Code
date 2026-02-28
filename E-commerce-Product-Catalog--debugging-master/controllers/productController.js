const Product = require("../models/Product");

// add try, catch and async
const createProduct = async(req, res) => {
 try{ const { name, price } = req.body;
// add return  tostope the code
  if (!name || !price) {
    return res.status(400).json({ msg: "Missing Data" });
  }
// add await and vareabel storge prodct data
  const prodct = await Product.create({ name, price })
    res.status(201).json({ msg: "Product Created", data: prodct });}
    catch(err){console.log(err)
      res.status(500).json({ msg: "Errore server" })
    }
};
// const createProduct = (req, res) => {
//   const { name, price } = req.body;
// // add return  tostope the code
//   if (!name || !price) {
//     return res.status(400).json({ msg: "Missing Data" });
//   }

//   Product.create({ name, price }).then((product) => {
//     res.status(201).json({ msg: "Product Created", data: product });
//   });
// };

const getAllProducts = async (req, res) => {
  try {
//We convert the variable to a number, mongose the built-in conversion is implicit, it is preferable to convert it directly.
    const limit = Number(req.query.limit) || 10;

    const products = await Product.find().limit(limit);
    res.status(200).json({ msg: "Products fetched", data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { createProduct, getAllProducts };
