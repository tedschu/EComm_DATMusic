// const { client } = require("./index");

const getAllProducts = async () => {
  const response = await client.query(
    `SELECT * FROM products ORDER BY product_id ASC`
  );
  return response.rows;
};

const getProductsByCategory = async (product_category) => {
  const response = await client.query(
    `SELECT * FROM products WHERE product_category = $1`,
    [product_category]
  );
  if (response.rows.length === 0) {
    return null;
  }
  return response.rows[0];
};

const getSingleProduct = async (product_id) => {
  const response = await client.query(
    `SELECT * FROM products WHERE product_id = $1`,
    [product_id]
  );
  return response.rows[0];
};

const addProduct = async (body) => {
  await client.query(
    `INSERT INTO products(product_name, product_description, product_category, price, image_url) VALUES($1, $2, $3, $4, $5)`,
    [
      body.product_name,
      body.product_description,
      body.product_category,
      body.price,
      body.image_url,
    ]
  );
  return {
    product_name: body.product_name,
    product_description: body.product_description,
    product_category: body.product_category,
    price: body.price,
    image_url: body.image_url,
  };
};

const deleteProduct = async (product_id) => {
  await client.query(`DELETE FROM products WHERE product_id = $1`, [
    Number(product_id),
  ]);
  return {
    product_id: product_id,
  };
};

const updateProduct = async (product_id, body) => {
  const response = await client.query(
    `UPDATE products SET product_name=$1, product_description=$2, product_category=$3, price=$4, image_url=$5 WHERE product_id=$6 RETURNING *`,
    [
      body.product_name,
      body.product_description,
      body.product_category,
      body.price,
      body.image_url,
      Number(product_id),
    ]
  );
  return {
    product_name: body.product_name,
    product_description: body.product_description,
    product_category: body.product_category,
    price: body.price,
    image_url: body.image_url,
  };
};

// Export all functions here:
module.exports = {
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
