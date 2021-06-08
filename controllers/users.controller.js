const { response } = require("express");

const getUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    msg: "GET from controller",
    id,
  });
};

const postUser = (req, res = response) => {
  const { group, city } = req.query;
  const { firstName, lastName, age } = req.body;
  res.status(201).json({
    msg: "POST from controller",
    firstName,
    lastName,
    age,
    group,
    city,
  });
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

module.exports = { getUser, postUser, putUsers, patchUser, deleteUser };
