const express = require("express");
const router = express.Router();
const { createPlace } = require("../controller/placesController");

// Change GET to POST for creating a place
router.post("/create", createPlace);

module.exports = router;
