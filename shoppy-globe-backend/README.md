# ShoppyGlobe Backend API

Backend for the ShoppyGlobe e-commerce app built with Node.js, Express, and MongoDB.

## Tech Stack
- **Node.js & Express** (Server)
- **MongoDB** (Database via Mongoose)
- **JWT** (Authentication)
- **Bcrypt.js** (Password Security)

## Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file (already provided) with:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shoppyglobe
   JWT_SECRET=your_jwt_secret
   ```

3. **Seed Database:**
   Run the following to populate initial products:
   ```bash
   node seeder.js
   ```

4. **Start Server:**
   ```bash
   npm start
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get detail of one product

### Cart (Requires JWT)
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update quantity
- `DELETE /api/cart/:id` - Remove item

## Documentation
Screenshots of the database and API tests are stored in the `/documentation` folder.
