const jwt = require("jsonwebtoken");
const { environmentVariables } = require("../config");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      environmentVariables.jwt_secret_key,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Problem generating the token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
