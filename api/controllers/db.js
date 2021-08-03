const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(url) {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Connected to ${conn.connection.name} ...`);
  } catch (error) {
    console.log("connection error: ", error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
