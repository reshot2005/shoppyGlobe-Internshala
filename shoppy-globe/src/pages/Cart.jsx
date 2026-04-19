import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const saaraCart = useSelector((state) => state.cart.cartItems);

  // total calculation logic
  const total = saaraCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page container">
      <h1>Your Shopping Cart</h1>
      
      {saaraCart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Start adding some items!</p>
          <Link to="/" className="continue-shopping">Browse Catalog</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {saaraCart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Summary</h3>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{saaraCart.length}</span>
            </div>
            <div className="summary-row total">
              <span>Grand Total:</span>
              <span>₹{(total * 80).toLocaleString('en-IN')}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
