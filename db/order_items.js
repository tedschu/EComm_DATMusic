const { client } = require("./index");


// Gets all of the cart information
async function getCart (order_id) {
    try {
        const response = await client.query(`
            SELECT * FROM order_items WHERE order_id = $1 ORDER BY order_items_id ASC;
            `, [order_id]);
        return response.rows;
    } catch (err) {
        next(err)
    }
}

// checks to see if item already exists in cart

async function getCartItemQuantity (id, orderId) {
    console.log(id, orderId)
    const itemQuantity = await client.query(`
        SELECT order_items_quantity FROM order_items WHERE product_id = $1 AND order_id = $2;
        `, [id, orderId])
    
        console.log(itemQuantity)
    if(itemQuantity.rowCount === 0){
        return 0;
    }
    

    return itemQuantity.rows[0].order_items_quantity; 
};



// Adds an item to the cart
async function addToCart (order_id, product_id) {
    try {
        console.log(product_id, order_id)
        let itemQuantity = await getCartItemQuantity(product_id, order_id);
        // let itemQuantity = 0;

        if(itemQuantity === 0){
            const response = await client.query(`
                INSERT INTO order_items (order_id, product_id, order_items_quantity)
                VALUES ($1, $2, $3)
                RETURNING *;
                `, [order_id, product_id, 1])
            return response;
        }else{
             itemQuantity++;
            const response = await client.query(`
                UPDATE order_items SET order_items_quantity = $1 WHERE product_id = $2 AND order_id = $3;
                `, [itemQuantity, product_id, order_id]);
            return response;
        }
    } catch (err) {
        throw(err)
    }
};

// Removes from the declared cart (order_items_id) the product with id (product_id)
async function removeFromCart (order_id, product_id) {   
    try {
        let itemQuantity = await getCartItemQuantity(product_id, order_id);
        // let itemQuantity = 0;

        if(itemQuantity > 1){
            itemQuantity--;
            const response = await client.query(`
                UPDATE order_items SET order_items_quantity = $1 WHERE product_id = $2 AND order_id = $3;
                `, [itemQuantity, product_id, order_id]);
            return response;
        }else{
            await client.query(`
                DELETE FROM order_items WHERE order_id = $1 AND product_id = $2;
                `, [order_id, product_id]);
        }
    } catch (err) {
        throw(err)
    }
};


// Export all functions here:
module.exports ={
    removeFromCart,
    addToCart,
    getCart
}
