const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoints

const isValid = ({ body }) => {
  const validKeys = ["tag_name"];

  return Object.keys(body).every((keyFromReq) => {
    return validKeys.includes(keyFromReq);
  });
};

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

router.post("/", async (req, res) => {
  // create a new tag
  try {
    if (isValid(req)) {
      const newTag = await Tag.create(req.body);
      res.status(200).json(newTag);
    } else {
      res.status(404).json({ error: "Invalid key entered!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if (isValid(req)) {
      await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ success: "Tag has been updated successfully!" });
    } else {
      res.status(404).json({ error: "Invalid key entered!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
