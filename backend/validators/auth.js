const { check, validationResult } = require("express-validator");

exports.validateRequest = [
  check("firstName").notEmpty().withMessage("fistName is required!"),
  check("lastName").notEmpty().withMessage("lastName is required!"),
  check("email").isEmail().withMessage("valid email is required!"),
  check("password").notEmpty().withMessage("Password is required!")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long!"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  next();
};
