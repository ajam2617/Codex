// Create router
var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
   // will use sequelize query to retireve 'recent snippets' data and render to index template
   // db.Users.findAll({}).then(function (result) {
      
   //    for (var i = 0; i < result.length; i++) {
   //       console.log("Root Result: ", result[i].dataValues);
   //    }
      
   //    // res.json(result);
   // });

   res.render("test");
});

module.exports = router;