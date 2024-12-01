const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Fix capitalization

// Define the schema for Place
const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    // Corrected 'adress' to 'address'
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
});

// Export the Place model
module.exports = mongoose.model("Place", placeSchema);
