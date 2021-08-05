const { Router, request, response } = require("express");
const PostModel = require("../models/PostModel");

const router = Router();

/**
 * Upload a new post.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function newPost(req, res) {
  const user = req.user;

  try {
    const newPost = await PostModel({
      ...req.body,
      userID: user.userID,
    });

    const savedPost = await newPost.save();
    return res
      .status(201)
      .json({ message: "Post created successfully!", data: savedPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Update a post.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function updatePost(req, res) {
  const update = req.body;
  const user = req.user;
  const postID = req.params.id;

  try {
    const originalPost = await PostModel.findById(postID);
    if (!originalPost) {
      return res.status(400).json({ message: "This post does not exist!" });
    }

    if (originalPost.userID !== user.userID && !user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this post!" });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(postID, {
      $set: update,
    });
    return res
      .status(200)
      .json({ message: "Post updated successfully!", data: updatedPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Delete a post.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function deletePost(req, res) {
  const user = req.user;
  const postID = req.params.id;

  try {
    const originalPost = await PostModel.findById(postID);
    if (!originalPost) {
      return res.status(400).json({ message: "This post does not exist!" });
    }

    if (originalPost.userID !== user.userID && !user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this post!" });
    }

    const postDeleted = await PostModel.findByIdAndDelete(postID);
    return res
      .status(200)
      .json({ message: "Post deleted successfully!", data: postDeleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// get a post
// get all followings posts

router.post("/", newPost);
router.route("/:id").put(updatePost).delete(deletePost);

module.exports = router;
