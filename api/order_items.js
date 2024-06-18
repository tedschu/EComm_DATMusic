const express = require("express");
const router = express.Router();

// grabbing functions from the db/order_items file
const { getCart, addToCart, removeFromCart } = require("../db/order_items");

// Route that gets cart for a user
router.get('/:order_items_id', async (req, res, next) => {
    try {
        const cart = await getCart(req.params.order_items_id);
        res.send({cart});
    } catch(err){
        next(err)
    }
});

// Route that adds an item (product_id) to a cart (order_items_id)
router.patch('/:order_items_id/:product_id', async (req, res, next) => {
    try {
        const response = await addToCart(req.params.order_items_id, req.params.product_id, req.body.order_items_quantity);

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

// Route that removes a product (product_id) from the cart (order_items_id)
router.delete('/:order_items_id/:product_id', async (req, res, next) => {
    try {
        res.send(await removeFromCart(req.params.order_items_id, req.params.product_id)).sendStatus(204);
    } catch(err){
        next(err)
    }
});





// exporting the routes
module.exports = router;
