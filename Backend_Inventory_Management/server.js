const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const userRoutes = require('./routers/userRoutes');
const productRoutes = require('./routers/productRoutes'); // Import product routes
const orderRoutes = require('./routers/orderRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve images from the uploads folder

// Connect to MongoDB
connectDB();

// Use Routers
app.use('/user', userRoutes);
app.use('/', orderRoutes); 
app.use('/admin', productRoutes); // Add product routes for admin portal
app.use('/', productRoutes);




// Sample API route for frontend
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
// server.js or ordersController.js

app.get('/orders/:orderId', async (req, res) => {
  try {
      const order = await Order.findById(req.params.orderId); // Assuming you have an Order model
      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
  } catch (error) {
      console.error('Error retrieving order:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});




// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
