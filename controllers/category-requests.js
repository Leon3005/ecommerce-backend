const { Category, Product } = require("../models");

// Function to check if the POST body has the correct requirements
const isValid = ({ body }) => {
  const validKeys = ["category_name"];

  return Object.keys(body).every((keyFromReq) => {
    return validKeys.includes(keyFromReq);
  });
};

// This will use the findAll function from the sequelize model to find all categories.
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: { model: Product },
    });

    return res.status(200).json(allCategories);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to GET categories" });
  }
};

// Using the findByPk function to find a category based on the ID (the primary key)
const getCategoryById = async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!categoryId) {
      return res.status(404).json({ error: "No category ID found!" });
    }

    return res.status(200).json(categoryId);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to GET category" });
  }
};

// Creating a new category if POST request isValid.
const newCategory = async (req, res) => {
  try {
    if (isValid(req)) {
      const newCategory = await Category.create(req.body);

      return res.status(200).json(newCategory);
    } else {
      return res.status(404).json({ error: "Invalid key entered!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to POST category" });
  }
};

// Updating a category if the POST request isValid and if the category ID exists.
const updateCategory = async (req, res) => {
  try {
    if (isValid(req)) {
      const updateCategory = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updateCategory[0]) {
        return res.status(404).json({ message: "No category with this id!" });
      }
      return res
        .status(200)
        .json({ success: "Category has been updated successfully!" });
    } else {
      return res.status(404).json({ error: "Invalid key entered!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to UPDATE category" });
  }
};

// Deleting a category using the destroy function based on the entered ID.
const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .json({ success: "Category has been deleted successfully!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to DELETE category" });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  newCategory,
  updateCategory,
  deleteCategory,
};
