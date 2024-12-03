const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controller/userController");

// Change GET to POST for creating a place
router.post("/create-user", createUser);
router.post("/logIn", login);

module.exports = router;
