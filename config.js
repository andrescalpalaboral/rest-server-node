require("dotenv").config();

const environmentVariables = {
  port: process.env.PORT,
  mongoStringConnection: process.env.MONGO_CONNECTION_STRING,
};

module.exports = { environmentVariables };
