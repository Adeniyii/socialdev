const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { verifyAccessToken } = require("../helpers/jwtHelpers");
/**
 * Verify if a user is authorized.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

module.exports = { verifyToken };
