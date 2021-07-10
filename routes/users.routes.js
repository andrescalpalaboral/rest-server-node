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
  userIsActive,
} = require("../helpers/validators");
const {
  validateIfContainsRole,
  validateJWT,
  validateFields,
} = require("../middlewares");

const ALLOWED_ROLES = ["ADMIN_ROLE", "TEST_ROLE", "USER_ROLE"];

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
    validateJWT,
    validateIfContainsRole(ALLOWED_ROLES),
    check("id", "Invalid mongo ID").isMongoId(),
    check("id").custom(userIsActive),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
