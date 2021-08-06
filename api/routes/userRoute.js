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
    return res.status(500).json({ message: error.message });
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
      // Hash password
      const hashedPW = await hashPassword(req.body.password);
      req.body.password = hashedPW;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Update user
  const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: req.body });
  return res
    .status(200)
    .json({ message: "User updated successfully!", data: updatedUser });
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
      .json({ message: "You can only delete your account!" });
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "User deleted successfully!", data: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Follow a user.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function followUser(req, res) {
  const id = req.params.id;
  const userID = req.user.userID;

  if (id === userID) {
    return res.status(403).json({ message: "You cannot follow yourself!" });
  }

  try {
    const { following } = await UserModel.findById(userID);
    const { followers } = await UserModel.findById(id);

    if (following.includes(id) && followers.includes(userID)) {
      return res
        .status(403)
        .json({ message: "You are already following this user!" });
    }

    const user = await UserModel.findByIdAndUpdate(userID, {
      $push: { following: id },
    });

    await UserModel.findByIdAndUpdate(id, { $push: { followers: userID } });

    res.status(201).json({ message: "User followed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Unfollow a user.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function unfollowUser(req, res) {
  const id = req.params.id;
  const { userID } = req.user;

  if (id === req.user.userID) {
    res.status(403).json({ message: "You cannot unfollow yourself!" });
  }

  try {
    const unfollower = await UserModel.findById(userID);
    const unfollowee = await UserModel.findById(id);

    if (
      !unfollower.following.includes(id) &&
      !unfollowee.followers.includes(userID)
    ) {
      return res
        .status(403)
        .json({ message: "You are not following this user!" });
    }

    const user = await UserModel.findByIdAndUpdate(userID, {
      $pull: { following: id },
    });
    await UserModel.findByIdAndUpdate(id, { $pull: { followers: userID } });

    res.status(200).json({ message: "User was unfollowed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.put("/:id/follow", followUser).put("/:id/unfollow", unfollowUser);

module.exports = router;
