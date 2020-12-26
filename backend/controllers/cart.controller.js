const Cart = require("../models/cart.model");

exports.addItemsToCart = (req, res) => {
  if (req.body) {
    //user: req.user._id => has created or coming from userMiddleware

    //since one user can have exactly one cart
    Cart.findOne({ user: req.user._id }).exec((err, existingCart) => {
      if (err) {
        return res.status(400).json({
          message: "Error occure while adding the items to the cart. ",
          result: err,
        });
      } else if (existingCart) {
        //cart existed, so let's push the cartItem in the existingCart or user's cart
        const product = req.body.cartItem.product;
        //check if item has already added to the cart or not, if exists the update or increase or decrease the quantity
        const existingItem = existingCart.cartItems.find(
          (c) => c.product == product
        );
        let condition, update;
        if (existingItem) {
          //item has added to the cart already
          condition = { user: req.user._id, "cartItems.product": product };
          update = {
            $set: {
              //.$ -> will target the product in cartItems[] which we are going to update
              "cartItems.$": {
                ...req.body.cartItem,
                quantity: existingItem.quantity + req.body.cartItem.quantity,
              },
            },
          };
        } else {
          //item has not added to the cart yet. so let's update
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: req.body.cartItem,
            },
          };
        }
        Cart.findOneAndUpdate(condition, update).exec((err, updatedCart) => {
          if (err)
            return res.status(400).json({
              message: "Error occure while adding the items to the cart. ",
              result: err,
            });
          else if (updatedCart)
            return res.status(201).json({
              message: "items added successfully to the cart!",
              result: updatedCart,
            });
        });
      } else {
        //cart didn't exist, so save the cart
        const cart = new Cart({
          user: req.user._id,
          cartItems: [req.body.cartItem],
        });

        cart.save((err, savedCart) => {
          if (err)
            return res.status(400).json({
              message: "Error occure while adding the items to the cart. ",
              result: err,
            });
          else if (savedCart)
            return res.status(201).json({
              message: "items added successfully to the cart!",
              result: savedCart,
            });
        });
      }
    });
  } else {
    return res.status(400).json({
      message: "Please provide the cart data!",
    });
  }
};
