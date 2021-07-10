const { response } = require("express");
const bcryptjs = require("bcryptjs");
const UserSchema = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  const userFound = await UserSchema.findOne({ email });
  const passwordIsMatch = await bcryptjs.compareSync(
    password,
    userFound.password
  );
  if (!passwordIsMatch) {
    return res.status(400).json({
      msg: "Wrong password!",
    });
  }

  const jwt = await generateJWT(userFound.id);

  res.status(200).json({
    user: userFound,
    jwt,
  });
};

module.exports = { login };
