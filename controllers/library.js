// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

// renders library page
router.get("/library", function (req, res) {

   // gets data for all snippets in database
   db.Snippets.findAll({}).then(function (result) {

      for (var i = 0; i < result.length; i++) {
         console.log(result[i].dataValues);
      }
   })

   res.render("library");
});

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

router.get("/library/:languages", function (req, res) {});
//jacob -looks like you were in the middle osf working on a way to exclude dups so I'll leave these

//get tag
router.get("/library/:tag", function (req, res) {
})

//get language and tag
router.get("/library/:language/:tag", function (req, res) {
})

   module.exports = router;