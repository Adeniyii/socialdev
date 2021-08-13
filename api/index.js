const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const { connectDB } = require("./controllers/db");
const { isAuthenticated } = require("./middlewares/auth");
require("dotenv").config();

const { PORT, MONGO_URI, SECRET } = process.env;
const port = PORT || 8000;
connectDB(MONGO_URI);

const app = express();

// Middleware
app.use(morgan("common"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  session({
    secret: SECRET,
    saveUninitialized: false,
    resave: false,
    // rolling: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      touchAfter: 3600, //seconds
    }),
    cookie: {
      maxAge: 1000 * 60 * 3,
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  })
);

// Routes
app.get("/", (req, res) => {
  return res.json("Welcome peeps!");
});
app.use("/api/auth", authRoute);
app.use("/api/users", isAuthenticated, userRoute);
app.use("/api/post", isAuthenticated, postRoute);

// Handle database reconnection error
mongoose.connection.on("error", (err) => {
  console.log("Reconnection error: ========== \n", error);
});

// Server
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
