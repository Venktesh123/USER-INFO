const { default: mongoose } = require("mongoose");
const Place = require("../models/place");
const User = require("../models/User");

module.exports.createPlace = async (req, res) => {
  console.log("place");
  const placeData = req.body; // Data sent in the request body

  try {
    // Validate the request body
    if (
      !placeData.title ||
      !placeData.description ||
      !placeData.image ||
      !placeData.address ||
      !placeData.location ||
      !placeData.creator ||
      typeof placeData.location.lat !== "number" ||
      typeof placeData.location.lng !== "number"
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Find the user by ID
    let user;
    try {
      user = await User.findById(placeData.creator);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.log("Error finding user:", err);
      return res.status(500).json({ message: "Error finding user" });
    }

    // Save the place to the database
    const newPlace = new Place(placeData);
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const savedPlace = await newPlace.save({ session });
      user.places.push(savedPlace._id); // Push the place's ID to the user's places
      await user.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Send a success response
      res
        .status(201)
        .json({ message: "Place created successfully", place: savedPlace });
    } catch (err) {
      console.log("Error saving place or user:", err);
      await session.abortTransaction();
      session.endSession();
      return res
        .status(500)
        .json({ message: "Error saving place or user data" });
    }
  } catch (error) {
    console.error("Error creating place:", error);
    res
      .status(500)
      .json({ message: "Failed to create place", error: error.message });
  }
};
// controllers/itemController.js

// Delete item by ID
module.exports.deleteItem = async (req, res) => {
  console.log("delete");

  // Get and trim the id from the query parameters
  const { id } = req.query;
  const cleanedId = id ? id.trim() : null; // Trim any unwanted characters

  if (!cleanedId) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const place = await Place.findById(cleanedId).populate("creator");
    console.log(place);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    console.log("Place creator:", place.creator);
    if (!place.creator) {
      return res.status(404).json({ message: "Place creator not found" });
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await place.remove({ session: sess });
      place.creator.places.pull(place);
      await place.creator.save();
      await sess.commitTransaction();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong in deleting place" });
    }

    return res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
