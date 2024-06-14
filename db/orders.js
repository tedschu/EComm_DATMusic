// const { client } = require("./index");

// Get all orders from orders table 
async function getAllOrders() {
    try {
        const response = await client.query(`
            SELECT * FROM orders ORDER BY order_id ASC;
            `)
        return response.rows;
    } catch (err) {
        next(err)
    }
};

// Get all orders from a certain user
async function getOrdersByUser(userId) {
    try {
        const response = await client.query(`
            SELECT * FROM orders WHERE user_id = $1
            `, [userId])
        if(response.rows.length === 0) {
            return;
        }
        return response.rows[0];
    } catch(err) {
        next(err)
    }
}

// Get cart of a user
async function getUserCart(userId) {
    try {
        const response = await client.query(`
            SELECT * FROM orders WHERE user_id = $1 AND is_purchased = FALSE;
            `, [userId])

        if(response.rows.length === 0) {
            return;
        }
        return response.rows[0];
    } catch(err) {
        next(err)
    }

}


// Export all functions here:
module.exports = {
    getAllOrders,
    getOrdersByUser,
    getUserCart
}
