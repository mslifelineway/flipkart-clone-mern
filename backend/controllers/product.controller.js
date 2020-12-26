const slugify = require("slugify");
const Product = require("../models/product.model");

exports.addProduct = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Please provide the product details",
    });
  }
  const { name, price, description, quantity, category } = req.body;

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
    category: category,
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
      return res.status(201).json({
        message: "Products fetched successfully!",
        result: products,
      });
  });
};
