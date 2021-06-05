const router = require("express").Router();

const {
  getAllTags,
  getTagById,
  newTag,
  updateTag,
  deleteTag,
} = require("../../controllers/tag-requests");

router.get("/", getAllTags);

router.get("/:id", getTagById);

router.post("/", newTag);

router.put("/:id", updateTag);

router.delete("/:id", deleteTag);

module.exports = router;
