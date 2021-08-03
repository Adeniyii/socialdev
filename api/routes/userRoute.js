const { Router, request, response } = require("express");
const UserModel = require("../models/UserModel");
const router = Router();

/**
 * Get user information using provided id.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function getUser(req, res) {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(400).json({ message: "No user was found!" });
    res.status(200).json({ message: "User found successfully!", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// update a user
// delete a user
// follow a user
// unfollow a user

router.get("/:id", getUser);

module.exports = router;
