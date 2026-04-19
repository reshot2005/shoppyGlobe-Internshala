const Cart = require('../models/Cart');
const Product = require('../models/Product');

// add product to cart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // validation: check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found, cannot add to cart');
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        // create new cart
        cart = await Cart.create({
            userId,
            items: [{ productId, quantity: Number(quantity) }]
        });
    } else {
        // update existing cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ productId, quantity: Number(quantity) });
        }
        await cart.save();
    }

    res.status(201).json(cart);
};

// update quantity in cart
const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    const userId = req.user._id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ userId });
    if (cart) {
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = Number(quantity);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404);
            throw new Error('Item not found in cart');
        }
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
};

// remove product from cart
const removeFromCart = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ userId });
    if (cart) {
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
};

module.exports = { addToCart, updateCartItem, removeFromCart };
