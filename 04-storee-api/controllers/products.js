const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort,fields } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if(fields){
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList); 
  }

  const page =Number(req.query.page)||1;
  const limit =Number(req.query.limit)||10;
  const skip=(page-1)*limit;
  result=result.limit(limit).skip(skip)

  const products = await result;
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
