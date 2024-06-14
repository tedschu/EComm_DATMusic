const { client } = require("./index");


// Gets all of the cart information
async function getCart (order_items_id) {
    try {
        const response = await client.query(`
            SELECT * FROM order_items WHERE order_items_id = $1;
            `, [order_items_id]);
        return response.rows;
    } catch (err) {
        next(err)
    }
}

// Adds an item to the cart
async function addToCart ({order_items_id , product_id, order_items_quantity}) {
    try {
        const response = await client.query(`
            INSERT INTO order_items (order_items_id, product_id, order_items_quantity);
            VALUES ($1, $2, $3)
            RETURNING *
            `, [Number(order_items_id) , Number(product_id), Number(order_items_quantity)])
        return response;
    } catch (err) {
        next(err)
    }
}

// Removes from the declared cart (order_items_id) the product with id (product_id)
async function removeFromCart ({order_items_id , product_id}) {
    await client.query(`
        DELETE FROM order_items WHERE order_items_id = $1 AND product_id = $2;
        `, [Number(order_items_id), Number(product_id)]);
      
    return {
      product_id: product_id,
    };
  };


// Export all functions here:
module.exports ={
    removeFromCart,
    addToCart,
    getCart
}
