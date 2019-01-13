// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/library", function (req, res) {

   var activeUserId = req.user.id;

   db.Snippets.findAll({}).then(function (snippetData) {

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
      res.render("library", hbsObject);
   })
});

// route for /dashboard/:language
router.get("/api/library/:language", function (req, res) {
   var language = req.params.language;

   db.Snippets.findAll({
      where: {
         language: language
      }
   }).then(function (result) {
      res.json(result);
   });
})

router.get("/api/library/:language/:tag", function (req, res) {
   var language = req.params.language;
   var tag = req.params.tag;

   db.Snippets.findAll({
      where: {
         language: language
      }
   }).then(function (result) {

      var responseArray = [];

      for (var i = 0; i < result.length; i++) {
         // console.log("RESULT: ", result[i].dataValues);
         var tags = result[i].dataValues.tags.split(",");
         if (tags.includes(tag)) {
            responseArray.push(result[i].dataValues);
         }
      }

      res.json(responseArray);
   });
})

//route for saving snippet
router.post("/library/saveSnippet", function (req, res) {

   var saveSnippet = req.body;

   db.Snippets.save(
      {
         snippet: saveSnippet.snippet,
         language: saveSnippet.language,
         tags: saveSnippet.tags,
         description: saveSnippet.description
      },
      {
         where: {
            id: parseInt(updateSnippet.id)
         }
      }
   ).then(function (result) {
      res.send("Snippet info saved!");
   })
});

//get languages

router.get("/library/:languages", function (req, res) { });
//jacob -looks like you were in the middle osf working on a way to exclude dups so I'll leave these

//get tag
router.get("/library/:tag", function (req, res) {
})

//get language and tag
router.get("/library/:language/:tag", function (req, res) {
})

module.exports = router;