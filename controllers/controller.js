// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

// Connect to sequelize model
// var sequelizeConnection = db.sequelize;
// sequelizeConnection.sync();

// LANDING PAGE
// ----------------------------------------------
// renders landing page
router.get("/", function (req, res) {
   // will use sequelize query to retireve 'recent snippets' data and render to index template
   db.Users.findAll({}).then(function (result) {
      
      for (var i = 0; i < result.length; i++) {
         console.log("Root Result: ", result[i].dataValues);
      }
      
      // res.json(result);
   });

   res.render("index");
});


//DASHBOARD
// ----------------------------------------------
// renders dashboard page
router.get("/dashboard", function (req, res) {
   // will use sequelize query to retirve user-specific snippets and render to dashboard template

   var authorID = 4;

   db.Snippets.findAll({
      where: {
         authorID: authorID
      }
   }).then(function (result) {
      for(var i = 0; i < result.length; i++) {
         console.log("Dashboard Result: ", result[i].dataValues);
      }
   })

   res.render("dashboard");
});

// takes new snippet submissions from dashboard
router.post("/dashboard", function (req, res) {
   // will take in req.body containing new snippet data to pass into the Snippets table
   // res.send(something)

   var authorID = 4;

   db.Snippets.create({
      snippet: "array.push(newItem)",
      language: "Javascript",
      tags: "arrays,push,method",
      description: "Adds a new item to an array",
      authorID: authorID
   }).then(function(result) {
      console.log("Create Snippet Result: ", result.dataValues);
   })

});

// takes snippet updates from dashboard
router.put("/dashboard", function (req, res) {
   // will take in req.body containing updated snippet data to update one row in the Snippets table
   // res.send(something)

   // id of snippet to be edited
   var snippetID = 7;

   db.Snippets.update(
      {
         snippet: "snippet",
         language: "made up lang",
         tags: "lolwhattags",
         description: "this one makes no sense"
      },
      {
         where: {
            id: snippetID
         }
      }
   ).then(function(result) {
      console.log("Update Result: ", result);
   })
});


// LIBRARY
// ----------------------------------------------
// renders library page
router.get("/library", function (req, res) {
   
   // gets data for all snippets in database
   db.Snippets.findAll({}).then(function(result) {
      
      for (var i = 0; i < result.length; i++) {
         console.log(result[i].dataValues);
      }
   })
   
   // res.render("/library");
});


// REGISTRATION
// ----------------------------------------------
// renders registration page
router.get("/registration", function (req, res) {
   res.render("/registration");
});

// takes in new user info and registers them to site/adds them to db
router.post("/registration", function (req, res) {
   // will use sequelize query to send new user data to Users table in codex_db
   
   // db.Users.create({
   //    username: "pwidders",
   //    firstName: "Pete",
   //    lastName: "Widders",
   //    password: "password2468"
   // }).then(function(result) {
   //    console.log("New user created!", result.dataValues);
   // })

   // searches username entered by new user. If username not taken, adds it to DB. If user IS taken, notifies user it is unavailable.
   db.Users.findOrCreate({
      where:{
         username: "maja123"
      },
      defaults: {
         firstName: "Maja",
         lastName: "Morales",
         password: "password1234"
      }
   }).spread(function(user, created) {
      console.log("USER: ", user.dataValues);
      console.log("CREATED: ", created);

      if(created) {
         console.log("New user entered to database!");
      } else {
         console.log("Sorry that username is already taken!");
      }
   })
   
   // res.send(something)
});

module.exports = router;