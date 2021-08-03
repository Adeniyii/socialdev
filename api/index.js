const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const { connectDB } = require("./controllers/db");
require("dotenv").config();

const { PORT, MONGO_URI } = process.env;
const port = PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(helmet());

// Routes
app.get("/", (req, res) => res.json("Welcome peeps!"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
// Handle database reconnection error
mongoose.connection.on("error", (err) => {
  console.log("error", error);
});

// Server
app.listen(3000, () => {
  console.log(`Listening on port 3000...`);
  connectDB(MONGO_URI);
});
