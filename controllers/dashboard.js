// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

// renders dashboard page
router.get("/dashboard", function (req, res) {
   // will use sequelize query to retirve user-specific snippets and render to dashboard template

   var authorID = 1;

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

   var newSnippet = req.body;

   // console.log(newSnippet);

   db.Snippets.create({
      snippet: newSnippet.snippet,
      language: newSnippet.language,
      tags: newSnippet.tags,
      description: newSnippet.description,
      authorID: newSnippet.authorID
   }).then(function(result) {
      res.send("New snippet added to database!");
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

module.exports = router;