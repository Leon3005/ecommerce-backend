const { Product, Category, Tag, ProductTag } = require("../../models");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!productId) {
      res.status(404).json({ error: "No product ID found!" });
      return;
    }
    res.status(200).json(productId);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllProducts, getProductById };
