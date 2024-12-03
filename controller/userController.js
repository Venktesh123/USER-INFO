const User = require("../models/User");

module.exports.createUser = async (req, res, next) => {
  const { name, email, password, image, places } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({
      message: "Checking for existing user failed, please try again later.",
    });
  }

  if (existingUser) {
    return res
      .status(422)
      .json({ message: "User already exists with this email." });
  }

  const newUser = new User({
    name,
    email,
    password, // Consider hashing the password using bcrypt
    image: image || null,
    places: places || [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Creating user failed, please try again later." });
  }

  res.status(201).json({ user: newUser });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({
      message: "Logging in failed, please try again later.",
    });
  }
  if (!existingUser && existingUser.password != password) {
    const error = new HttpError("invalid Credential", 401);
    return next(error);
  }
  res.json({ message: "Log In" });
};