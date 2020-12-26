const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .json({ message: "Autherization token is required!" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if(req.user.role !== process.env.ADMIN_ROLE) {
    return res.status(400).json({message : "Admin access Denied!"})
  }
  next();
}

exports.userMiddleware = (req, res, next) => {
  if(req.user.role !== process.env.USER_ROLE) {
    return res.status(400).json({message : "User access Denied!"})
  }
  next();
}