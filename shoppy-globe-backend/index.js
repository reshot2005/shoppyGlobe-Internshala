const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// load env vars
dotenv.config();

// connect to mongo
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// basic route
app.get('/', (req, res) => {
    res.send('ShoppyGlobe API is running...');
});

// routes (will add later)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
