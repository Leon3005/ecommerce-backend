const { Tag, Product, ProductTag } = require("../models");

const isValid = ({ body }) => {
  const validKeys = ["tag_name"];

  return Object.keys(body).every((keyFromReq) => {
    return validKeys.includes(keyFromReq);
  });
};

const getAllTags = async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: { model: Product },
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTagById = async (req, res) => {
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
};

const newTag = async (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "Tag"
    }
  */
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
};

const updateTag = async (req, res) => {
  try {
    if (isValid(req)) {
      const updateTag = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updateTag[0]) {
        res.status(404).json({ message: "No tag with this id!" });
        return;
      }
      res.status(200).json({ success: "Tag has been updated successfully!" });
    } else {
      res.status(404).json({ error: "Invalid key entered!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if (!deleteTag[0]) {
    //   res.status(404).json({ message: "No tag with this id!" });
    //   return;
    // }
    res.status(200).json({ success: "Tag has been deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllTags, getTagById, newTag, updateTag, deleteTag };
