// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

// renders registration page
router.get("/registration", function (req, res) {

   console.log("REGISTRATION PAGE");

   // res.render("/registration");
});

// takes in new user info and registers them to site/adds them to db
router.post("/registration", function (req, res) {

   var newUser = req.body;

   // console.log("New user info: ", newUser);

   // searches username entered by new user. If username not taken, adds it to DB. If user IS taken, notifies user it is unavailable.
   db.Users.findOrCreate({
      where:{
         username: newUser.username
      },
      defaults: {
         firstName: newUser.firstName,
         lastName: newUser.lastName,
         password: newUser.password
      }
   }).spread(function(user, created) {
      
      console.log("USER: ", user.dataValues);

      if(created) {
         res.send("New user entered to database!");
      } else {
         res.send("Sorry that username is already taken!");
      }
   })
   
   // res.send(something)
});

module.exports = router;