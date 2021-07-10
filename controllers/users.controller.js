const { response } = require("express");
const bcryptjs = require("bcryptjs");
const UserSchema = require("../models/user");

const getUsersPaginated = async (req, res) => {
  const { limit = 10, page = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    UserSchema.countDocuments(query),
    UserSchema.find(query).limit(Number(limit)).skip(Number(page)),
  ]);

  res.status(200).json({ total, users });
};

const createUser = async (req, res = response) => {
  const { firstName, lastName, email, password, role } = req.body;

  const salt = await bcryptjs.genSaltSync();
  const encryptPass = bcryptjs.hashSync(password, salt);
  const newUser = new UserSchema({
    firstName,
    lastName,
    email,
    password: encryptPass,
    role,
  });
  const userCreated = await newUser.save();
  res.status(201).json(userCreated);
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, email, password, isGoogleLogin, ...user } = req.body;
  if (password) {
    const salt = await bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
  }

  const userUpdated = await UserSchema.findByIdAndUpdate(id, user, {
    new: true,
  });
  res.status(200).json(userUpdated);
};

const patchUser = (req, res = response) => {
  res.status(401).json({
    msg: "PATCH from controller",
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;
  const userDeleted = await UserSchema.findByIdAndUpdate(
    id,
    { status: false },
    {
      new: true,
    }
  );
  res.status(200).json({ userDeleted, uid });
};

module.exports = {
  getUsersPaginated,
  createUser,
  putUsers,
  patchUser,
  deleteUser,
};
