// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

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

module.exports = router;