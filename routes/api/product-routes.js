const router = require("express").Router();

const {
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/product-requests");

// get all products
router.get("/", getAllProducts);

// get one product
router.get("/:id", getProductById);

// create new product
router.post("/", newProduct);

// update product
router.put("/:id", updateProduct);

// delete product
router.delete("/:id", deleteProduct);

module.exports = router;
