// server/routes/countRoutes.js
const express = require('express');
const Product = require('../models/ProductSchema');
const Order = require('../models/OrderSchema');
const User = require('../models/User');
const router = express.Router();

// Route to get product count
router.get('/products/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.json({ count: productCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product count', error: err.message });
  }
});

// Route to get order count
router.get('/orders/count', async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.json({ count: orderCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order count', error: err.message });
  }
});
router.get('/users/count', async (req, res) => {
    try {
      // Get distinct emails, excluding null, empty, or invalid emails
      const customerEmails = await User.distinct('email', { email: { $ne: null, $ne: "" } });
  
      // Count the length of the array of distinct emails
      const customerCount = customerEmails.length;
  
      // Return the count directly
      res.json({ totalCustomers: customerCount });
    } catch (err) {
      console.error("Error fetching customer count:", err);
      res.status(500).send('Server Error');
    }
  });
  
  
  
  
  

module.exports = router;
