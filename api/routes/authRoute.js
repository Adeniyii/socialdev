const { Router, request, response } = require("express");
const {
  genAccessToken,
  genRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwtHelpers");
const { hashPassword, verifyPassword } = require("../helpers/passwordHelpers");
const UserModel = require("../models/UserModel");

const router = Router();

/**
 * Register a user to the database.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function registerUser(req, res) {
  const { username, email, password } = req.body;
  try {
    // Hash user password
    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ message: "Registration successful!", data: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Log a user into the application.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    // Check username exists.
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid username. Please try again!" });
    }

    // Validate password.
    const decodedPassword = await verifyPassword(password, user.password);
    if (!decodedPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password. Please try again!" });
    }

    // Generate access & refresh tokens.
    const accessToken = genAccessToken(user);
    const refreshToken = genRefreshToken(user);

    res.status(200).json({
      message: "Logged in successfully!",
      data: { user, accessToken, refreshToken },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Refresh a user's access and refresh tokens.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function refreshToken(req, res) {
  const token = req.headers.authorization;
  try {
    const user = verifyRefreshToken(token);

    // Generate access & refresh tokens.
    const accessToken = genAccessToken(user);
    const refreshToken = genRefreshToken(user);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token!" });
  }
}

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/refresh", refreshToken);

module.exports = router;
