const router = require("express").Router();
const {
  addCategory,
  getCategories,
} = require("../controllers/category.controller");
const { requireSignin, adminMiddleware } = require("../middlewares");

//multer
const multer = require("multer");
const shortid = require("shortid");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.CATEGORY_IMAGE_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post("/category/addCategory", requireSignin, adminMiddleware, upload.single("categoryImage"), addCategory);
router.get("/category/getCategories", getCategories);


module.exports = router;
