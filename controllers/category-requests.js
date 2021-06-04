const { Category, Product } = require("../models");

const getAllCategories = async (res) =>
  await Category.findAll({ include: { model: Product } });

const getCategoryById = async () => {
  const categoryId = await Category.findByPk(req.params.id, {
    include: { model: Product },
  });

  if (!categoryId) {
    res.status(404).json({ error: "No category ID found!" });
    return;
  }

  return categoryId;
};

module.exports = { getAllCategories, getCategoryById };
