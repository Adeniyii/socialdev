const { Router } = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const router = Router();

/**
 * Register a user to the database.
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function registerUser(req, res) {
  const { username, email, password } = req.body;
  try {
    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

/**
 * Log a user into the application.
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid username. Please try again!" });

    const decodedPassword = await bcrypt.compare(password, user.password);
    if (!decodedPassword)
      return res
        .status(400)
        .json({ message: "Invalid password. Please try again!" });

    res.status(200).json({ message: "Logged in successfully!", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

router.post("/register", registerUser).post("/login", loginUser);

module.exports = router;
