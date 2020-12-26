const router = require("express").Router();
const { addItemsToCart } = require("../controllers/cart.controller");
const { requireSignin, userMiddleware } = require("../middlewares");


router.post("/user/cart/add-cart", requireSignin, userMiddleware,addItemsToCart);
// router.get("/get-cart", getCategories);


module.exports = router;
