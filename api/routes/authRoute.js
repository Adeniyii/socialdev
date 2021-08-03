const { Router } = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const router = Router();

router.post("/register", async (req, res) => {
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
    res.status(401).json(error.message);
  }
});

module.exports = router;
