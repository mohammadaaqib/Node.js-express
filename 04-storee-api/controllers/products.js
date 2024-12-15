const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, name, company } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name =  { $regex: name, $options: 'i' }
  }

  const products = await Product.find(queryObj);
  res.status(200).json({ total: products.length, products });
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
