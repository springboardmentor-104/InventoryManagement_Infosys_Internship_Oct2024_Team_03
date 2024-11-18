// routers/orderRoutes.js
const express = require('express');
const { addOrder, getOrders } = require('../controllers/orderController');

const router = express.Router();

// Route to create a new order
router.post('/orders', addOrder);

// Route to fetch all orders (optional, if needed for an admin page)
router.get('/orders', getOrders);

module.exports = router;
