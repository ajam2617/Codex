// import express and start new express instance
var express = require("express");



// require passport
var passport = require('passport')
var session = require('express-session')
var env = require('dotenv').load()



var app = express();
var PORT = process.env.PORT || 8080;

// set up static dreictories
app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Initialize passport, express session and passport session
app.use(session({
  secret: 'keyboard cat', // "should not be exposed for production environment"
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


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


// Routes - Import our auth.js file
var authRoute = require('./controllers/auth.js')(app,passport); // Added passport as an argument to pass its functionality to auth.js
 
// load passport strategies
require('./config/passport/passport.js')(passport, db.Users);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});