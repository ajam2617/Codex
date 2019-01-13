// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {

   db.Snippets.findAll({}).then(function (result) {
      
      var lastIndex = result.length - 1;

      var hbsObject = {
         snippets: []
      }

      for (var i = lastIndex; i > lastIndex - 10; i--) {
         console.log("Recent Snips: ", result[i].dataValues);
         hbsObject.snippets.push(result[i].dataValues);
      }

      // console.log("HANDLEBARS OBJ: ", hbsObject);

      res.render("index", hbsObject);
   });
});

module.exports = router;