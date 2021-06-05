// Importing dotenv to retrieve the database details from the .env file
require("dotenv").config();

const Sequelize = require("sequelize");

// Creating a new instance of sequelize to use for the DB connection
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
