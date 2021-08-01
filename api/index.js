const express = require("express");
const morgan = require("morgan");

require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("common"));

// Routes
app.use("/", (req, res) => {
  res.json("Welcome peeps!");
});

// Server
app.listen(3000, () => {
  console.log(`Listening on port 3000...`);
});
