require("dotenv").config();

const environmentVariables = {
  port: process.env.PORT,
  mongoStringConnection: process.env.MONGO_CONNECTION_STRING,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};

module.exports = { environmentVariables };
