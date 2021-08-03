const bcrypt = require("bcrypt");

/**
 * Function to hash a password.
 * @param {String} password Password to be hashed.
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * Function to verify a password.
 * @param {String} password Normal password from input.
 * @param {String} hashedPassword Hashed password from database.
 */
async function verifyPassword(password, hashedPassword) {
  const decryptedPW = await bcrypt.compare(password, hashedPassword);
  return decryptedPW;
}

module.exports = { hashPassword, verifyPassword };
