const Product = require('../models/ProductSchema');

// Controller function to add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, productId, price, category, quantity, description } = req.body;
        const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

        const newProduct = new Product({
            name,
            productId,
            price,
            category,
            quantity,
            description,
            imageUrl,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

// Controller function to get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Controller function to get a single product
exports.singleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Controller function to remove a product
exports.removeProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

// Controller function to update a product's details
exports.updateProduct = async (req, res) => {
    const { name, productId, price, category, quantity, description } = req.body;
    const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, productId, price, category, quantity, description, imageUrl },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Controller function to restock a product (update quantity only)
exports.restockProduct = async (req, res) => {
    const { id } = req.params;
    const { additionalQuantity } = req.body;

    if (!additionalQuantity || isNaN(additionalQuantity) || additionalQuantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity to restock' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $inc: { quantity: additionalQuantity } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product restocked successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error restocking product', error: error.message });
    }
};
