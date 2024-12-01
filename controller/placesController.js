const Place = require("../models/place");
module.exports.createPlace = async (req, res) => {
  const placeData = req.body; // Data sent in the request body

  try {
    // Validate the request body
    if (
      !placeData.title ||
      !placeData.description ||
      !placeData.image ||
      !placeData.address ||
      !placeData.location ||
      typeof placeData.location.lat !== "number" ||
      typeof placeData.location.lng !== "number"
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Save the place to the database
    const newPlace = new Place(placeData);
    const savedPlace = await newPlace.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Place created successfully", place: savedPlace });
  } catch (error) {
    console.error("Error creating place:", error);
    res
      .status(500)
      .json({ message: "Failed to create place", error: error.message });
  }
};
