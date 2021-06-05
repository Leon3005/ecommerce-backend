const router = require("express").Router();

const {
  getAllTags,
  getTagById,
  newTag,
  updateTag,
  deleteTag,
} = require("../../controllers/tag-requests");

// get all tags
router.get("/", getAllTags);

// get tag by id
router.get("/:id", getTagById);

// create new tag
router.post("/", newTag);

// update tag by id
router.put("/:id", updateTag);

// delete tag by id
router.delete("/:id", deleteTag);

module.exports = router;
