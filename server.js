// Importing express to be able to start the server.
const express = require("express");

// Importing the routes used for requests.
const routes = require("./routes");

// Importing the DB connection
const sequelize = require("./config/connection");

const app = express();
// Defining the server port
const PORT = process.env.PORT || 3001;

// Adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
