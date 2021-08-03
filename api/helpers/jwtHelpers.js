const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET, REF_SECRET } = process.env;

/**
 * Generate an access token.
 * @param {String} secret A secret with which to encode the access token.
 * @param {{}} user A user object to store on the access token.
 */
function genAccessToken(user) {
  if (!user) {
    throw new Error("No user was provided!");
  }

  const payload = {
    userID: user.id,
    isAdmin: user.isAdmin,
  };

  try {
    const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15m" });
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
function genRefreshToken(user) {
  if (!user) {
    throw new Error("No user was provided!");
  }

  const payload = {
    userID: user.id,
    isAdmin: user.isAdmin,
  };

  try {
    const refreshToken = jwt.sign(payload, REF_SECRET, { expiresIn: "1d" });
    return refreshToken;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Check validity of provided token.
 * @param {String} token Access token to be verified.
 */
function verifyAccessToken(token) {
  const verified = jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      throw new Error("Token is not valid!");
    }
    return user;
  });
}

/**
 * Check validity of provided token.
 * @param {String} token Refresh token to be verified.
 */
function verifyRefreshToken(token) {
  const verified = jwt.verify(token, REF_SECRET, (err, user) => {
    if (err) {
      throw new Error("Token is not valid!");
    }
    return user;
  });
}

module.exports = {
  genAccessToken,
  genRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
