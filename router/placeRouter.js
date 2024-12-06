const express = require("express");
const router = express.Router();
const controller = require("../controller/placesController");

// Change GET to POST for creating a place
router.post("/create", controller.createPlace);
router.delete("/deleteItem", controller.deleteItem);

module.exports = router;
