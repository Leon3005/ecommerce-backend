const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoints

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: { model: Product },
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!tagId) {
      res.status(404).json({ error: "No tag ID found!" });
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
