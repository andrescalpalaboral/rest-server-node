const { Router } = require("express");
const {
  putUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/users.controller");

const router = Router();

router.get("/:id", getUser);

router.post("/", postUser);

router.put("/", putUsers);

router.patch("/", patchUser);

router.delete("/", deleteUser);

module.exports = router;
