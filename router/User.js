const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

// Log for debugging purposes
console.log("User Router Initialized");

// Define user-related routes
router.post("/signup", controller.createUser);
router.post("/login", controller.login);

module.exports = router;
