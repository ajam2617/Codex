var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {

   var tables = {
      Users: sequelize.define("Users", {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        }
      }),
      Snippets: sequelize.define("Snippets", {
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
         lastUpdate: Sequelize.DATE
      })
   }

   return tables;
 };
 