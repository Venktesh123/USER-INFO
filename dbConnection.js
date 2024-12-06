const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
