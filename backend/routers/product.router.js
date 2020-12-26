const {
  addProduct,
  getProducts,
} = require("../controllers/product.controller");
const { requireSignin, adminMiddleware } = require("../middlewares");
const Product = require("../models/product.model");
const router = require("express").Router();

//multer
const multer = require("multer");
const shortid = require("shortid");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.PRODUCT_IMAGE_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post(
  "/product/add-products",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  addProduct
);

router.get("/product/get-products", getProducts);

module.exports = router;
