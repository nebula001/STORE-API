const Product = require("../models/product");

const getProductStatic = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

const getProducts = async (req, res) => {};
module.exports = { getProducts, getProductStatic };
