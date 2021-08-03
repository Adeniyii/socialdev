const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  return res.json("Welcome to users page!");
});

module.exports = router;
