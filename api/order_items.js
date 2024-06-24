const express = require("express");
const router = express.Router();

// grabbing functions from the db/order_items file
const { getCart, addToCart, removeFromCart } = require("../db/order_items");

// Route that gets cart for a user
router.get('/:order_id', async (req, res, next) => {
    try {
        const cart = await getCart(req.params.order_id);
        res.send({cart});
    } catch(err){
        next(err)
    }
});

// Route that adds an item (product_id) to a cart (order_id)
router.patch('/:order_id/:product_id', async (req, res, next) => {
    try {
        const orderID = req.params.order_id;
        console.log(orderID)
        const productID = req.params.product_id;
        console.log(productID)
        const response = await addToCart(orderID, productID);

        res.status(201).json(response);
    } catch(err){
        next(err)
    }
});

// This is basically the same thing as above ^^^

// router.push('/', async (req, res, next) => {
//     try {
    
//     } catch(err){
//         next(err)
//     }
// });



// Route that removes a product (product_id) from the cart (order_id)
router.delete('/:order_id/:product_id', async (req, res, next) => {
    try {
        res.send(await removeFromCart(req.params.order_id, req.params.product_id));
    } catch(err){
        next(err)
    }
});





// exporting the routes
module.exports = router;
