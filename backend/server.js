const express = require("express");
const server = express();
require("dotenv").config();
require("./mongoose");
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routers/auth.router");
const adminRouter = require("./routers/admin/auth.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router");
const cartRouter = require("./routers/cart.router");
const { static } = require("express");
const path = require('path');

server.use(morgan("dev"));
server.use(cors());
server.use(bodyParser.json());
server.use("/public/category-images", static(path.join(__dirname, "uploads/category-images")));
server.use("/public/product-images", static(path.join(__dirname, "uploads/product-images")))

server.use("/api", authRouter);
server.use("/api", adminRouter);
server.use("/api", categoryRouter);
server.use("/api", productRouter);
server.use("/api", cartRouter);


server.all("**", (req, res) => {
  res.status(400).json({
    status: false,
    message: "location not found!",
  });
});

server.listen(port, () => {
  console.log("Server is listening on * " + port);
});
