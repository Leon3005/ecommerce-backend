const { Tag, Product, ProductTag } = require("../models");

const isValid = ({ body }) => {
  const validKeys = ["tag_name"];

  return Object.keys(body).every((keyFromReq) => {
    return validKeys.includes(keyFromReq);
  });
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: { model: Product },
    });

    return res.status(200).json(tags);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to GET tags" });
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!tag) {
      return res.status(404).json({ error: "No tag found!" });
    }
    return res.status(200).json(tag);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to GET tag" });
  }
};

const newTag = async (req, res) => {
  try {
    if (isValid(req)) {
      const tag = await Tag.create(req.body);

      return res.status(200).json(tag);
    } else {
      return res.status(404).json({ error: "Invalid key entered!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to POST tag" });
  }
};

const updateTag = async (req, res) => {
  try {
    if (isValid(req)) {
      const tag = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!tag[0]) {
        return res.status(404).json({ message: "No tag with this id!" });
      }

      return res
        .status(200)
        .json({ success: "Tag has been updated successfully!" });
    } else {
      return res.status(404).json({ error: "Invalid key entered!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to PUT tag" });
  }
};

const deleteTag = async (req, res) => {
  try {
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res
      .status(200)
      .json({ success: "Tag has been deleted successfully!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to DELETE tag" });
  }
};

module.exports = { getAllTags, getTagById, newTag, updateTag, deleteTag };
