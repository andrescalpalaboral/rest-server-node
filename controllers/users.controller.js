const { response } = require("express");
const bcryptjs = require("bcryptjs");
const UserSchema = require("../models/user");

const getUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    msg: "GET from controller",
    id,
  });
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

const putUsers = (req, res = response) => {
  res.status(400).json({
    msg: "PUT from controller",
  });
};

const patchUser = (req, res = response) => {
  res.status(401).json({
    msg: "PATCH from controller",
  });
};

const deleteUser = (req, res = response) => {
  res.status(500).json({
    msg: "DELETE from controller",
  });
};

module.exports = { getUser, createUser, putUsers, patchUser, deleteUser };
