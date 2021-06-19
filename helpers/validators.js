const RoleSchema = require("../models/role");

const validateRoleDB = async (role) => {
  const foundRole = await RoleSchema.findOne({ role });
  if (!foundRole) {
    throw new Error(`The role ${role} does not exist`);
  }
};

module.exports = { validateRoleDB };
