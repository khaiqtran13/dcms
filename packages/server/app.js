const express = require("express");
const bodyParser = require("body-parser");
const client = require("./connection");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");

// MIDDLEWARE

// settings
app.options("http://localhost:3000", cors());
app.use(express.json());
app.use(bodyParser.json());
// logger
app.use(function (req, res, next) {
    console.log("Time:", Date.now());
    next();
});
app.listen(8000, () => {
    console.log("Server is now listening on port 8000");
});

client.connect();

app.use("/user", userRoutes);
