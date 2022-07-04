const express = require("express");
const router = express.Router();

//* Decunstruct the controllers to become Routes
const {
  register,
  login,
  forgotpassword,
  resetpassword,
} = require("../controllers/auth");
//Makes the register route through the controller
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

module.exports = router;
