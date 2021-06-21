const RoleSchema = require("../models/role");
const UserSchema = require("../models/user");

const validateRoleDB = async (role = "") => {
  const roleFound = await RoleSchema.findOne({ role });
  if (!roleFound) {
    throw new Error(`The role ${role} does not exist`);
  }
};

const emailsAlreadyExists = async (email = "") => {
  const userFound = await UserSchema.findOne({ email });
  if (userFound) {
    throw new Error(`The email ${email} already exists`);
  }
};

const userAlreadyExists = async (id) => {
  const userFound = await UserSchema.findById(id);
  if (!userFound) {
    throw new Error(`User with id: ${id} not found`);
  }
};

module.exports = { validateRoleDB, emailsAlreadyExists, userAlreadyExists };
