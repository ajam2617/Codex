// import express and start new express instance
var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

// set up static dreictories
app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ROUTES
// root and homepage routes
app.use(require("./controllers/root.js"));
// dashboard page routes
app.use(require("./controllers/dashboard.js"));
// library page routes
app.use(require("./controllers/library.js"));
// registration page routes
app.use(require("./controllers/registration.js"));

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});