const router = require("express").Router();

const {
  getAllProducts,
  getProductById,
} = require("../../controllers/product-requests");

// get all products
router.get("/", getAllProducts);

// get one product
router.get("/:id", getProductById);

// create new product
router.post("/", async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4],
      category_id: 2
    }
  */
  let productTagIds;
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return (productTagIds = ProductTag.bulkCreate(productTagIdArr));
    }
    res.status(200).json({ success: "Product has been created successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
  // try {
  //   Product.create(req.body)
  //     .then((product) => {
  //       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //       if (req.body.tagIds.length) {
  //         const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //           return {
  //             product_id: product.id,
  //             tag_id,
  //           };
  //         });
  //         return ProductTag.bulkCreate(productTagIdArr);
  //       }
  //       // if no product tags, just respond
  //       res.status(200).json(product);
  //     })
  //     .then((productTagIds) => res.status(200).json(productTagIds));
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json(err);
  // }
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  try {
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        // find all associated tags from ProductTag
        return ProductTag.findAll({ where: { product_id: req.params.id } });
      })
      .then((productTags) => {
        // get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        // run both actions
        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      })
      .then(() =>
        res.json({ success: "Product has been updated successfully!" })
      );
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ success: "Product has been deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
