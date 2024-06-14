const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../db/products");

// Gets all products
router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllProducts());
  } catch (error) {
    next(error);
  }
});

// Gets products by product category
router.get("/category/:product_category", async (req, res, next) => {
  try {
    res.send(await getProductsByCategory(req.params.product_category));
  } catch (error) {
    next(error);
  }
});

// Gets a single product from params
router.get("/:product_id", async (req, res, next) => {
  try {
    res.send(await getSingleProduct(req.params.product_id));
  } catch (error) {
    next(error);
  }
});

// Adds a product
router.post("/", async (req, res, next) => {
  try {
    res.send(await addProduct(req.body));
  } catch (error) {
    next(err);
  }
});

// Deletes a product
router.delete("/:product_id", async (req, res, next) => {
  try {
    res.send(await deleteProduct(req.params.product_id)).sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Updates a product
router.put("/:product_id", async (req, res, next) => {
  try {
    res.send(await updateProduct(req.params.product_id, req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
