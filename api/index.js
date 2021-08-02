const express = require("express");
const morgan = require("morgan");
const connectDB = require("./controllers/db");
require("dotenv").config();

const { PORT, MONGO_URI } = process.env;
const port = PORT || 5000;

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
  connectDB(MONGO_URI);
});
