const {
  addProduct,
  getProducts,
  getProductById,
} = require("../controllers/product.controller");
const { requireSignin, adminMiddleware } = require("../middlewares");
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
  upload.array("productImages"),
  addProduct
);

//get all products
router.get("/product/get-products", getProducts);
//get product by id
router.get("/product/:id/details", getProductById);

module.exports = router;
