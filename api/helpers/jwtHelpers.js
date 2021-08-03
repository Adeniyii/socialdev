const jwt = require("jsonwebtoken");
/**
 * Generate an access token.
 * @param {String} secret A secret with which to encode the access token.
 * @param {{}} user A user object to store on the access token.
 */
function genAccessToken(secret, user) {
  if (!user) {
    throw new Error("No user was provided!");
  }

  const payload = {
    userID: user.id,
    isAdmin: user.isAdmin,
  };

  try {
    const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" });
    return accessToken;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Generate a refresh token.
 * @param {String} secret A secret with which to encode the refresh token.
 * @param {{}} user A user to store on the refresh token.
 */
function genRefreshToken(secret, user) {
  if (!user) {
    throw new Error("No user was provided!");
  }

  const payload = {
    userID: user.id,
    isAdmin: user.isAdmin,
  };

  try {
    const refreshToken = jwt.sign(payload, secret, { expiresIn: "1d" });
    return refreshToken;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { genAccessToken, genRefreshToken };
