// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {

   db.Snippets.findAll({}).then(function (result) {
      
      var hbsObject = {
         snippets: []
      }

      if (result.length < 10) {
         console.log("There are not enough snippets in the database.");
      } else {
         var lastIndex = result.length - 1;

         for (var i = lastIndex; i > lastIndex - 10; i--) {
            // console.log("Recent Snips: ", result[i].dataValues);
            hbsObject.snippets.push(result[i].dataValues);
         }
      }

      // console.log("HANDLEBARS OBJ: ", hbsObject);

      res.render("index", hbsObject);
   });
});

module.exports = router;