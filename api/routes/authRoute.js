const { Router } = require("express");
const UserModel = require("../models/UserModel");

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await new UserModel({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

module.exports = router;
