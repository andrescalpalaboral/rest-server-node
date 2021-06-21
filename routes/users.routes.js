const { Router } = require("express");
const { check } = require("express-validator");
const {
  putUsers,
  getUsersPaginated,
  createUser,
  patchUser,
  deleteUser,
} = require("../controllers/users.controller");
const {
  validateRoleDB,
  emailsAlreadyExists,
  userAlreadyExists,
} = require("../helpers/validators");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get("/", getUsersPaginated);

router.post(
  "/",
  [
    check("firstName", "Required value").not().isEmpty(),
    check("lastName", "Required value").not().isEmpty(),
    check("password", "Minimun length is 8").isLength({ min: 8 }),
    check("email", "Email with wrong format").isEmail(),
    check("email").custom(emailsAlreadyExists),
    check("role").custom(validateRoleDB),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("id", "Invalid mongo ID").isMongoId(),
    check("id").custom(userAlreadyExists),
    check("role").custom(validateRoleDB),
    validateFields,
  ],
  putUsers
);

router.patch("/", patchUser);

router.delete(
  "/:id",
  [
    check("id", "Invalid mongo ID").isMongoId(),
    check("id").custom(userAlreadyExists),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
