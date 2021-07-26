const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignin } = require("../controllers/auth.controller");
const { userIsActiveByEmail, emailNoExists } = require("../helpers/validators");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email with wrong format").isEmail(),
    check("email").custom(userIsActiveByEmail),
    check("email").custom(emailNoExists),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "Google token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignin
);

module.exports = router;
