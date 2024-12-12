const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./dbConnection");
const placeRouter = require("./router/placeRouter");
const userRouter = require("./router/User");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set

// Middleware to parse JSON request bodies
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Orign,X-Requested-With,Content-Type,Acceept,Authorizarion"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

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
app.use("/place", placeRouter);
app.use("/auth", userRouter);

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting the server on port ${PORT}:`, err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
