const { client } = require("./index");

const getAllProducts = async () => {
  const response = await client.query(
    `SELECT * FROM products ORDER BY product_id ASC`
  );
  return response.rows;
};

// Export all functions here:
module.exports = {
  getAllProducts,
};
