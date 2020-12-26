const { signIn, signUp, signOut } = require("../../controllers/admin/auth.controller");
const { requireSignin } = require("../../middlewares");
const { validateRequest, isRequestValidated } = require("../../validators/auth");

const router = require("express").Router();

router.post("/admin/signIn", signIn);

router.post("/admin/signUp", validateRequest, isRequestValidated, signUp);

router.post("/admin/signout", requireSignin, signOut);

module.exports = router;
