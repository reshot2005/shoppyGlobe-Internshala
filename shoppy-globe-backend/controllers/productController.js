const Product = require('../models/Product');

// fetch all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error fetching products');
    }
};

// fetch single product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(404);
        throw new Error('Product not found');
    }
};

module.exports = { getProducts, getProductById };
