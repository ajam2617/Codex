var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {

   var Snippets = sequelize.define("Snippets", {
      snippet: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [1]
         }
      },
      language: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [1]
         }
      },
      tags: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [1]
         }
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [1]
         }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
   })

   return Snippets;

}