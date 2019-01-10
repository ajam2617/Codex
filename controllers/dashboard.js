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
   }).then(function (snippetData) {
      
      // Will hold one of each language found in database
      var tracker = {}

      // will hold array of all unique languages to be passed to dashboard template
      var hbsObject = {
         languages: []
      };
      
      // finds each language/ignores duplicates
      for (var i = 0; i < snippetData.length; i++) {
         if (!tracker[snippetData[i].dataValues.language]) {

            // adds each new language to tracker and hbsObject
            tracker[snippetData[i].dataValues.language] = true;
            hbsObject.languages.push({language: snippetData[i].dataValues.language});

            // categorizes tags by language
            hbsObject[]
         }
      }

      // renders languages to dashboard template
      res.render("dashboard", hbsObject);
   })
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
   }).then(function (result) {
      res.send("New snippet added to database!");
   })

});

// takes snippet updates from dashboard
router.put("/dashboard", function (req, res) {

   var updateSnippet = req.body;

   // console.log(updateSnippet);

   db.Snippets.update(
      {
         snippet: updateSnippet.snippet,
         language: updateSnippet.language,
         tags: updateSnippet.tags,
         description: updateSnippet.description
      },
      {
         where: {
            id: parseInt(updateSnippet.id)
         }
      }
   ).then(function (result) {
      res.send("Snippet info updated!");
   })
});

module.exports = router;