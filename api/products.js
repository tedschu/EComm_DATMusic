const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../db/products");

router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllProducts());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
