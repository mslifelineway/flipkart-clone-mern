const {
  getInitialData,
} = require("../../controllers/admin/initialData.controller");

const router = require("express").Router();

router.get("/getInitialData", getInitialData);

module.exports = router;