const express = require("express");
const router = express.Router();

const { getAllOrders, getOrdersByUser, getUserCart } = require('../db/orders');


// Returns an array of orders
router.get('/', async (req, res, next) => {
    try {
        const orders = await getAllOrders();

        res.send({orders})

    } catch(err){
        next(err)
    }
});

// Returns an array of orders for a certain user
router.get('/:user_id', async (req, res, next) => {
    try {
        const userOrders = await getOrdersByUser(req.params.user_id);

        res.send({userOrders})

    } catch(err){
        next(err)
    }
});

// Returns the cart(array of items) for a certain user
router.get('/:user_id/cart', async (req, res, next) => {
    try {
        const userCart = await getUserCart(req.params.user_id);

        res.send({userCart})
    } catch(err){
        next(err)
    }
});


module.exports = router;
