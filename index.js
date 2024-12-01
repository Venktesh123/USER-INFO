const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./dbConnection");
const router = require("./router/placeRouter");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set

// Middleware to parse JSON request bodies
app.use(express.json());

// Database connection
dbConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the app if the database connection fails
  });

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

// Routes
app.use("/place", router);

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting the server on port ${PORT}:`, err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
