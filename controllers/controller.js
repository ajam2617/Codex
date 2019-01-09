// Create router
var express = require("express");
var router = express.Router();

var models = require("../models");

// Connect to sequelize model
var sequelizeConnection = models.sequelize;
sequelizeConnection.sync();


// LANDING PAGE
// ----------------------------------------------
// renders landing page
router.get("/", function (req, res) {
   // will use sequelize query to retireve 'recent snippets' data and render to index template
   res.render("index");
});


//DASHBOARD
// ----------------------------------------------
// renders dashboard page
router.get("/dashboard", function(req, res) {
   // will use sequelize query to retirve user-specific snippets and render to dashboard template
   res.render("dashboard");
});

// takes new snippet submissions from dashboard
router.post("/dashboard", function(req, res) {
   // will take in req.body containing new snippet data to pass into the Snippets table
   // res.send(something)
});

// takes snippet updates from dashboard
router.put("/dashboard", function(req, res) {
   // will take in req.body containing updated snippet data to update one row in the Snippets table
   // res.send(something)
});


// LIBRARY
// ----------------------------------------------
// renders library page
router.get("/library", function(req, res) {
   res.render("/library");
});


// REGISTRATION
// ----------------------------------------------
// renders registration page
router.get("/registration", function(req, res) {
   res.render("/registration");
});

// takes in new user info and registers them to site/adds them to db
router.post("registration", function(req, res) {
   // will use sequelize query to send new user data to Users table in codex_db
   // res.send(something)
});

module.exports = router;