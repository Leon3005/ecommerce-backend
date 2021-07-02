const { Product, Category, Tag, ProductTag } = require("../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });

    return res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to GET products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!product) {
      return res.status(404).json({ error: "No product found!" });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to GET product" });
  }
};

const newProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));

      await ProductTag.bulkCreate(productTagIdArr);
    }

    return res
      .status(200)
      .json({ success: "Product has been created successfully!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to POST product" });
  }
};

const updateProduct = (req, res) => {
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
    console.log(err.message);
    return res.status(500).json({ error: "Failed to PUT product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res
      .status(200)
      .json({ success: "Product has been deleted successfully!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Failed to DELETE product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct,
};
