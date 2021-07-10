require("dotenv").config();

const environmentVariables = {
  port: process.env.PORT,
  mongoStringConnection: process.env.MONGO_CONNECTION_STRING,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
};

module.exports = { environmentVariables };
