const express = require('express');
const multer = require('multer');
const { 
    addProduct,
    getProducts,
    removeProduct,
    updateProduct,
    singleProduct,
    restockProduct 
} = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes for product management
router.post('/add-product', upload.single('image'), addProduct);
router.get('/products', getProducts);
router.post('/remove', removeProduct);
router.get('/product/:id', singleProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.put('/products/:id/restock', restockProduct);

module.exports = router;
