const { Router, request, response } = require("express");
const router = Router();

/**
 * Get user information using provided id.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function getUser(req, res) {
  const id = req.params.id;
}

// update a user
// delete a user
// follow a user
// unfollow a user

module.exports = router;
