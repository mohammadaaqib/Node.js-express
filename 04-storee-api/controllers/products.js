const getAllProducts = async (req, res) => {
  res.status(200).send("Get all product");
};

const getAllProductsStatic = async (req, res) => {
  res.status(200).send("Get all product Statics");
};

module.exports={
    getAllProducts,
    getAllProductsStatic
}