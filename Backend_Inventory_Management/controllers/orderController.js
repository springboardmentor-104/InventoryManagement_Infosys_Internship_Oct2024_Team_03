// controllers/orderController.js
const Order = require('../models/OrderSchema'); // Make sure you create OrderSchema in the models directory

// Controller to handle adding a new order
exports.addOrder = async (req, res) => {
    try {
        const { phoneNumber, address, cartData } = req.body;
        
        const newOrder = new Order({
            phoneNumber,
            address,
            cartData,
            orderDate: new Date(),
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

// Controller to fetch all orders (for admin or review purposes)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};




