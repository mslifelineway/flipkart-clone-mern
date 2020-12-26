const { signUp, signIn, requireSignin } = require("../controllers/auth.controller");
const { validateRequest, isRequestValidated } = require("../validators/auth");

const router = require("express").Router();

router.post("/signIn", signIn);

router.post("/signUp", validateRequest, isRequestValidated, signUp);

// //verifying that user has already logged in then send to his profile or some other place
// router.post("/profile", requireSignin, (req, res) => {
//     res.status(200).json({ user: 'user profile'})
// });

module.exports = router;
