// Importing the model class and datatypes from sequelize.
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

// Creating a class called Category that extends Model
class Category extends Model {}

//Below is the schema used for the table in the DB.
const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

// Below are the options used in the init method for the model.
const options = {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "category",
};

Category.init(schema, options);

module.exports = Category;
