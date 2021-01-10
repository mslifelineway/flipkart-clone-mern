const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.signUp = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      status: false,
      message: "Admin details must not be empty!",
    });
  }
  User.findOne({ email: req.body.email }).exec(async(err, user) => {
    if (err) {
      return res.status(400).json({
        error: null,
        message: "Something went wrong due to internal issue.",
      });
    }
    if (user) {
      return res.status(400).json({
        error: null,
        message: "Admin already registered!",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    let hashedPassword = await bcrypt.hashSync(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
      username: Math.random().toString(),
      role: process.env.ADMIN_ROLE,
    });

    _user.save((err, data) => {
      console.log("error : " + err);
      if (data) {
        return res.status(200).json({
          message: "Account registered successfully!",
          result: data,
        });
      }
      if (err) {
        return res.status(400).json({
          error: err,
          message: "Failed to register the account!",
        });
      }
    });
  });
};

exports.signIn = (req, res) => {
  if (!(req.body.email && req.body.password)) {
    return res
      .status(400)
      .json({ error: null, message: "Please provide the login credentials!" });
  } else {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) return res.status(400).json({ err,  message: "Something went wrong!" });
      if (user) {
        if (
          user.authenticate(req.body.password) &&
          user.role === process.env.ADMIN_ROLE
        ) {
          //authenticated successfully, so let's create a token that will manage the user session
          const token = jwt.sign({ _id: user._id , role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          const { firstName, lastName, email, role, fullName } = user;
          res.cookie("token", token, { expiresIn: "10d"});
          return res.status(200).json({
            token,
            user: { firstName, lastName, email, role, fullName },
          });
        }
        return res.status(400).json({ error: null, message: "Access Denied! You are not an admin." });
      } else {
        return res.status(400).json({ error: null, message: "Wrong Credentials!!" });
      }
    });
  }
};

exports.signOut = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "SignOut successfully!"
  })
}