const { OAuth2Client } = require("google-auth-library");
const { environmentVariables } = require("../config");
const client = new OAuth2Client(environmentVariables.googleClientId);

const googleVerify = async (idToken = "") => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: environmentVariables.googleClientId,
  });
  const {
    given_name: firstName,
    family_name: lastName,
    email,
    img: image,
  } = ticket.getPayload();
  return { firstName, lastName, email, image };
};

module.exports = { googleVerify };
