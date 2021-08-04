const { Router, request, response } = require("express");
const { hashPassword } = require("../helpers/passwordHelpers");
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

/**
 * Update a user's details.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function updateUser(req, res) {
  const id = req.params.id;
  const user = req.user;

  if (id !== user.userID && !user.isAdmin) {
    return res
      .status(403)
      .json({ message: "You can only update your account!" });
  }

  // Update password if password was changed.
  if (req.body.password) {
    try {
      const hashedPW = await hashPassword(req.body.password);
      req.body.password = hashedPW;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  // Update user
  try {
    const user = await UserModel.findByIdAndUpdate(id, { $set: req.body });
    res.status(201).json({ message: "User updated successfully!", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Delete a user.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function deleteUser(req, res) {
  const id = req.params.id;
  const user = req.user;

  if (id !== user.userID && !user.isAdmin) {
    return res
      .status(403)
      .json({ message: "You can only update your account!" });
  }

  try {
    await UserModel.deleteOne({ id: id });
    res.status(201).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// follow a user
// unfollow a user

router.get("/:id", getUser).put("/:id", updateUser).delete("/:id", deleteUser);

module.exports = router;
