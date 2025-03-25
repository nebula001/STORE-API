const Product = require("../models/product");

const getProductStatic = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

const getProducts = async (req, res) => {
  console.log(req.query);
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = { getProducts, getProductStatic };
