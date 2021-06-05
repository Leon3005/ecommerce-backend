const router = require("express").Router();
const { Category, Product } = require("../../models");
const {
  getAllCategories,
  getCategoryById,
  newCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category-requests");

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.post("/", newCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
