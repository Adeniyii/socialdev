const { Router, request, response } = require("express");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

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

    await PostModel.findByIdAndUpdate(postID, {
      $set: update,
    });
    return res.status(200).json({ message: "Post updated successfully!" });
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

    await PostModel.findByIdAndDelete(postID);
    return res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Like/Unlike a post.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function likePost(req, res) {
  const postID = req.params.id;
  const user = req.user;

  try {
    const post = await PostModel.findById(postID);
    if (post.likes.includes(user.userID)) {
      await PostModel.findByIdAndUpdate(postID, {
        $pull: { likes: user.userID },
      });
      return res.status(200).json({
        message: "You unliked a post successfully!",
      });
    }

    await PostModel.findByIdAndUpdate(postID, {
      $push: { likes: user.userID },
    });
    return res.status(200).json({ message: "You liked a post successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Get a post.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getPost(req, res) {
  const postID = req.params.id;
  const user = req.user;

  try {
    const post = await PostModel.findById(postID);
    return res
      .status(200)
      .json({ message: "Post fetched successfully!", data: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Get all followings' posts.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function getTimeline(req, res) {
  const user = req.user;

  try {
    const { following } = await UserModel.findById(user.userID);
    const userPosts = await PostModel.find({ userID: user.userID });
    const followingPosts = await Promise.all(
      following.map((userID) => {
        const post = PostModel.find({ userID: userID });
        return post;
      })
    );
    const timeline = userPosts.concat(...followingPosts);
    return res
      .status(200)
      .json({ message: "Timeline fetched successfully!", data: timeline });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

router.post("/", newPost);
router.put("/:id/like", likePost);
router.get("/timeline", getTimeline);
router.route("/:id").put(updatePost).delete(deletePost).get(getPost);

module.exports = router;
