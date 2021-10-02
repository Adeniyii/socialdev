const { Router } = require("express");
const {
  getCurrentUser,
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} = require("../controllers/userController");
const router = Router();

router.get("/current", getCurrentUserntUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.put("/:id/follow", followUser).put("/:id/unfollow", unfollowUser);

module.exports = router;
