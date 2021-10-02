const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { verifyAccessToken } = require("../helpers/jwtHelpers");
const UserModel = require("../models/UserModel");
/**
 * Verify if a user is authorized.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function isAuthenticated(req, res, next) {
  if (!req.session || !req.session.userID) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  try {
    const user = await UserModel.findById(req.session.userID);
    if (!user) {
      return res.status(403).json({ message: "You are not authorized!" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { isAuthenticated };
