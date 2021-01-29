const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const shortId = require('shortid');

exports.signUp = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: null,
      message: "Please provide the user details!",
    });
  }
  User.findOne({ email: req.body.email }).exec(async(err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Something went wrong due to internal issue.",
      });
    }
    if (user) {
      return res.status(400).json({
        error: false,
        message: "User already registered!",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    let hashedPassword = await bcrypt.hashSync(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
      username: shortId.generate(),
    });

    _user.save((err, data) => {
      if (data) {
        return res.status(200).json({
          message: "Account registered successfully!",
          result: data,
        });
      }
      if (err) {
        return res.status(400).json({
          error: err,
          message: "Something went wrong.",
        });
      }
    });
  });
};

exports.signIn = (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) return res.status(400).json({ err, message: "Something went wrong.", });
      if (user) {
        if (user.authenticate(req.body.password)) {
          //authenticated successfully, so let's create a token that will manage the user session
          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "3d",
          });
          res.cookie("token", token, { expiresIn: "3d"});
          const { firstName, lastName, email, role, fullName } = user;
          return res.status(200).json({
            token,
            user: { firstName, lastName, email, role, fullName },
          });
        }
        return res.status(400).json({ error: null, message: "Something went wrong!" });
      } else {
        return res.status(400).json({ error: null, message: "Wrong credentials!" });
      }
    });
  } else {
    return res
      .status(400)
      .json({ error: null, message: "Please provide the login credentials!" });
  }
};
