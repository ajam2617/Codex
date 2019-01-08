// Create router
var express = require("express");
var router = express.Router();

var models = require("../models");

// Connect to sequelize model
var sequelizeConnection = models.sequelize;
sequelizeConnection.sync();

router.get("/", function (req, res) {

   console.log("success!");

   // res.render("index", handlebarsObj);
})

module.exports = router;