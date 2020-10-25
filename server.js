const express = require("express");
const bodyParser = require("body-parser");

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// Require Clubs routes
require("./app/routes/club.routes.js")(app);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Rotatract Club Directory!!!",
  });
});

// listen for requests
/*
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});*/

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
