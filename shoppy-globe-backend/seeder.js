const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        name: "Premium Wireless Headphones",
        price: 4999,
        description: "High quality noise cancelling headphones with 20h battery life.",
        stock: 50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        name: "Smart Running Watch",
        price: 2499,
        description: "Keep track of your health with this sleek smart watch.",
        stock: 30,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        name: "Mechanical Gaming Keyboard",
        price: 3500,
        description: "RGB backlit mechanical keyboard for core gamers.",
        stock: 25,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
    },
    {
        name: "Bluetooth Speaker",
        price: 1800,
        description: "Portable speaker with deep bass and clear sound.",
        stock: 45,
        image: "https://images.unsplash.com/photo-1608351489262-f4640d7c67bf"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // clean up
        await Product.deleteMany();
        
        // insert new
        await Product.insertMany(products);
        
        console.log('Database seeded with fresh products!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
