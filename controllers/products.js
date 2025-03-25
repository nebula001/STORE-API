const Product = require("../models/product");

const getProductStatic = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products, nbHits: products.length });
};

const getProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regex = /\b(>|>=|<|<=|=)\b/g;
    let filter = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    const numericFiltersObject = {};
    filter = filter.split(",").forEach((element) => {
      const [field, symbol, value] = element.split("-");
      if (options.includes(field)) {
        numericFiltersObject[field] = { [symbol]: Number(value) };
      }
    });
    Object.assign(queryObject, numericFiltersObject);
  }
  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = { getProducts, getProductStatic };
