const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parse");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const { connectDB } = require("./controllers/db");
const { verifyToken } = require("./middlewares/authJWT");
require("dotenv").config();

const { PORT, MONGO_URI } = process.env;
const port = PORT || 8000;
connectDB(MONGO_URI);

const app = express();

// Middleware
app.use(morgan("common"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.json("Welcome peeps!"));
app.use("/api/auth", authRoute);
app.use("/api/users", verifyToken, userRoute);
app.use("/api/post", verifyToken, postRoute);

// Handle database reconnection error
mongoose.connection.on("error", (err) => {
  console.log("Reconnection error: ========== \n", error);
});

// Server
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
