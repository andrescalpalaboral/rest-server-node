const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const UserSchema = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { firstName, lastName, email, image } = await googleVerify(id_token);

    let user = await UserSchema.findOne({ email });

    if (!user) {
      const dataUser = {
        firstName,
        lastName,
        email,
        image,
        isGoogleLogin: true,
        password: "...",
      };

      user = new UserSchema(dataUser);
      await user.save();
    }

    if (!user.status) {
      res.status(401).json({
        msg: "User unauthorized",
      });
    }

    const jwt = await generateJWT(user.id);

    res.status(200).json({
      user,
      jwt,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Invalid Google token",
    });
  }
};

module.exports = { login, googleSignin };
