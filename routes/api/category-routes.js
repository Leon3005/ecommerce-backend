const router = require("express").Router();
const { Category, Product } = require("../../models");
const {
  getAllCategories,
  getCategoryById,
} = require("../../controllers/category-requests");
// The `/api/categories` endpoint

const isValid = ({ body }) => {
  const validKeys = ["category_name"];

  return Object.keys(body).every((keyFromReq) => {
    return validKeys.includes(keyFromReq);
  });
};

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await getAllCategories();
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!categoryId) {
      res.status(404).json({ error: "No category ID found!" });
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    if (isValid(req)) {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } else {
      res.status(404).json({ error: "Invalid key entered!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (isValid(req)) {
      const updateCategory = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updateCategory[0]) {
        res.status(404).json({ message: "No category with this id!" });
        return;
      }
      res
        .status(200)
        .json({ success: "Category has been updated successfully!" });
    } else {
      res.status(404).json({ error: "Invalid key entered!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ success: "Category has been deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
