const { Router } = require("express");
const { check } = require("express-validator");
const {
  putUsers,
  getUser,
  createUser,
  patchUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateRoleDB } = require("../helpers/validators");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get("/:id", getUser);

router.post(
  "/",
  [
    check("firstName", "Required value").not().isEmpty(),
    check("lastName", "Required value").not().isEmpty(),
    check("password", "Minimun length is 8").isLength({ min: 8 }),
    check("email", "Email with wrong format").isEmail(),
    check("role").custom(validateRoleDB),
    validateFields,
  ],
  createUser
);

router.put("/", putUsers);

router.patch("/", patchUser);

router.delete("/", deleteUser);

module.exports = router;
