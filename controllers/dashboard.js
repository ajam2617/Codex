// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

// renders dashboard page
router.get("/dashboard", function (req, res) {
   // will use sequelize query to retirve user-specific snippets and render to dashboard template

   var activeUserId = req.user.id;

   // console.log("USERINFO: ", userinfo);

   db.Snippets.findAll({
      where: {
         authorID: activeUserId
      }
   }).then(function (snippetData) {

      // Will hold one of each language found in database
      var tracker = {};

      // finds each language/ignores duplicates
      for (var i = 0; i < snippetData.length; i++) {
         if (!tracker[snippetData[i].dataValues.language]) {
            tracker[snippetData[i].dataValues.language] = {};
         }

         var tagsTemp = snippetData[i].dataValues.tags.split(",");

         for (var j = 0; j < tagsTemp.length; j++) {
            var tag = tagsTemp[j]
            if (!tracker[snippetData[i].dataValues.language][tag]) {
               tracker[snippetData[i].dataValues.language][tag] = true;
            }
         }
      }

      // console.log("TRACKER: ", tracker);

      // will hold array of all unique languages to be passed to dashboard template
      var hbsObject = {
         languages: [],
         id: activeUserId
      };

      for (var key in tracker) {
         var newObj = {};
         newObj.language = key;
         newObj.tags = [];

         for (var subKey in tracker[key]) {
            newObj.tags.push({ tag: subKey });
         }

         hbsObject.languages.push(newObj);
      }

      // renders languages to dashboard template
      res.render("dashboard", hbsObject);
   })
});

// takes new snippet submissions from dashboard
router.post("/dashboard/newSnippet", function (req, res) {
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

// THIS SHOULD BE UPDATED WITH /:ATTR AT THE END TO EDIT ONE COLUMN AT A TIME
// takes snippet updates from dashboard
router.put("/dashboard/updateSnippet", function (req, res) {

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

//deletes a snippet based on id
router.delete("/dashboard/deleteSnippet", function (req, res) {

   var id = req.body.id;

   db.Snippets.destroy({
      where: { id: id }
   }).then(function (result) {
      res.send("Snippet has been deleted!");
   })
});

// route for /dashboard/:language
router.get("/api/dashboard/:language/:id", function(req, res) {
   var language = req.params.language;
   var authorID = req.params.id;

   db.Snippets.findAll({
      where: {
         authorId: authorID,
         language: language
      }
   }).then(function(result) {
      res.json(result);
   });
})
// route for /dashboard/language/:tag
router.get("/api/dashboard/:language/:id/:tag", function(req, res) {
   var language = req.params.language;
   var tag = req.params.tag;
   var authorID = req.params.id;

   // console.log(language, tag);

   db.Snippets.findAll({
      where: {
         authorId: authorID,
         language: language
      }
   }).then(function(result) {
      
      var responseArray = [];

      for (var i = 0; i < result.length; i++) {
         // console.log("RESULT: ", result[i].dataValues);
         var tags = result[i].dataValues.tags.split(",");
         if(tags.includes(tag)) {
            responseArray.push(result[i].dataValues);
         }
      }

      // console.log("RESPONSE ARRAY: ", responseArray);

      res.json(responseArray);
   });
})

router.get("/api/getby/:id", function(req, res) {
   var id = req.params.id;

   console.log("ID: ", id);

   db.Snippets.findOne({
      where: {
         id: id
      }
   }).then(function(result) {
      res.send(result);
   });

})

module.exports = router;