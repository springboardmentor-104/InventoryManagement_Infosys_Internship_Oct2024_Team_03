const express = require('express');
const multer = require('multer');

const { addProduct, getProducts, removeProduct, updateProduct, singleProduct, restockProduct } = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST route to add a product with multiple images
router.post('/add-product', upload.array('images', 4), addProduct); // Allow up to 4 images

// GET route to retrieve products
router.get('/products', getProducts);

// POST route to remove a product
router.post('/remove', removeProduct);

// GET route to retrieve a single product by ID
router.get('/product/:id', singleProduct);

// PUT route to update a product with multiple images
router.put('/products/:id', upload.array('images', 4), updateProduct); // Allow up to 4 images for updates

// PUT route to update a product quantity
router.put('/products/:id/restock', restockProduct);


module.exports = router;
