const { client } = require("./index");


// Gets all of the cart information
async function getCart (order_id) {
    try {
        const response = await client.query(`
            SELECT * FROM order_items WHERE order_id = $1;
            `, [order_id]);
        return response.rows;
    } catch (err) {
        next(err)
    }
}

// checks to see if item already exists in cart

// async function getCartItemQuantity (id) {
//     const itemQuantity = await client.query(`
//         SELECT order_items_quantity FROM order_items WHERE product_id = $1;
//         `, [Number(id)])
    
//     if(itemQuantity === null){
//         return 0;
//     }

//     return itemQuantity;
// };


// Adds an item to the cart
async function addToCart ({order_id , product_id, order_items_quantity}) {
    try {
        // let itemQuantity = getCartItemQuantity(product_id)

        // if(itemQuantity === 0){
            const response = await client.query(`
                INSERT INTO order_items (order_id, product_id, order_items_quantity)
                VALUES ($1, $2, $3)
                RETURNING *;
                `, [order_id, product_id, order_items_quantity])
            return response
        // }else{
        //     itemQuantity++;
        //     const response = await client.query(`
        //         UPDATE order_items SET order_items_quantity = $1 WHERE product_id = $2;
        //         `, [itemQuantity, product_id])
        //     return response;
        // }
    } catch (err) {
        throw(err)
    }
}

// Removes from the declared cart (order_items_id) the product with id (product_id)
async function removeFromCart ({order_id , product_id}) {
    await client.query(`
        DELETE FROM order_items WHERE order_id = $1 AND product_id = $2;
        `, [Number(order_id), Number(product_id)]);
      
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
