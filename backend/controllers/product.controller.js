const slugify = require("slugify");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.addProduct = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Please provide the product details",
    });
  }
  const { name, price, description, quantity, categoryId } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  //createdBy: req.user._id => user has created in adminMiddleware
  const product = new Product({
    name: name,
    slug: slugify(name),
    price: price,
    description: description,
    quantity: quantity,
    categoryId: categoryId,
    pictures: productPictures,
    createdBy: req.user._id,
  });

  product.save((err, product) => {
    if (err)
      return res.status(400).json({
        message: "Error occure while adding the product. ",
        result: err,
      });
    else if (product)
      return res.status(201).json({
        message: "Product added successfully!",
        result: product,
      });
  });
};

exports.getProducts = (req, res) => {
  Product.find().exec((err, products) => {
    if (err)
      return res.status(400).json({
        message: "Error occure while fetching the products. ",
        result: err,
      });
    else if (products)
      return res.status(200).json({
        message: "Products fetched successfully!",
        result: products,
      });
  });
};

exports.getProductById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "Please provide the product id.",
      error: "Product id is required!",
    });
  }
  Product.find({ _id: req.params.id })
    .populate({ path: "categoryId", select: { name: 1 } })
    .exec((err, products) => {
      if (err)
        return res.status(400).json({
          message: "Error occure while fetching the products. ",
          result: err,
        });
      else if (products)
        return res.status(200).json({
          message: "Product details fetched successfully!",
          product: products[0],
        });
    });
};

function filterProductsInPriceRange(products, minPrice, maxPrice) {
  return products.filter(p => p.price > minPrice && p.price <= maxPrice )
}
exports.getProductByCategorySlug = (req, res) => {
  const { slug } = req.params;

  Category.findOne({ slug }, { _id: 1 })
    .then((categoryId) => {
      Product.find({ categoryId })
        .then(async (products) => {
          res.status(200).json({
            products,
            productsByPrice : {
              under5K : await filterProductsInPriceRange(products, 0, 5000),
              under10K : await filterProductsInPriceRange(products, 5000, 10000),
              under15K : await filterProductsInPriceRange(products, 10000, 15000),
              under20K : await filterProductsInPriceRange(products, 15000, 20000),
              under25K : await filterProductsInPriceRange(products, 20000, 25000),
              under30K : await filterProductsInPriceRange(products, 25000, 30000),
            }
          })
        })
        .catch((e) => {
          res.status(400).json(e);
        });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};
