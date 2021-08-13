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
  const userID = req.session.userID;

  try {
    const newPost = await PostModel({
      ...req.body,
      userID,
    });

    const savedPost = await newPost.save();
    return res.status(201).json({ message: "Post created successfully!" });
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
  const postID = req.params.id;
  const userID = req.session.userID;

  try {
    const user = await UserModel.findById(userID);
    const originalPost = await PostModel.findById(postID);
    if (!originalPost) {
      return res.status(404).json({ message: "This post does not exist!" });
    }

    if (originalPost.userID !== userID && !user.isAdmin) {
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
  const postID = req.params.id;
  const userID = req.session.userID;

  try {
    const user = await UserModel.findById(userID);
    const originalPost = await PostModel.findById(postID);
    if (!originalPost) {
      return res.status(404).json({ message: "This post does not exist!" });
    }

    if (originalPost.userID !== userID && !user.isAdmin) {
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
  const userID = req.session.userID;

  try {
    const post = await PostModel.findById(postID);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    // Dislike post if user already likes post.
    if (post.likes.includes(userID)) {
      await PostModel.findByIdAndUpdate(postID, {
        $pull: { likes: userID },
      });
      return res.status(200).json({
        message: "You unliked a post successfully!",
      });
    }
    // Like post otherwise
    await PostModel.findByIdAndUpdate(postID, {
      $push: { likes: userID },
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
  const userID = req.session.userID;

  try {
    const post = await PostModel.findById(postID);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    return res
      .status(200)
      .json({ message: "Post fetched successfully!", payload: post });
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
  const userID = req.session.userID;

  try {
    const { following } = await UserModel.findById(userID);
    const userPosts = await PostModel.find({ userID: userID });
    const followingPosts = await Promise.all(
      following.map((userIDs) => {
        const post = PostModel.find({ userID: userIDs });
        return post;
      })
    );
    const timeline = userPosts.concat(...followingPosts);
    return res
      .status(200)
      .json({ message: "Timeline fetched successfully!", payload: timeline });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

router.post("/", newPost);
router.put("/:id/like", likePost);
router.get("/timeline", getTimeline);
router.route("/:id").put(updatePost).delete(deletePost).get(getPost);

module.exports = router;
