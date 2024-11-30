const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const dbConnection = require("./dbConnection");
app.get("/", function (req, res) {
  res.send("<h1>Hello</h1>");
});
app.use(express.json());
dbConnection();

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Gettin Error on ${PORT}`);
    return;
  } else {
    console.log(`Server is running on the port${PORT}`);
  }
});
