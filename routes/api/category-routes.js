const router = require("express").Router();

const {
  getAllCategories,
  getCategoryById,
  newCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category-requests");

// get all categories
router.get("/", getAllCategories);

// get category by id
router.get("/:id", getCategoryById);

// create new category
router.post("/", newCategory);

// update category by id
router.put("/:id", updateCategory);

// delete category by id
router.delete("/:id", deleteCategory);

module.exports = router;
